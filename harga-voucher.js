// ============================================
// HARGA & VOUCHER MANAGER
// WafaStoreOnly x Killua Edition
// ============================================

// ===== DEFAULT CONFIG (kalau Firebase kosong) =====
const HARGA_DEFAULT = {
  perRobux: 160,
  perRobuxGamepass: 140,
  perRobuxGift: 95,
  diskonPersen: 0,
  voucherAktif: true
};

// ===== STATE GLOBAL =====
window.hargaConfig = {...HARGA_DEFAULT};
window.voucherApplied = null;
window.voucherDiskon = 0;

// ===== LOAD HARGA (dipanggil dari index.html) =====
window.loadHargaConfig = async function(){
  try{
    if(!window.wafaDB || !window.wafaGet) return;
    const snap = await window.wafaGet(window.wafaRef(window.wafaDB, 'settings/harga/roblox'));
    const d = snap.val();
    if(d){
      window.hargaConfig = {
        perRobux: d.perRobux || HARGA_DEFAULT.perRobux,
        perRobuxGamepass: d.perRobuxGamepass || HARGA_DEFAULT.perRobuxGamepass,
        perRobuxGift: d.perRobuxGift || HARGA_DEFAULT.perRobuxGift,
        diskonPersen: d.diskonPersen || 0,
        voucherAktif: d.voucherAktif !== false
      };
    }
    console.log('✅ Harga loaded:', window.hargaConfig);
  }catch(e){ console.log('Load harga error:', e); }
};

// ===== FORMAT RUPIAH =====
window.fmtRp = function(n){
  return 'Rp' + (n||0).toLocaleString('id-ID');
};

// ===== HITUNG HARGA PAKET (dengan diskon) =====
window.hitungHargaPaket = function(jumlah, tipe){
  const p = tipe === 'gamepass' ? window.hargaConfig.perRobuxGamepass
          : tipe === 'gift' ? window.hargaConfig.perRobuxGift
          : window.hargaConfig.perRobux;
  return Math.round(jumlah * p);
};

// ===== HITUNG HARGA CORET (buat tampilan strikethrough) =====
window.hitungHargaCoret = function(hargaFinal){
  const dp = window.hargaConfig.diskonPersen || 0;
  if(dp <= 0) return hargaFinal;
  return Math.round(hargaFinal / (1 - dp/100));
};

// ===== APPLY VOUCHER =====
window.applyVoucher = async function(){
  const input = document.getElementById('voucherInput');
  const info = document.getElementById('voucherInfo');
  if(!input || !info) return;
  
  const code = (input.value || '').trim().toUpperCase();
  if(!code){ info.style.color='#ef4444'; info.innerText='❌ Masukkan kode dulu'; return; }
  
  if(!window.lastOrderData){
    info.style.color='#ef4444';
    info.innerText='❌ Data order hilang';
    return;
  }
  
  if(!window.hargaConfig.voucherAktif){
    info.style.color='#ef4444';
    info.innerText='❌ Fitur voucher sedang nonaktif';
    return;
  }
  
  info.style.color='#4a90e2';
  info.innerText='⏳ Cek voucher...';
  
  try{
    const snap = await window.wafaGet(window.wafaRef(window.wafaDB, 'vouchers/' + code));
    const v = snap.val();
    
    if(!v){ info.style.color='#ef4444'; info.innerText='❌ Kode voucher tidak ditemukan'; return; }
    if(v.active === false){ info.style.color='#ef4444'; info.innerText='❌ Voucher tidak aktif'; return; }
    if(v.expiry && v.expiry > 0 && Date.now() > v.expiry){
      info.style.color='#ef4444'; info.innerText='❌ Voucher sudah expired'; return;
    }
    if(v.quota && v.used >= v.quota){
      info.style.color='#ef4444'; info.innerText='❌ Kuota voucher habis'; return;
    }
    if(v.minPurchase && window.lastOrderData.total < v.minPurchase){
      info.style.color='#ef4444';
      info.innerText=`❌ Min belanja ${fmtRp(v.minPurchase)}`;
      return;
    }
    
    // Cek per user (1x pakai per voucher)
    const uid = localStorage.getItem('wafa_uid');
    const usageSnap = await window.wafaGet(window.wafaRef(window.wafaDB, 'voucher_usage/' + code + '/' + uid));
    if(usageSnap.exists()){
      info.style.color='#ef4444';
      info.innerText='❌ Kamu udah pernah pakai voucher ini';
      return;
    }
    
    // Hitung potongan
    let potongan = 0;
    if(v.type === 'persen'){
      potongan = Math.round(window.lastOrderData.total * v.value / 100);
      if(v.maxDiscount && potongan > v.maxDiscount) potongan = v.maxDiscount;
    } else {
      potongan = v.value;
    }
    if(potongan > window.lastOrderData.total) potongan = window.lastOrderData.total;
    
    window.voucherApplied = { code: v.code, type: v.type, value: v.value, potongan };
    window.voucherDiskon = potongan;
    
    info.style.color='#4ade80';
    info.innerHTML = `✅ Voucher <b>${v.code}</b> berhasil! Potongan: <b>-${fmtRp(potongan)}</b>`;
    
    updateTotalWithVoucher();
  }catch(e){
    console.error('Voucher error:', e);
    info.style.color='#ef4444';
    info.innerText='❌ Gagal cek voucher: ' + e.message;
  }
};

