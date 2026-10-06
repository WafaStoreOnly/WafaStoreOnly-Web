// ============================================
// QRIS DINAMIS - Convert static QRIS ke dynamic
// Merchant: AWA_NEWSTREAM
// ============================================

// QRIS STATIC kamu
const QRIS_STATIC = "00020101021126570011ID.DANA.WWW011893600915303356172402090335617240303UMI51440014ID.CO.QRIS.WWW0215ID10265588813750303UMI5204594553033605802ID5913AWA_NEWSTREAM6010Kab. Bogor610516320630452D8";

// ===== CRC16-CCITT (buat validasi QRIS) =====
function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// ===== Convert QRIS Static → Dynamic dengan Nominal =====
function convertQRISDinamis(amount) {
  if (!amount || amount <= 0) throw new Error('Nominal harus > 0');
  
  // Hapus CRC lama (4 karakter terakhir)
  let qris = QRIS_STATIC.slice(0, -4);
  
  // 1. Ganti Point of Initiation dari "11" (static) ke "12" (dynamic)
  // Format: "010211" → "010212"
  if (qris.includes('010211')) {
    qris = qris.replace('010211', '010212');
  }
  
  // 2. Hapus Tag 54 lama kalau ada (biar ga duplikat)
  // Tag 54 format: "54" + 2 digit length + amount
  // Regex: cari "54XX" di mana XX = length, terus hapus sesuai length
  const tag54Regex = /54(\d{2})(\d+)/;
  const match54 = qris.match(tag54Regex);
  if (match54) {
    const fullTag54 = '54' + match54[1] + match54[2];
    qris = qris.replace(fullTag54, '');
  }
  
  // 3. Insert Tag 54 (nominal) SEBELUM Tag 58 (country)
  // Urutan EMVCo: ...53 (currency) → 54 (amount) → 58 (country)...
  const idx58 = qris.indexOf('5802ID');
  if (idx58 === -1) throw new Error('Format QRIS invalid: tag 58 tidak ditemukan');
  
  // Format Tag 54: "54" + length (2 digit) + amount
  const amountStr = amount.toString();
  const amountLen = amountStr.length.toString().padStart(2, '0');
  const tag54 = '54' + amountLen + amountStr;
  
  // Insert tag 54 sebelum 5802ID
  const newQRIS = qris.slice(0, idx58) + tag54 + qris.slice(idx58);
  
  // 4. Hitung ulang CRC16 untuk string + "6304"
  const crcInput = newQRIS + '6304';
  const newCRC = crc16(crcInput);
  
  // 5. Return QRIS dinamis lengkap dengan CRC baru
  return crcInput + newCRC;
}

// ===== Generate QR Code ke Canvas =====
async function renderQRIS(qrisString, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) throw new Error('Canvas tidak ditemukan');
  
  // Pakai library qrcode.js
  if (typeof QRCode === 'undefined') {
    throw new Error('Library QRCode belum ke-load. Cek CDN di <head>.');
  }
  
  await QRCode.toCanvas(canvas, qrisString, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'M'
  });
  
  return canvas;
}

// ===== Test Function (buat debug di console) =====
window.testQRIS = function(amount) {
  const qrisDynamic = convertQRISDinamis(amount);
  console.log('===== QRIS DINAMIS =====');
  console.log('Nominal: Rp' + amount.toLocaleString('id-ID'));
  console.log('QRIS String:', qrisDynamic);
  console.log('Panjang:', qrisDynamic.length, 'karakter');
  return qrisDynamic;
};

console.log('✅ qris-dinamis.js loaded. Test: testQRIS(16000)');
