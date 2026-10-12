// SIDEBAR + CHAT WIDGET + CS BOT + ADMIN CHAT + AVATAR + NOTIF
(function(){
  const sidebarHTML = `
    <div id="wsOverlay" onclick="wsCloseSidebar()"></div>
    <aside id="wsSidebar">
      <div class="ws-logo">
        <img src="./logo.png" alt="logo" id="wsLogoImg">
        <span id="wsBrandName">WafaStoreOnly</span>
      </div>
      <nav class="ws-menu">
        <div class="ws-item" id="wsMenuBeranda" onclick="wsOpen('beranda')">🏠 <span>Beranda</span></div>
        <div class="ws-item" id="wsMenuTopup" onclick="wsToggleTopup(event)">⚡ <span>Top Up Game</span> <span class="arrow">▼</span></div>
        <div class="ws-submenu" id="wsSubTopup">
          <a onclick="wsGo('roblox')" data-game-key="roblox"><img class="ws-game-icon" data-game-icon="roblox" src="./roblox.png" style="width:20px;height:20px;object-fit:contain;border-radius:4px"><span data-game-name="roblox">Roblox</span><span class="ws-game-status" data-game-status="roblox" style="margin-left:auto;font-size:9px;color:#00ff88">AKTIF</span></a>
          <a onclick="wsGo('mlbb')" data-game-key="mlbb"><img class="ws-game-icon" data-game-icon="mlbb" src="./mlbb.png" style="width:20px;height:20px;object-fit:contain;border-radius:4px"><span data-game-name="mlbb">Mobile Legends</span><span class="ws-game-status" data-game-status="mlbb" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span></a>
          <a onclick="wsGo('pubg')" data-game-key="pubg"><img class="ws-game-icon" data-game-icon="pubg" src="./pubg.png" style="width:20px;height:20px;object-fit:contain;border-radius:4px"><span data-game-name="pubg">PUBG Mobile</span><span class="ws-game-status" data-game-status="pubg" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span></a>
          <a onclick="wsGo('ff')" data-game-key="ff"><img class="ws-game-icon" data-game-icon="ff" src="./ff.png" style="width:20px;height:20px;object-fit:contain;border-radius:4px"><span data-game-name="ff">Free Fire</span><span class="ws-game-status" data-game-status="ff" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span></a>
          <a onclick="wsGo('genshin')" data-game-key="genshin"><img class="ws-game-icon" data-game-icon="genshin" src="./genshin.png" style="width:20px;height:20px;object-fit:contain;border-radius:4px"><span data-game-name="genshin">Genshin Impact</span><span class="ws-game-status" data-game-status="genshin" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span></a>
          <a onclick="wsGo('valorant')" data-game-key="valorant"><img class="ws-game-icon" data-game-icon="valorant" src="./valorant.png" style="width:20px;height:20px;object-fit:contain;border-radius:4px"><span data-game-name="valorant">Valorant</span><span class="ws-game-status" data-game-status="valorant" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span></a>
        </div>
        <div class="ws-item" id="wsMenuPesanan" onclick="wsOpen('pesanan')">📦 <span>Pesanan</span></div>
        <div class="ws-item" id="wsMenuDompet" onclick="wsOpen('dompet')">👛 <span>Dompet</span></div>
        <div class="ws-item" id="wsMenuProfil" onclick="wsOpen('profil')">👤 <span>Profil</span></div>
        <div class="ws-item" id="wsMenuLeaderboard" onclick="wsOpen('leaderboard')">🏆 <span>Leaderboard</span></div>
        <div class="ws-item" id="wsMenuChat" onclick="wsOpenChatAdmin()">👤 <span>Chat Admin</span></div>
        <div class="ws-item" id="wsMenuCsBot" onclick="wsOpenCsBot()">🤖 <span>CS Bot</span></div>
        <div class="ws-item" id="wsMenuAdmin" style="display:none" onclick="wsOpen('admin')">🛡️ <span>Admin Panel</span></div>
      </nav>
      <div class="ws-userbox">
        <div class="ws-user" onclick="wsUserBoxClick()">
          <div class="ws-user-avatar" id="wsUserAvatar" onclick="event.stopPropagation();wsOpenAvatarPicker()" title="Klik buat ganti foto profil">
            <span id="wsUserAvatarFallback">👤</span>
          </div>
          <div class="ws-user-info">
            <span id="wsUserName">Guest</span>
            <small id="wsUserEmail">Login untuk order</small>
          </div>
        </div>
      </div>
    </aside>
  `;
  const headerHTML = `
    <header class="ws-header">
      <div class="ws-hamburger" onclick="wsToggleSidebar()">☰</div>
      <div style="font-weight:900;font-size:14px" id="wsPageTitle">WafaStoreOnly ⚡</div>
      <div class="ws-header-user" id="wsHeaderUser" onclick="wsUserBoxClick()">👤 Guest</div>
    </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
  const content = document.getElementById('wsContent');
  if(content){ content.insertAdjacentHTML('afterbegin', headerHTML); }
  else { document.body.insertAdjacentHTML('beforeend', `<div id="wsContent">${headerHTML}</div>`); }
})();

// ===== HELPERS =====
function wsIsLoggedIn(){ return !!localStorage.getItem('wafa_uid'); }
function wsRequireLogin(pageName, redirectTarget){
  if(wsIsLoggedIn()) return true;
  if(confirm(`🔒 ${pageName} butuh login dulu.\n\nMau login sekarang?`)){
    sessionStorage.setItem('wafa_redirect_after_login', redirectTarget || 'index');
    window.location.href = 'login.html';
  }
  return false;
}
function wsUserBoxClick(){
  if(wsIsLoggedIn()){ window.location.href = 'profil.html'; }
  else if(confirm('🔒 Login dulu yuk!\n\nMau login sekarang?')){ sessionStorage.setItem('wafa_redirect_after_login','index'); window.location.href='login.html'; }
}

function wsToggleSidebar(){
  document.getElementById('wsSidebar').classList.toggle('open');
  document.getElementById('wsOverlay').classList.toggle('open');
}
function wsCloseSidebar(){
  document.getElementById('wsSidebar').classList.remove('open');
  document.getElementById('wsOverlay').classList.remove('open');
}
function wsToggleTopup(e){
  e.stopPropagation();
  document.getElementById('wsMenuTopup').classList.toggle('open');
  document.getElementById('wsSubTopup').classList.toggle('open');
}
function wsGo(page){
  wsCloseSidebar();
  if(!wsRequireLogin('Top Up Game','roblox')) return;
  if(page === 'roblox'){ if(typeof openRoblox === 'function') openRoblox(); else window.location.href='index.html#roblox'; }
  else { const gn = document.querySelector(`[data-game-name="${page}"]`); alert(`⚡ Layanan ${gn?gn.innerText:page} sedang diproses.\n\nTunggu update admin ya! 🙏`); }
}
function wsOpen(page){
  wsCloseSidebar();
  if(page === 'beranda'){ if(typeof goHome === 'function') goHome(); else window.location.href='index.html'; return; }
  const pp = { 'pesanan':{name:'Pesanan Saya',target:'pesanan'}, 'dompet':{name:'Dompet',target:'dompet'}, 'profil':{name:'Profil',target:'profil'}, 'admin':{name:'Admin Panel',target:'admin'} };
  if(pp[page]){ if(!wsRequireLogin(pp[page].name, pp[page].target)) return; }
  if(page === 'pesanan'){ if(typeof openPesanan === 'function') openPesanan(); else window.location.href='index.html#pesanan'; }
  else if(page === 'dompet'){ window.location.href='dompet.html'; }
  else if(page === 'profil'){ window.location.href='profil.html'; }
  else if(page === 'leaderboard'){ if(typeof openLeaderboard === 'function') openLeaderboard(); else window.location.href='index.html#leaderboard'; }
  else if(page === 'admin'){ window.location.href='admin.html'; }
}
function wsSetActive(menu){
  document.querySelectorAll('.ws-item').forEach(i=>i.classList.remove('active'));
  const map = { 'beranda':'wsMenuBeranda', 'pesanan':'wsMenuPesanan', 'dompet':'wsMenuDompet', 'profil':'wsMenuProfil', 'leaderboard':'wsMenuLeaderboard', 'chat':'wsMenuChat', 'csbot':'wsMenuCsBot', 'admin':'wsMenuAdmin' };
  const id = map[menu]; if(id){ const el = document.getElementById(id); if(el) el.classList.add('active'); }
}
function wsSetTitle(txt){ const el = document.getElementById('wsPageTitle'); if(el) el.innerText = txt; }
function wsToast(msg){
  let t = document.querySelector('.ws-toast');
  if(!t){ t = document.createElement('div'); t.className = 'ws-toast'; document.body.appendChild(t); }
  t.innerText = msg; t.classList.add('show');
  clearTimeout(t._timer); t._timer = setTimeout(()=>t.classList.remove('show'), 2500);
}

const ADMIN_UIDS = ['5jLY5Gafn7VJvEIarXxDyfMf7v12'];

// ===== AVATAR VARIABLES =====
let wsUserAvatarData = null;
let wsAdminAvatarData = null;

// ===== LOAD USER =====
async function wsLoadUser(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaGet){ setTimeout(wsLoadUser, 500); return; }
    const uid = localStorage.getItem('wafa_uid');
    if(!uid){
      const e1=document.getElementById('wsUserName'), e2=document.getElementById('wsUserEmail'), e3=document.getElementById('wsHeaderUser');
      if(e1) e1.innerText='Guest'; if(e2) e2.innerText='Login untuk order'; if(e3) e3.innerText='👤 Guest';
      wsUserAvatarData = null;
      wsRenderUserAvatar();
      return;
    }
    const snap = await window.wafaGet(window.wafaRef(window.wafaDB, 'users/' + uid));
    const data = snap.val();
    if(data){
      const name = data.nickname || data.name || data.email || 'User';
      const email = data.email || '-';
      const e1=document.getElementById('wsUserName'), e2=document.getElementById('wsUserEmail'), e3=document.getElementById('wsHeaderUser');
      if(e1) e1.innerText = name.slice(0,18);
      if(e2) e2.innerText = email.length > 20 ? email.slice(0,18)+'...' : email;
      if(e3) e3.innerHTML = (data.avatar ? `<img src="${data.avatar}" class="ws-header-user-avatar">` : '👤 ') + name.slice(0,12);
      wsUserAvatarData = data.avatar || null;
      wsRenderUserAvatar();
    }
    if(ADMIN_UIDS.includes(uid)){ const am = document.getElementById('wsMenuAdmin'); if(am) am.style.display='flex'; }
    try{ localStorage.setItem('wafa_user', JSON.stringify({nickname:data.nickname||'',email:data.email||'',saldo:data.saldo||0})); }catch(e){}
  }catch(e){ console.log('wsLoadUser err:', e); }
}

// ===== AVATAR USER =====
function wsRenderUserAvatar(){
  const box = document.getElementById('wsUserAvatar');
  if(!box) return;
  if(wsUserAvatarData){
    box.innerHTML = `<img src="${wsUserAvatarData}" alt="avatar">`;
  } else {
    box.innerHTML = `<span id="wsUserAvatarFallback">👤</span>`;
  }
}

function wsOpenAvatarPicker(){
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Login dulu buat ganti foto profil.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href='login.html';
    }
    return;
  }
  let inp = document.getElementById('wsAvatarPickerInput');
  if(!inp){
    inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.id = 'wsAvatarPickerInput';
    inp.style.display = 'none';
    inp.addEventListener('change', ()=>wsHandleAvatarPick(inp));
    document.body.appendChild(inp);
  }
  inp.value = '';
  inp.click();
}

async function wsHandleAvatarPick(inp){
  const file = inp.files && inp.files[0];
  inp.value = '';
  if(!file) return;
  if(file.size > 2*1024*1024){ wsToast('❌ Foto max 2MB'); return; }
  wsToast('⏳ Upload foto...');
  try{
    const dataUrl = await wsResizeImage(file, 200);
    wsUserAvatarData = dataUrl;
    wsRenderUserAvatar();
    const uid = localStorage.getItem('wafa_uid');
    await window.wafaUpdate(window.wafaRef(window.wafaDB, 'users/' + uid), { avatar: dataUrl, avatarUpdatedAt: Date.now() });
    wsToast('✅ Foto profil diupdate');
    const e3 = document.getElementById('wsHeaderUser');
    if(e3){
      const curName = (e3.innerText || '').replace(/^👤\s*/, '').trim();
      e3.innerHTML = `<img src="${dataUrl}" class="ws-header-user-avatar">` + curName;
    }
  }catch(e){ wsToast('❌ Gagal upload: ' + e.message); }
}

function wsResizeImage(file, maxSize){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try{
          const canvas = document.createElement('canvas');
          canvas.width = maxSize; canvas.height = maxSize;
          const ctx = canvas.getContext('2d');
          const size = Math.min(img.width, img.height);
          ctx.drawImage(img, (img.width - size)/2, (img.height - size)/2, size, size, 0, 0, maxSize, maxSize);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        }catch(err){ reject(err); }
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ===== AVATAR ADMIN =====
function wsLoadAdminAvatar(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadAdminAvatar, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/branding/adminAvatar'), (snap)=>{
      wsAdminAvatarData = snap.val() || null;
      if(wsChatMode && wsCurrentChatData){ wsRenderChatMessages(wsCurrentChatData); }
    });
  }catch(e){}
}

// ===== LOAD BRANDING =====
function wsLoadBranding(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadBranding, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/branding'), (snap)=>{
      const d = snap.val(); if(!d) return;
      if(d.logo){ const li=document.getElementById('wsLogoImg'); if(li) li.src=d.logo; const fav=document.querySelector('link[rel="icon"]')||document.createElement('link'); fav.rel='icon'; fav.href=d.logo; document.head.appendChild(fav); }
      if(d.brandName){ const be=document.getElementById('wsBrandName'); if(be) be.innerText=d.brandName; const te=document.getElementById('wsPageTitle'); if(te) te.innerText=d.brandName+' ⚡'; }
      if(d.adminAvatar) wsAdminAvatarData = d.adminAvatar;
    });
  }catch(e){}
}
function wsLoadGames(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadGames, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/games'), (snap)=>{
      const data = snap.val() || {};
      Object.keys(data).forEach(key=>{
        const g = data[key] || {};
        if(g.logo) document.querySelectorAll(`[data-game-icon="${key}"]`).forEach(img=>{ img.src=g.logo; });
        if(g.name) document.querySelectorAll(`[data-game-name="${key}"]`).forEach(el=>{ el.innerText=g.name; });
        const se = document.querySelector(`[data-game-status="${key}"]`);
        if(se){ const a = g.active === true; if(a){ se.innerText='AKTIF'; se.style.color='#00ff88'; } else { se.innerText='SOON'; se.style.color='#8d94b8'; } }
      });
    });
  }catch(e){}
}
function wsLoadTheme(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadTheme, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/theme'), (snap)=>{
      const d = snap.val(); if(!d) return;
      if(d.primary){ document.documentElement.style.setProperty('--primary', d.primary); document.documentElement.style.setProperty('--killua-primary', d.primary); }
      if(d.accent){ document.documentElement.style.setProperty('--accent', d.accent); document.documentElement.style.setProperty('--killua-accent', d.accent); }
    });
  }catch(e){}
}

// ===== CHAT WIDGET =====
let wsBotConfig = { enabled: false, faq: [] };
let wsChatUnsub = null;
let wsChatMode = null;
let wsChatType = 'admin';
let wsReplyTo = null;
let wsCurrentChatData = {};

(function injectCSS(){
  if(document.getElementById('wsChatCSS')) return;
  const style = document.createElement('style');
  style.id = 'wsChatCSS';
  style.textContent = `
    #wsChatFab{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#4a90e2,#6b5ce7);border:none;color:#fff;font-size:24px;cursor:pointer;z-index:9000;box-shadow:0 8px 24px rgba(74,144,226,0.45);display:none;align-items:center;justify-content:center;transition:transform 0.2s;padding:0}
    #wsChatFab.show{display:flex}
    #wsChatFab .ws-chat-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:10px;min-width:18px;text-align:center;display:none}
    #wsChatFab .ws-chat-badge.show{display:block}
    #wsChatPanel{background:#0a0a0a;display:none;flex-direction:column;overflow:hidden;z-index:9001;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif}
    #wsChatPanel.open{display:flex}
    #wsChatPanel.floating{position:fixed;right:20px;bottom:88px;width:380px;max-width:calc(100vw - 24px);height:600px;max-height:calc(100vh - 110px);border:1px solid #2a2a2a;border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,0.8)}
    #wsChatPanel.fullscreen{position:fixed;inset:0;width:100vw;height:100vh;max-width:100vw;max-height:100vh;border:none;border-radius:0;z-index:99999}
    #wsChatPanel.cs-mode #wsChatHeader{background:linear-gradient(135deg,#1a0f2e,#0f1a2e)}
    #wsChatPanel.admin-mode #wsChatHeader{background:#141414}
    #wsChatHeader{padding:10px 12px;background:#141414;border-bottom:1px solid #1f1f1f;display:flex;align-items:center;gap:10px;flex-shrink:0;position:relative}
    #wsChatHeader .ws-chat-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#6b5ce7,#4a90e2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;position:relative;overflow:hidden}
    #wsChatHeader .ws-chat-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
    #wsChatHeader .ws-chat-avatar::after{content:'';position:absolute;bottom:1px;right:1px;width:10px;height:10px;background:#4ade80;border:2px solid #141414;border-radius:50%}
    #wsChatHeader .ws-chat-headinfo{flex:1;min-width:0}
    #wsChatHeader .ws-chat-title{font-weight:800;font-size:14px;color:#e8e8e8;display:block;line-height:1.2}
    #wsChatHeader .ws-chat-status{font-size:11px;color:#4ade80;display:block;margin-top:2px;font-weight:600}
    #wsChatHeader .ws-chat-btn{background:transparent;border:none;color:#8a8a8a;font-size:18px;cursor:pointer;padding:6px 8px;line-height:1;border-radius:8px;font-family:inherit}
    #wsChatHeader .ws-chat-btn:hover{background:#1f1f1f;color:#e8e8e8}
    #wsChatMessages{flex:1;overflow-y:auto;padding:14px 12px 6px 12px;display:flex;flex-direction:column;gap:2px;background:#0a0a0a;position:relative;scroll-behavior:smooth}
    #wsChatMessages::-webkit-scrollbar{width:5px}
    #wsChatMessages::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
    #wsChatPanel.fullscreen #wsChatMessages{padding:20px max(20px, calc((100vw - 900px)/2)) 20px max(20px, calc((100vw - 900px)/2))}
    .ws-date-sep{text-align:center;margin:12px 0 6px 0}
    .ws-date-sep span{display:inline-block;background:#1a1a1a;color:#8a8a8a;font-size:10px;font-weight:700;padding:4px 12px;border-radius:12px;text-transform:uppercase}
    .ws-msg-row{display:flex;gap:6px;align-items:flex-end;max-width:100%;padding:1px 0}
    .ws-msg-row.mine{justify-content:flex-end}
    .ws-msg-row.theirs{justify-content:flex-start}
    .ws-msg-row.grouped-top{margin-top:6px}
    .ws-msg-avatar{width:26px;height:26px;border-radius:50%;background:#2a2a2a;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;align-self:flex-end;margin-bottom:2px;overflow:hidden}
    .ws-msg-avatar.hidden{visibility:hidden}
    .ws-msg-avatar.has-img{background:transparent}
    .ws-msg-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block}
    .ws-bubble{max-width:78%;padding:7px 11px 6px 11px;border-radius:16px;font-size:13px;line-height:1.4;word-wrap:break-word;white-space:pre-wrap;position:relative;cursor:default}
    .ws-bubble.mine{background:#4a90e2;color:#fff;border-bottom-right-radius:4px}
    .ws-bubble.theirs{background:#1f1f1f;border:1px solid #2a2a2a;color:#e8e8e8;border-bottom-left-radius:4px}
    .ws-bubble.bot{background:linear-gradient(135deg,#6b5ce7,#4a90e2);color:#fff;border-bottom-left-radius:4px;border:1px solid rgba(107,92,231,0.6)}
    .ws-bubble.admin{background:#065f46;color:#e8e8e8;border-bottom-left-radius:4px;border:1px solid rgba(74,222,128,0.4)}
    .ws-bubble img{max-width:100%;max-height:280px;border-radius:10px;margin:-2px 0 4px 0;display:block;cursor:pointer}
    .ws-bubble .ws-bot-label{font-size:10px;font-weight:800;color:rgba(255,255,255,0.95);margin-bottom:4px;display:flex;align-items:center;gap:4px;letter-spacing:0.3px}
    .ws-bubble .ws-admin-label{font-size:10px;font-weight:800;color:#4ade80;margin-bottom:4px;display:flex;align-items:center;gap:4px;letter-spacing:0.3px}
    .ws-bubble .ws-deleted-tag{font-size:10px;font-style:italic;opacity:0.7;margin-bottom:4px}
    .ws-reply-preview{background:rgba(0,0,0,0.25);border-left:3px solid rgba(255,255,255,0.6);border-radius:6px;padding:5px 8px;margin-bottom:5px;font-size:11px;line-height:1.3;overflow:hidden}
    .ws-bubble.theirs .ws-reply-preview,.ws-bubble.admin .ws-reply-preview{background:rgba(255,255,255,0.05);border-left-color:#4a90e2}
    .ws-reply-preview .ws-reply-name{font-weight:800;opacity:0.9;margin-bottom:1px}
    .ws-reply-preview .ws-reply-text{opacity:0.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}
    .ws-bubble-footer{display:flex;align-items:center;justify-content:flex-end;gap:4px;margin-top:2px;font-size:10px;opacity:0.7}
    .ws-bubble.mine .ws-bubble-footer{color:rgba(255,255,255,0.85)}
    .ws-bubble.theirs .ws-bubble-footer,.ws-bubble.admin .ws-bubble-footer{color:#8a8a8a}
    .ws-read-tick{font-size:11px;letter-spacing:-2px;font-weight:700}
    .ws-read-tick.read{color:#6ee7f9}
    .ws-typing{display:flex;gap:3px;padding:11px 14px;background:#1f1f1f;border-radius:16px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content;margin-left:32px}
    .ws-typing span{width:6px;height:6px;background:#8a8a8a;border-radius:50%;animation:wsDot 1.4s infinite}
    .ws-typing span:nth-child(2){animation-delay:0.2s}
    .ws-typing span:nth-child(3){animation-delay:0.4s}
    @keyframes wsDot{0%,60%,100%{opacity:0.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
    .ws-chat-quick{display:flex;gap:6px;padding:6px 10px 8px 10px;flex-wrap:wrap;background:#141414;border-top:1px solid #1f1f1f}
    .ws-chat-quick button{padding:6px 11px;border-radius:16px;border:1px solid #2a2a2a;background:#0a0a0a;color:#a8a8a8;font-size:11px;cursor:pointer;font-family:inherit}
    .ws-chat-quick button:hover{border-color:#4a90e2;color:#4a90e2}
    #wsChatPanel.admin-mode .ws-chat-quick{display:none}
    #wsReplyBar{display:none;padding:8px 12px;background:#141414;border-top:1px solid #1f1f1f;gap:8px;align-items:center}
    #wsReplyBar.show{display:flex}
    #wsReplyBar .ws-reply-bar-content{flex:1;background:#1f1f1f;border-left:3px solid #4a90e2;border-radius:6px;padding:6px 10px;font-size:11px;overflow:hidden;min-width:0}
    #wsReplyBar .ws-reply-bar-name{font-weight:800;color:#4a90e2;margin-bottom:1px}
    #wsReplyBar .ws-reply-bar-text{color:#a8a8a8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    #wsReplyBar .ws-reply-close{background:transparent;border:none;color:#8a8a8a;font-size:18px;cursor:pointer;padding:4px 6px;font-family:inherit}
    #wsChatInput{display:flex;gap:6px;padding:8px 10px;border-top:1px solid #1f1f1f;background:#141414;align-items:flex-end;flex-shrink:0}
    #wsChatPanel.fullscreen #wsChatInput{padding:12px max(20px, calc((100vw - 900px)/2)) 20px max(20px, calc((100vw - 900px)/2))}
    #wsChatInput input[type=text]{flex:1;padding:9px 14px;border-radius:20px;border:1px solid #2a2a2a;background:#0a0a0a;color:#e8e8e8;outline:none;font-size:13px;font-family:inherit;min-width:0}
    #wsChatInput input[type=text]:focus{border-color:#4a90e2}
    #wsChatInput .ws-icon-btn{width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;padding:0;font-family:inherit}
    #wsChatInput .ws-icon-btn.attach{background:#2a2a2a;color:#e8e8e8}
    #wsChatInput .ws-icon-btn.send{background:#4a90e2;color:#fff}
    #wsChatEmpty{text-align:center;color:#5a5a5a;font-size:12px;padding:32px 20px;line-height:1.7;margin:auto}
    #wsChatEmpty .big{font-size:48px;margin-bottom:12px;line-height:1;opacity:0.5}
    .ws-msg-menu{position:fixed;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:6px;z-index:999999;box-shadow:0 12px 40px rgba(0,0,0,0.7);min-width:170px;animation:wsMenuPop 0.15s ease}
    @keyframes wsMenuPop{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
    .ws-msg-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;background:transparent;border:none;color:#e8e8e8;font-size:13px;cursor:pointer;text-align:left;border-radius:8px;font-family:inherit}
    .ws-msg-menu button:hover{background:#2a2a2a}
    .ws-msg-menu button.danger{color:#ef4444}
    .ws-header-menu{position:absolute;top:52px;right:12px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:6px;z-index:9002;box-shadow:0 12px 40px rgba(0,0,0,0.7);min-width:200px}
    .ws-header-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;background:transparent;border:none;color:#e8e8e8;font-size:13px;cursor:pointer;text-align:left;border-radius:8px;font-family:inherit}
    .ws-header-menu button:hover{background:#2a2a2a}
    #wsScrollBottom{position:absolute;right:14px;bottom:120px;width:36px;height:36px;border-radius:50%;background:#1f1f1f;border:1px solid #2a2a2a;color:#e8e8e8;font-size:16px;cursor:pointer;display:none;align-items:center;justify-content:center;z-index:9002;padding:0}
    #wsScrollBottom.show{display:flex}
    #wsImgViewer{position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9999999;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(10px)}
    #wsImgViewer.show{display:flex}
    #wsImgViewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}
    #wsImgViewer .ws-img-close{position:absolute;top:16px;right:16px;width:40px;height:40px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:50%;color:#e8e8e8;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
    .ws-confirm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999998;display:flex;align-items:center;justify-content:center;padding:20px}
    .ws-confirm-box{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:18px;padding:22px;max-width:340px;width:100%;text-align:center}
    .ws-confirm-box .title{font-size:15px;font-weight:800;color:#e8e8e8;margin-bottom:8px}
    .ws-confirm-box .desc{font-size:12px;color:#8a8a8a;line-height:1.6;margin-bottom:18px}
    .ws-confirm-box .btns{display:flex;gap:8px}
    .ws-confirm-box button{flex:1;padding:12px;border-radius:10px;border:none;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}
    .ws-confirm-box button.cancel{background:#2a2a2a;color:#e8e8e8}
    .ws-confirm-box button.danger{background:#ef4444;color:#fff}
    .ws-confirm-box input{width:100%;padding:10px 12px;border-radius:8px;border:1px solid #2a2a2a;background:#0a0a0a;color:#e8e8e8;font-size:13px;font-family:inherit;margin-bottom:12px;outline:none}
    .ws-user{display:flex;align-items:center;gap:10px}
    .ws-user-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#6b5ce7,#4a90e2);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;flex-shrink:0;cursor:pointer;border:2px solid #2a2a2a;transition:0.15s;position:relative;overflow:hidden}
    .ws-user-avatar:hover{border-color:#4a90e2}
    .ws-user-avatar img{width:100%;height:100%;object-fit:cover;display:block}
    .ws-user-avatar::after{content:'📷';position:absolute;bottom:0;right:0;width:16px;height:16px;background:#4a90e2;border-radius:50%;font-size:9px;display:flex;align-items:center;justify-content:center;border:2px solid #0a0a0a;opacity:0;transition:0.15s}
    .ws-user-avatar:hover::after{opacity:1}
    .ws-user-info{flex:1;min-width:0}
    .ws-user-info>span{display:block;font-weight:700;font-size:13px;color:#e8e8e8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ws-user-info>small{display:block;font-size:10px;color:#8a8a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
    .ws-header-user-avatar{width:20px;height:20px;border-radius:50%;object-fit:cover;margin-right:4px;vertical-align:middle;display:inline-block}
    .ws-item{position:relative}
    .ws-menu-badge{position:absolute;right:20px;top:50%;transform:translateY(-50%);background:#ef4444;color:#fff;font-size:9px;font-weight:800;padding:2px 6px;border-radius:10px;min-width:18px;text-align:center;line-height:1.4;box-shadow:0 0 6px rgba(239,68,68,0.5);display:none;align-items:center;justify-content:center}
    @media (max-width:500px){
      #wsChatPanel.floating{right:8px;left:8px;bottom:74px;width:auto;height:calc(100vh - 90px);max-height:calc(100vh - 90px);border-radius:16px}
      #wsChatFab{right:14px;bottom:14px;width:52px;height:52px}
    }
  `;
  document.head.appendChild(style);
})();

(function injectHTML(){
  if(document.getElementById('wsChatFab')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="wsChatFab" onclick="wsOpenCsBot()" aria-label="Chat CS">
      🤖<span class="ws-chat-badge" id="wsChatBadge">0</span>
    </button>
    <div id="wsChatPanel" class="admin-mode">
      <div id="wsChatHeader">
        <button class="ws-chat-btn" id="wsChatBackBtn" style="display:none" onclick="wsChatClose()">←</button>
        <div class="ws-chat-avatar" id="wsChatAvatar">👤</div>
        <div class="ws-chat-headinfo">
          <span class="ws-chat-title" id="wsChatTitle">Chat Admin</span>
          <span class="ws-chat-status" id="wsChatStatus">Online • Dibalas manual admin</span>
        </div>
        <button class="ws-chat-btn" onclick="wsToggleHeaderMenu(event)">⋮</button>
        <button class="ws-chat-btn" onclick="wsChatClose()">✕</button>
      </div>
      <div id="wsChatMessages">
        <div id="wsChatEmpty"><div class="big">💬</div>Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.</div>
      </div>
      <button id="wsScrollBottom" onclick="wsScrollToBottom()">▼</button>
      <div class="ws-chat-quick" id="wsChatQuick">
        <button onclick="wsQuickAsk('Cara order gimana?')">Cara order</button>
        <button onclick="wsQuickAsk('Metode pembayaran apa aja?')">Pembayaran</button>
        <button onclick="wsQuickAsk('Berapa lama prosesnya?')">Lama proses</button>
        <button onclick="wsQuickAsk('Minimal top up berapa?')">Min top up</button>
      </div>
      <div id="wsReplyBar">
        <div class="ws-reply-bar-content">
          <div class="ws-reply-bar-name" id="wsReplyBarName">@user</div>
          <div class="ws-reply-bar-text" id="wsReplyBarText">...</div>
        </div>
        <button class="ws-reply-close" onclick="wsCancelReply()">✕</button>
      </div>
      <div id="wsChatInput">
        <input type="file" id="wsChatFileInput" accept="image/*" style="display:none" onchange="wsUploadChatImage(this)">
        <button class="ws-icon-btn attach" onclick="document.getElementById('wsChatFileInput').click()">📎</button>
        <input type="text" id="wsChatTextInput" placeholder="Ketik pesan..." onkeypress="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();wsSendChatMsg()}">
        <button class="ws-icon-btn send" onclick="wsSendChatMsg()">➤</button>
      </div>
    </div>
    <div id="wsImgViewer" onclick="wsCloseFullImage(event)">
      <button class="ws-img-close" onclick="wsCloseFullImage(event)">✕</button>
      <img id="wsImgViewerImg" src="" alt="Gambar">
    </div>
  `;
  document.body.appendChild(wrap);
})();

// ===== HELPER: PATH CHAT DINAMIS =====
function wsChatBase(){
  return wsChatType === 'cs' ? 'cs_chats' : 'admin_chats';
}
function wsChatPath(uid, msgId){
  const base = wsChatBase();
  return msgId ? `${base}/${uid}/${msgId}` : `${base}/${uid}`;
}

// ===== FAB: BUKA CS BOT =====
function wsOpenCsBot(){
  wsCloseSidebar();
  if(!wsIsLoggedIn()){
    if(confirm('🔒 CS Bot butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href='login.html';
    }
    return;
  }
  wsChatOpen('floating', 'cs');
}

// ===== FAB BADGE (UNREAD DARI CS) =====
function wsSyncChatFab(){
  const fab = document.getElementById('wsChatFab');
  if(!fab) return;
  fab.classList.add('show');
}
function wsInitFabBadge(){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB || !window.wafaOnValue){ setTimeout(wsInitFabBadge, 500); return; }
  window.wafaOnValue(window.wafaRef(window.wafaDB, 'cs_chats/' + uid), (snap)=>{
    const data = snap.val() || {};
    let unread = 0;
    Object.values(data).forEach(m=>{
      if((m.from === 'admin' || m.from === 'bot') && !m.read && !m.hiddenForUser) unread++;
    });
    const badge = document.getElementById('wsChatBadge');
    if(!badge) return;
    if(unread > 0){ badge.textContent = unread > 99 ? '99+' : unread; badge.classList.add('show'); }
    else badge.classList.remove('show');
  });
}

// ===== SOUND NOTIF USER =====
let wsAudioCtx = null;
let wsSoundEnabled = localStorage.getItem('wafa_user_sound') !== 'off';
function wsPlayNotifSound(){
  if(!wsSoundEnabled) return;
  try {
    wsAudioCtx = wsAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if(wsAudioCtx.state === 'suspended') wsAudioCtx.resume();
    const o = wsAudioCtx.createOscillator();
    const g = wsAudioCtx.createGain();
    o.connect(g); g.connect(wsAudioCtx.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(660, wsAudioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(990, wsAudioCtx.currentTime + 0.12);
    g.gain.setValueAtTime(0.15, wsAudioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, wsAudioCtx.currentTime + 0.4);
    o.start(); o.stop(wsAudioCtx.currentTime + 0.4);
  } catch(e){}
}

// ===== GLOBAL NOTIF LISTENER =====
let wsGlobalChatState = { cs: 0, admin: 0, initialized: false };

function wsInitGlobalChatListener(){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB || !window.wafaOnValue){ setTimeout(wsInitGlobalChatListener, 500); return; }

  window.wafaOnValue(window.wafaRef(window.wafaDB, 'cs_chats/' + uid), (snap) => {
    const data = snap.val() || {};
    const adminMsgs = Object.values(data).filter(m => (m.from === 'admin' || m.from === 'bot') && !m.hiddenForUser);
    const latestTime = adminMsgs.reduce((mx, m) => Math.max(mx, m.time || 0), 0);
    if(!wsGlobalChatState.initialized){ wsGlobalChatState.cs = latestTime; return; }
    if(latestTime > wsGlobalChatState.cs){
      wsGlobalChatState.cs = latestTime;
      const isChatOpen = wsChatMode && wsChatType === 'cs' && !document.hidden;
      if(!isChatOpen){ wsPlayNotifSound(); wsUpdateMenuBadge('cs'); }
    }
  });

  window.wafaOnValue(window.wafaRef(window.wafaDB, 'admin_chats/' + uid), (snap) => {
    const data = snap.val() || {};
    const adminMsgs = Object.values(data).filter(m => m.from === 'admin' && !m.hiddenForUser);
    const latestTime = adminMsgs.reduce((mx, m) => Math.max(mx, m.time || 0), 0);
    if(!wsGlobalChatState.initialized){ wsGlobalChatState.admin = latestTime; return; }
    if(latestTime > wsGlobalChatState.admin){
      wsGlobalChatState.admin = latestTime;
      const isChatOpen = wsChatMode && wsChatType === 'admin' && !document.hidden;
      if(!isChatOpen){ wsPlayNotifSound(); wsUpdateMenuBadge('admin'); }
    }
  });

  setTimeout(() => { wsGlobalChatState.initialized = true; }, 2500);
}

function wsUpdateMenuBadge(type){
  const menuId = type === 'cs' ? 'wsMenuCsBot' : 'wsMenuChat';
  const menu = document.getElementById(menuId);
  if(!menu) return;
  let badge = menu.querySelector('.ws-menu-badge');
  if(!badge){
    badge = document.createElement('span');
    badge.className = 'ws-menu-badge';
    menu.appendChild(badge);
  }
  const cur = parseInt(badge.innerText) || 0;
  badge.innerText = Math.min(cur + 1, 99);
  badge.style.display = 'flex';
}

function wsClearMenuBadge(type){
  const menuId = type === 'cs' ? 'wsMenuCsBot' : 'wsMenuChat';
  const menu = document.getElementById(menuId);
  if(!menu) return;
  const badge = menu.querySelector('.ws-menu-badge');
  if(badge) badge.style.display = 'none';
}

// ===== TOGGLE CHAT =====
function wsChatOpen(mode, type){
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Chat butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login','index');
      window.location.href='login.html';
    }
    return;
  }
  wsChatType = type || 'admin';
  wsClearMenuBadge(wsChatType);
  const panel = document.getElementById('wsChatPanel');
  const backBtn = document.getElementById('wsChatBackBtn');
  if(!panel) return;

  if(wsChatUnsub){ wsChatUnsub(); wsChatUnsub = null; }
  wsCancelReply();

  const avatar = document.getElementById('wsChatAvatar');
  const title = document.getElementById('wsChatTitle');
  const status = document.getElementById('wsChatStatus');
  const empty = document.getElementById('wsChatEmpty');
  if(wsChatType === 'cs'){
    panel.classList.remove('admin-mode');
    panel.classList.add('cs-mode');
    if(avatar) avatar.textContent = '🤖';
    if(title) title.textContent = 'CS Bot • WafaStoreOnly';
    if(status) status.textContent = 'Online • Balasan otomatis';
    if(empty){ empty.innerHTML = '<div class="big">🤖</div>Halo kak! Saya CS Bot WafaStoreOnly.<br>Ketik pertanyaan seputar order, pembayaran, atau layanan.<br><br><span style="opacity:0.6;font-size:11px">Kalau bot gak bisa jawab, admin bakal bales di sini juga.</span>'; }
  } else {
    panel.classList.remove('cs-mode');
    panel.classList.add('admin-mode');
    if(avatar) avatar.textContent = '👤';
    if(title) title.textContent = 'Chat Admin';
    if(status) status.textContent = 'Online • Dibalas manual admin';
    if(empty){ empty.innerHTML = '<div class="big">💬</div>Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.'; }
  }

  panel.classList.remove('floating','fullscreen');
  panel.classList.add(mode);
  panel.classList.add('open');
  wsChatMode = mode;
  if(backBtn) backBtn.style.display = (mode === 'fullscreen') ? 'block' : 'none';
  wsChatOpenSession();
  setTimeout(()=>{ const inp=document.getElementById('wsChatTextInput'); if(inp) inp.focus(); wsScrollToBottom(true); }, 250);
}

function wsChatClose(){
  const panel = document.getElementById('wsChatPanel');
  if(!panel) return;
  panel.classList.remove('open','floating','fullscreen');
  wsChatMode = null;
  wsCancelReply();
  wsChatCloseSession();
}

function wsOpenChatAdmin(){
  wsCloseSidebar();
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Chat butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login','index');
      window.location.href='login.html';
    }
    return;
  }
  wsChatOpen('fullscreen', 'admin');
}

function wsChatOpenSession(){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB) return;
  if(wsChatUnsub) wsChatUnsub();
  wsChatUnsub = window.wafaOnValue(window.wafaRef(window.wafaDB, wsChatPath(uid)), (snap)=>{
    const data = snap.val() || {};
    wsCurrentChatData = data;
    wsRenderChatMessages(data);
    wsMarkRead(data);
  });
}
function wsChatCloseSession(){ if(wsChatUnsub){ wsChatUnsub(); wsChatUnsub = null; } }

function wsFormatDate(ts){
  if(!ts) return '';
  const d = new Date(ts); const now = new Date();
  const today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const md = new Date(d.getFullYear(),d.getMonth(),d.getDate());
  const diff = Math.round((today-md)/(1000*60*60*24));
  if(diff === 0) return 'Hari ini';
  if(diff === 1) return 'Kemarin';
  const days=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
function wsFormatTime(ts){ if(!ts) return ''; return new Date(ts).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}); }
function wsGroupByDate(msgs){
  const groups = []; let cur = null;
  msgs.forEach(m=>{ const day = m.time ? new Date(m.time).toDateString() : 'unknown'; if(day !== cur){ groups.push({type:'date', date:m.time}); cur=day; } groups.push({type:'msg', data:m}); });
  return groups;
}
function wsEscape(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function wsRenderChatMessages(data){
  const box = document.getElementById('wsChatMessages');
  if(!box) return;
  const msgs = Object.entries(data).map(([k,v])=>({...v,_id:k}))
    .filter(m => !m.hiddenForUser)
    .sort((a,b)=>(a.time||0)-(b.time||0));

  if(msgs.length === 0){
    const emptyMsg = wsChatType === 'cs'
      ? '<div class="big">🤖</div>Halo kak! Saya CS Bot WafaStoreOnly.<br>Ketik pertanyaan seputar order, pembayaran, atau layanan.<br><br><span style="opacity:0.6;font-size:11px">Kalau bot gak bisa jawab, admin bakal bales di sini juga.</span>'
      : '<div class="big">💬</div>Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.';
    box.innerHTML = `<div id="wsChatEmpty">${emptyMsg}</div>`;
    return;
  }
  const wasNearBottom = (box.scrollHeight - box.scrollTop - box.clientHeight) < 80;
  box.innerHTML = '';
  const groups = wsGroupByDate(msgs);
  let prevFrom = null, prevTime = 0;

  groups.forEach(g=>{
    if(g.type === 'date'){
      const sep = document.createElement('div');
      sep.className = 'ws-date-sep';
      sep.innerHTML = `<span>${wsFormatDate(g.date)}</span>`;
      box.appendChild(sep);
      prevFrom = null; prevTime = 0;
      return;
    }
    const m = g.data;
    const isBot = m.from === 'bot';
    const isAdmin = m.from === 'admin';
    const isUser = m.from === 'user';
    const from = isUser ? 'mine' : isBot ? 'bot' : isAdmin ? 'admin' : 'theirs';
    const grouped = (prevFrom === from) && (m.time - prevTime < 120000);
    prevFrom = from; prevTime = m.time;

    const row = document.createElement('div');
    row.className = 'ws-msg-row ' + (isUser ? 'mine' : 'theirs');
    if(!grouped) row.classList.add('grouped-top');

    if(!isUser){
      const av = document.createElement('div');
      av.className = 'ws-msg-avatar' + (grouped ? ' hidden' : '');
      if(isBot){
        av.textContent = '🤖';
      } else if(isAdmin && wsAdminAvatarData){
        av.classList.add('has-img');
        av.innerHTML = `<img src="${wsAdminAvatarData}" alt="admin">`;
      } else if(isAdmin){
        av.textContent = '👨‍💼';
      } else {
        av.textContent = '👤';
      }
      row.appendChild(av);
    }

    const bubble = document.createElement('div');
    bubble.className = 'ws-bubble ' + from;
    bubble.dataset.id = m._id;

    if(m.replyTo){
      const rp = document.createElement('div');
      rp.className = 'ws-reply-preview';
      const rn = m.replyTo.from === 'user' ? 'Kamu' : (m.replyTo.from === 'bot' ? 'CS Bot' : 'Admin');
      rp.innerHTML = `<div class="ws-reply-name">↩ ${wsEscape(rn)}</div><div class="ws-reply-text">${wsEscape(m.replyTo.text||'[Gambar]')}</div>`;
      bubble.appendChild(rp);
    }

    if(isBot){
      const lbl = document.createElement('div');
      lbl.className = 'ws-bot-label';
      lbl.innerHTML = '🤖 CS Bot <span style="font-weight:500;opacity:0.75;font-size:9px">• pesan otomatis</span>';
      bubble.appendChild(lbl);
    } else if(isAdmin){
      const lbl = document.createElement('div');
      lbl.className = 'ws-admin-label';
      lbl.innerHTML = '👨‍💼 Admin <span style="font-weight:500;opacity:0.7;font-size:9px">• manual</span>';
      bubble.appendChild(lbl);
    }

    if(m.image){
      const img = document.createElement('img');
      img.src = m.image;
      img.onclick = (e)=>{ e.stopPropagation(); wsOpenFullImage(m.image); };
      bubble.appendChild(img);
      if(m.text){ const t = document.createElement('div'); t.textContent = m.text; bubble.appendChild(t); }
    } else {
      bubble.appendChild(document.createTextNode(m.text || ''));
    }

    const footer = document.createElement('div');
    footer.className = 'ws-bubble-footer';
    const editedTag = m.edited ? ` <span style="opacity:0.6;font-style:italic">(diedit)</span>` : '';
    const tickHtml = isUser ? `<span class="ws-read-tick${m.read ? ' read' : ''}">${m.read ? '✓✓' : '✓'}</span>` : '';
    footer.innerHTML = `<span>${wsFormatTime(m.time)}${editedTag}</span>${tickHtml}`;
    bubble.appendChild(footer);

    wsAttachMsgActions(bubble, m);
    row.appendChild(bubble);
    box.appendChild(row);
  });

  if(wasNearBottom) wsScrollToBottom(true);
  wsUpdateScrollBtn();
}

function wsAttachMsgActions(bubble, msg){
  let pressTimer = null, longPressed = false;
  const startPress = ()=>{ longPressed=false; pressTimer=setTimeout(()=>{ longPressed=true; wsShowMsgMenu(bubble,msg); },500); };
  const cancelPress = ()=>{ if(pressTimer){ clearTimeout(pressTimer); pressTimer=null; } };
  bubble.addEventListener('touchstart', startPress, {passive:true});
  bubble.addEventListener('touchend', (e)=>{ cancelPress(); if(longPressed) e.preventDefault(); });
  bubble.addEventListener('touchmove', cancelPress, {passive:true});
  bubble.addEventListener('touchcancel', cancelPress);
  bubble.addEventListener('contextmenu', (e)=>{ e.preventDefault(); wsShowMsgMenu(bubble,msg); });
}

function wsShowMsgMenu(bubbleEl, msg){
  document.querySelectorAll('.ws-msg-menu').forEach(m=>m.remove());
  const isMine = msg.from === 'user';
  const age = Date.now() - (msg.time||0);
  const within3Min = age < 3*60*1000;
  const menu = document.createElement('div');
  menu.className = 'ws-msg-menu';
  let buttons = '';
  if(msg.text && !msg.image) buttons += `<button data-action="copy">📋 Copy</button>`;
  buttons += `<button data-action="reply">↩️ Reply</button>`;
  if(isMine && within3Min){
    buttons += `<button data-action="edit">✏️ Edit</button>`;
    buttons += `<button data-action="delete" class="danger">🗑️ Hapus</button>`;
  } else if(isMine && !within3Min){
    buttons += `<button disabled style="opacity:0.4;cursor:not-allowed">⏰ Udah lewat 3 menit</button>`;
  }
  menu.innerHTML = buttons;
  document.body.appendChild(menu);

  const rect = bubbleEl.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  let left = rect.left, top = rect.top - menuRect.height - 8;
  if(top < 10) top = rect.bottom + 8;
  if(left + menuRect.width > window.innerWidth - 10) left = window.innerWidth - menuRect.width - 10;
  if(left < 10) left = 10;
  menu.style.left = left + 'px'; menu.style.top = top + 'px';

  menu.querySelectorAll('button').forEach(btn=>{
    btn.onclick = (e)=>{
      e.stopPropagation();
      const action = btn.dataset.action;
      if(!action) return;
      menu.remove();
      if(action === 'copy') wsCopyMsg(msg.text);
      else if(action === 'reply') wsSetReply(msg);
      else if(action === 'edit') wsEditMsgUser(msg._id, msg.text||'');
      else if(action === 'delete') wsConfirmDeleteMsg(msg._id);
    };
  });
  setTimeout(()=>{
    const close = (e)=>{ if(!menu.contains(e.target)){ menu.remove(); document.removeEventListener('click', close); document.removeEventListener('touchstart', close); } };
    document.addEventListener('click', close); document.addEventListener('touchstart', close);
  }, 50);
}

function wsCopyMsg(text){ if(!text) return; navigator.clipboard.writeText(text).then(()=>wsToast('📋 Pesan disalin')).catch(()=>wsToast('❌ Gagal')); }
function wsSetReply(msg){
  wsReplyTo = { msgId: msg._id, text: msg.text||'[Gambar]', from: msg.from };
  const bar = document.getElementById('wsReplyBar');
  const labelFrom = msg.from === 'user' ? 'Kamu' : (msg.from === 'bot' ? 'CS Bot' : 'Admin');
  document.getElementById('wsReplyBarName').innerText = '↩ Membalas ' + labelFrom;
  document.getElementById('wsReplyBarText').innerText = msg.text || '[Gambar]';
  bar.classList.add('show');
  const inp = document.getElementById('wsChatTextInput'); if(inp) inp.focus();
}
function wsCancelReply(){ wsReplyTo = null; const bar = document.getElementById('wsReplyBar'); if(bar) bar.classList.remove('show'); }

function wsEditMsgUser(msgId, oldText){
  const overlay = document.createElement('div');
  overlay.className = 'ws-confirm-overlay';
  overlay.innerHTML = `<div class="ws-confirm-box"><div class="title">✏️ Edit Pesan</div><div class="desc">Bisa edit dalam 3 menit pertama.</div><input type="text" id="wsEditInput" value="${wsEscape(oldText).replace(/"/g,'&quot;')}"><div class="btns"><button class="cancel" id="wsCxlEdit">Batal</button><button class="danger" id="wsCfmEdit" style="background:#4a90e2">Simpan</button></div></div>`;
  document.body.appendChild(overlay);
  const inp = overlay.querySelector('#wsEditInput'); inp.focus();
  overlay.querySelector('#wsCxlEdit').onclick = ()=>overlay.remove();
  overlay.querySelector('#wsCfmEdit').onclick = async ()=>{
    const newText = inp.value.trim();
    if(!newText){ wsToast('Isi teks dulu'); return; }
    overlay.remove();
    const uid = localStorage.getItem('wafa_uid');
    if(!uid) return;
    try{
      const snap = await window.wafaGet(window.wafaRef(window.wafaDB, wsChatPath(uid, msgId)));
      const orig = snap.val() || {};
      await window.wafaUpdate(window.wafaRef(window.wafaDB, wsChatPath(uid, msgId)), {
        text: newText, edited: true, editedAt: Date.now(), editedBy: 'user',
        originalText: orig.originalText || orig.text || ''
      });
      wsToast('✏️ Pesan diedit');
    }catch(e){ wsToast('❌ Gagal edit: ' + e.message); }
  };
  overlay.onclick = (e)=>{ if(e.target === overlay) overlay.remove(); };
}

function wsConfirmDeleteMsg(msgId){
  const overlay = document.createElement('div');
  overlay.className = 'ws-confirm-overlay';
  overlay.innerHTML = `<div class="ws-confirm-box"><div class="title">Hapus pesan?</div><div class="desc">Pesan bakal <b style="color:#ef4444">dihapus dari sisi kamu</b>.<br>Admin masih bisa liat kalau perlu.</div><div class="btns"><button class="cancel" id="wsCxlDel">Batal</button><button class="danger" id="wsCfmDel">Hapus</button></div></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#wsCxlDel').onclick = ()=>overlay.remove();
  overlay.querySelector('#wsCfmDel').onclick = async ()=>{ overlay.remove(); await wsDeleteMsgUser(msgId); };
  overlay.onclick = (e)=>{ if(e.target === overlay) overlay.remove(); };
}
async function wsDeleteMsgUser(msgId){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid) return;
  try{
    await window.wafaUpdate(window.wafaRef(window.wafaDB, wsChatPath(uid, msgId)), {
      hiddenForUser: true, hiddenAt: Date.now()
    });
    wsToast('🗑️ Pesan dihapus');
  }catch(e){ wsToast('❌ Gagal hapus: ' + e.message); }
}

function wsMarkRead(data){
  if(!window.wafaDB || !window.wafaUpdate) return;
  const uid = localStorage.getItem('wafa_uid');
  if(!uid) return;
  Object.entries(data).forEach(([k,v])=>{
    if((v.from === 'admin' || v.from === 'bot') && !v.read){
      window.wafaUpdate(window.wafaRef(window.wafaDB, wsChatPath(uid, k)), { read: true }).catch(()=>{});
    }
  });
}

function wsShowTyping(show){
  const box = document.getElementById('wsChatMessages');
  if(!box) return;
  let el = document.getElementById('wsTypingIndicator');
  if(show){
    if(el) return;
    el = document.createElement('div');
    el.id = 'wsTypingIndicator';
    el.className = 'ws-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    box.appendChild(el); box.scrollTop = box.scrollHeight;
  } else if(el) el.remove();
}

function wsQuickAsk(text){
  const inp = document.getElementById('wsChatTextInput');
  if(inp) inp.value = text;
  wsSendChatMsg();
}

async function wsSendChatMsg(){
  const inp = document.getElementById('wsChatTextInput');
  if(!inp) return;
  const text = inp.value.trim();
  if(!text) return;
  const uid = localStorage.getItem('wafa_uid');
  if(!uid){ wsToast('Login dulu ya'); return; }
  if(!window.wafaDB || !window.wafaSet){ wsToast('Koneksi belum siap'); return; }
  const msgId = Date.now() + '_' + Math.random().toString(36).slice(2,7);
  const msgData = { from: 'user', text: text, time: Date.now(), read: false };
  if(wsReplyTo) msgData.replyTo = wsReplyTo;
  inp.value = ''; wsCancelReply();
  try{
    await window.wafaSet(window.wafaRef(window.wafaDB, wsChatPath(uid, msgId)), msgData);
    wsScrollToBottom(true);
  }catch(e){ wsToast('❌ Gagal kirim'); return; }
}

async function wsUploadChatImage(input){
  const file = input.files && input.files[0];
  input.value = '';
  if(!file) return;
  if(!wsIsLoggedIn()){ wsToast('Login dulu ya'); return; }
  if(file.size > 2*1024*1024){ wsToast('❌ Gambar max 2MB'); return; }
  const uid = localStorage.getItem('wafa_uid');
  if(!window.wafaDB || !window.wafaSet){ wsToast('Koneksi belum siap'); return; }
  const reader = new FileReader();
  reader.onload = async ()=>{
    const msgId = Date.now() + '_' + Math.random().toString(36).slice(2,7);
    const msgData = { from: 'user', text: '', image: reader.result, time: Date.now(), read: false };
    if(wsReplyTo){ msgData.replyTo = wsReplyTo; wsCancelReply(); }
    try{ await window.wafaSet(window.wafaRef(window.wafaDB, wsChatPath(uid, msgId)), msgData); wsToast('📤 Gambar terkirim'); wsScrollToBottom(true); }catch(e){ wsToast('❌ Gagal kirim gambar'); }
  };
  reader.readAsDataURL(file);
}

function wsAddBotMsg(txt){ if(!txt) return; }
function wsToggleBotChat(){ wsOpenCsBot(); }
function wsToggleChatAdmin(){ wsOpenChatAdmin(); }

function wsToggleHeaderMenu(e){
  e.stopPropagation();
  document.querySelectorAll('.ws-header-menu').forEach(m=>m.remove());
  const menu = document.createElement('div');
  menu.className = 'ws-header-menu';
  menu.innerHTML = `
    <button data-action="markread">✅ Tandai sudah dibaca</button>
    <button data-action="clearview">🧹 Bersihkan tampilan</button>
    <button data-action="deleteall" style="color:#ef4444">🗑️ Hapus semua chat saya</button>
  `;
  document.getElementById('wsChatHeader').appendChild(menu);
  menu.querySelectorAll('button').forEach(btn=>{
    btn.onclick = (ev)=>{
      ev.stopPropagation();
      const action = btn.dataset.action;
      menu.remove();
      if(action === 'clearview'){
        if(confirm('Bersihkan tampilan? (pesan tetap tersimpan)')){
          const box = document.getElementById('wsChatMessages');
          if(box) box.innerHTML = '<div id="wsChatEmpty"><div class="big">🧹</div>Tampilan dibersihkan.<br>Refresh buat load ulang.</div>';
          if(wsChatUnsub){ wsChatUnsub(); wsChatUnsub = null; }
          wsToast('🧹 Tampilan dibersihkan');
        }
      } else if(action === 'markread'){
        wsMarkRead(wsCurrentChatData);
        wsToast('✅ Ditandai sudah dibaca');
      } else if(action === 'deleteall'){
        wsConfirmDeleteAllChat();
      }
    };
  });
  setTimeout(()=>{
    const close = (e)=>{ if(!menu.contains(e.target)){ menu.remove(); document.removeEventListener('click', close); } };
    document.addEventListener('click', close);
  }, 50);
}

function wsConfirmDeleteAllChat(){
  const overlay = document.createElement('div');
  overlay.className = 'ws-confirm-overlay';
  overlay.innerHTML = `<div class="ws-confirm-box"><div style="font-size:36px;margin-bottom:8px">🗑️</div><div class="title">Hapus semua chat?</div><div class="desc">Semua chat kamu bakal disembunyiin dari sisi kamu.<br><br><b>Admin masih punya catatan</b> kalau diperlukan.</div><div class="btns"><button class="cancel" id="wsCxlDelAll">Batal</button><button class="danger" id="wsCfmDelAll">Hapus Semua</button></div></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#wsCxlDelAll').onclick = ()=>overlay.remove();
  overlay.querySelector('#wsCfmDelAll').onclick = async ()=>{ overlay.remove(); await wsDeleteAllChat(); };
  overlay.onclick = (e)=>{ if(e.target === overlay) overlay.remove(); };
}
async function wsDeleteAllChat(){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid) return;
  try{
    const updates = {};
    const base = wsChatBase();
    Object.keys(wsCurrentChatData || {}).forEach(msgId=>{
      updates[`${base}/${uid}/${msgId}/hiddenForUser`] = true;
      updates[`${base}/${uid}/${msgId}/hiddenAt`] = Date.now();
    });
    if(Object.keys(updates).length === 0){ wsToast('Nggak ada chat'); return; }
    await window.wafaUpdate(window.wafaRef(window.wafaDB, '/'), updates);
    wsToast('🗑️ Semua chat dihapus');
  }catch(e){ wsToast('❌ Gagal: ' + e.message); }
}

function wsScrollToBottom(smooth){
  const box = document.getElementById('wsChatMessages');
  if(!box) return;
  box.scrollTo({ top: box.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  wsUpdateScrollBtn();
}
function wsUpdateScrollBtn(){
  const box = document.getElementById('wsChatMessages');
  const btn = document.getElementById('wsScrollBottom');
  if(!box || !btn) return;
  const dist = box.scrollHeight - box.scrollTop - box.clientHeight;
  if(dist > 200) btn.classList.add('show'); else btn.classList.remove('show');
}
document.addEventListener('DOMContentLoaded', ()=>{
  const box = document.getElementById('wsChatMessages');
  if(box) box.addEventListener('scroll', wsUpdateScrollBtn);
});

function wsOpenFullImage(src){
  const v = document.getElementById('wsImgViewer');
  const i = document.getElementById('wsImgViewerImg');
  if(!v || !i) return;
  i.src = src;
  v.classList.add('show');
}
function wsCloseFullImage(e){
  if(e && e.target && e.target.tagName === 'IMG') return;
  document.getElementById('wsImgViewer').classList.remove('show');
}

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && wsChatMode === 'fullscreen'){ wsChatClose(); }
});
window.addEventListener('storage', (e)=>{ if(e.key === 'wafa_uid') wsSyncChatFab(); });

// ===== INIT =====
function wsInitAll(){
  wsLoadUser();
  wsLoadBranding();
  wsLoadGames();
  wsLoadTheme();
  wsSyncChatFab();
  wsInitFabBadge();
  wsLoadAdminAvatar();
  wsInitGlobalChatListener();
  const resumeOnce = () => {
    if(wsAudioCtx && wsAudioCtx.state === 'suspended') wsAudioCtx.resume();
    document.removeEventListener('click', resumeOnce);
    document.removeEventListener('touchstart', resumeOnce);
  };
  document.addEventListener('click', resumeOnce);
  document.addEventListener('touchstart', resumeOnce);
  setInterval(wsSyncChatFab, 2000);
}
if(document.readyState === 'complete'){ wsInitAll(); }
else { window.addEventListener('load', wsInitAll); }