// ===== UPDATE TOTAL SETELAH VOUCHER =====
window.updateTotalWithVoucher = function(){
  if(!window.lastOrderData) return;
  const totalBaru = Math.max(0, window.lastOrderData.total - window.voucherDiskon);
  document.getElementById('wajibBayar').innerText = fmtRp(totalBaru);
  
  const summaryEl = document.getElementById('orderSummary');
  if(!summaryEl) return;
  
  // Hapus baris voucher lama
  const oldLine = document.getElementById('voucherLine');
  if(oldLine) oldLine.remove();
  
  if(window.voucherDiskon > 0){
    const line = document.createElement('div');
    line.id = 'voucherLine';
    line.style.cssText = 'display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px dashed #2a2a2a';
    line.innerHTML = `<span style="color:#4ade80">🎟️ Voucher (${window.voucherApplied.code})</span><b style="color:#4ade80">-${fmtRp(window.voucherDiskon)}</b>`;
    summaryEl.appendChild(line);
  }
  
  // Re-generate QRIS dengan total baru
  if(typeof generateQRISForAmount === 'function'){
    setTimeout(()=>generateQRISForAmount(totalBaru), 200);
  }
};

// ===== RESET VOUCHER (dipanggil tiap masuk payment) =====
window.resetVoucher = function(){
  window.voucherApplied = null;
  window.voucherDiskon = 0;
  const input = document.getElementById('voucherInput');
  const info = document.getElementById('voucherInfo');
  if(input) input.value = '';
  if(info) info.innerText = '';
  const line = document.getElementById('voucherLine');
  if(line) line.remove();
};

// ===== SIMPAN VOUCHER USAGE (dipanggil setelah order dibuat) =====
window.saveVoucherUsage = async function(orderId){
  if(!window.voucherApplied) return;
  const uid = localStorage.getItem('wafa_uid');
  try{
    await window.wafaUpdate(window.wafaRef(window.wafaDB, 'voucher_usage/' + window.voucherApplied.code + '/' + uid), {
      usedAt: Date.now(),
      orderId: orderId
    });
    // Increment usage counter
    const snap = await window.wafaGet(window.wafaRef(window.wafaDB, 'vouchers/' + window.voucherApplied.code + '/used'));
    const currentUsed = snap.val() || 0;
    await window.wafaUpdate(window.wafaRef(window.wafaDB, 'vouchers/' + window.voucherApplied.code), {
      used: currentUsed + 1
    });
  }catch(e){ console.log('Save voucher usage error:', e); }
};

console.log('✅ harga-voucher.js loaded');
