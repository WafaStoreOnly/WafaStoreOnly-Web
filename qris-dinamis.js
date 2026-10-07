// ============================================
// QRIS DINAMIS - Convert static QRIS ke dynamic
// Merchant: AWA_NEWSTREAM
// WafaStoreOnly x Killua Edition
// ============================================

// ===== QRIS STATIC KAMU (JANGAN DIUBAH) =====
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
  
  // Hapus tag CRC (6304) + 4 digit CRC di belakang
  const idxCRC = QRIS_STATIC.lastIndexOf('6304');
  let qris = idxCRC > -1 ? QRIS_STATIC.slice(0, idxCRC) : QRIS_STATIC;
  
  // 1. Ganti Point of Initiation dari "11" (static) ke "12" (dynamic)
  if (qris.includes('010211')) {
    qris = qris.replace('010211', '010212');
  }
  
  // 2. Hapus Tag 54 lama kalau ada
  const tag54Regex = /54(\d{2})(\d+)/;
  const match54 = qris.match(tag54Regex);
  if (match54) {
    const fullTag54 = '54' + match54[1] + match54[2];
    qris = qris.replace(fullTag54, '');
  }
  
  // 3. Insert Tag 54 (nominal) SEBELUM Tag 58 (country)
  const idx58 = qris.indexOf('5802ID');
  if (idx58 === -1) throw new Error('Format QRIS invalid: tag 58 tidak ditemukan');
  
  const amountStr = amount.toString();
  const amountLen = amountStr.length.toString().padStart(2, '0');
  const tag54 = '54' + amountLen + amountStr;
  
  const newQRIS = qris.slice(0, idx58) + tag54 + qris.slice(idx58);
  
  // 4. Hitung ulang CRC16
  const crcInput = newQRIS + '6304';
  const newCRC = crc16(crcInput);
  
  return crcInput + newCRC;
}

// ===== Generate QR Code (pakai qrcodejs - davidshimjs) =====
function renderQRIS(qrisString, containerId) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Container tidak ditemukan: ' + containerId);
  
  if (typeof QRCode === 'undefined') {
    throw new Error('Library QRCode belum ke-load. Cek CDN qrcodejs di <head>.');
  }
  
  // Bersihin container dulu
  container.innerHTML = '';
  
  // Generate QR baru
  new QRCode(container, {
    text: qrisString,
    width: 280,
    height: 280,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
  
  console.log('✅ QRIS berhasil di-render ke #' + containerId);
  return container;
}

// ===== Ambil gambar QR sebagai Image (buat download) =====
async function getQRImage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Container tidak ditemukan: ' + containerId);
  
  const img = container.querySelector('img');
  const canvas = container.querySelector('canvas');
  
  if (img && img.src) {
    // qrcodejs bikin img, kita tunggu loaded
    await new Promise((resolve) => {
      if (img.complete && img.naturalWidth > 0) { resolve(); return; }
      img.onload = resolve;
      img.onerror = resolve;
    });
    return img;
  }
  
  if (canvas) {
    // Fallback ke canvas
    const newImg = new Image();
    newImg.src = canvas.toDataURL('image/png');
    await new Promise((resolve) => { newImg.onload = resolve; });
    return newImg;
  }
  
  throw new Error('QR belum di-generate. Coba refresh dulu.');
}

// ===== Test Function =====
window.testQRIS = function(amount) {
  try {
    const qrisDynamic = convertQRISDinamis(amount);
    console.log('===== QRIS DINAMIS =====');
    console.log('Nominal: Rp' + amount.toLocaleString('id-ID'));
    console.log('QRIS String:', qrisDynamic);
    console.log('Panjang:', qrisDynamic.length, 'karakter');
    const duplikat = qrisDynamic.indexOf('6304') !== qrisDynamic.lastIndexOf('6304');
    console.log('Cek duplikat 6304:', duplikat ? '❌ ADA DUPLIKAT!' : '✅ OK');
    return qrisDynamic;
  } catch(e) {
    console.error('❌ Error:', e.message);
    return null;
  }
};

console.log('✅ qris-dinamis.js loaded (qrcodejs version). Test: testQRIS(16000)');
