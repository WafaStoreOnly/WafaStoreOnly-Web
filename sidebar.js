// SIDEBAR WAFASTORE - CHAT DM-STYLE + FULLSCREEN ADMIN MODE
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
        <div class="ws-item" id="wsMenuChat" onclick="wsOpenChatAdmin()">💬 <span>Chat Admin</span></div>
        <div class="ws-item" id="wsMenuAdmin" style="display:none" onclick="wsOpen('admin')">🛡️ <span>Admin Panel</span></div>
      </nav>
      <div class="ws-userbox">
        <div class="ws-user" onclick="wsUserBoxClick()">
          <span id="wsUserName">Guest</span>
          <small id="wsUserEmail">Login untuk order</small>
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
  else {
    if(confirm('🔒 Login dulu yuk!\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href = 'login.html';
    }
  }
}

// ===== SIDEBAR =====
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

// ===== NAVIGASI =====
function wsGo(page){
  wsCloseSidebar();
  if(!wsRequireLogin('Top Up Game', 'roblox')) return;
  if(page === 'roblox'){
    if(typeof openRoblox === 'function') openRoblox();
    else window.location.href = 'index.html#roblox';
  } else {
    const gameName = document.querySelector(`[data-game-name="${page}"]`);
    const nameText = gameName ? gameName.innerText : page;
    alert(`⚡ Layanan ${nameText} sedang diproses.\n\nTunggu update dari admin ya! 🙏`);
  }
}
function wsOpen(page){
  wsCloseSidebar();
  if(page === 'beranda'){
    if(typeof goHome === 'function') goHome();
    else window.location.href = 'index.html';
    return;
  }
  const protectedPages = {
    'pesanan': { name: 'Pesanan Saya', target: 'pesanan' },
    'dompet':  { name: 'Dompet',       target: 'dompet' },
    'profil':  { name: 'Profil',       target: 'profil' },
    'admin':   { name: 'Admin Panel',  target: 'admin' }
  };
  if(protectedPages[page]){ if(!wsRequireLogin(protectedPages[page].name, protectedPages[page].target)) return; }
  if(page === 'pesanan'){
    if(typeof openPesanan === 'function') openPesanan();
    else window.location.href = 'index.html#pesanan';
  } else if(page === 'dompet'){ window.location.href = 'dompet.html'; }
  else if(page === 'profil'){ window.location.href = 'profil.html'; }
  else if(page === 'leaderboard'){
    if(typeof openLeaderboard === 'function') openLeaderboard();
    else window.location.href = 'index.html#leaderboard';
  } else if(page === 'admin'){ window.location.href = 'admin.html'; }
}

// ===== BUKA CHAT ADMIN (FULLSCREEN) =====
function wsOpenChatAdmin(){
  wsCloseSidebar();
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Chat butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href = 'login.html';
    }
    return;
  }
  wsChatOpen('fullscreen');
}

// ===== SET ACTIVE / TITLE / TOAST =====
function wsSetActive(menu){
  document.querySelectorAll('.ws-item').forEach(i=>i.classList.remove('active'));
  const map = { 'beranda': 'wsMenuBeranda', 'pesanan': 'wsMenuPesanan', 'dompet': 'wsMenuDompet', 'profil': 'wsMenuProfil', 'leaderboard': 'wsMenuLeaderboard', 'chat': 'wsMenuChat', 'admin': 'wsMenuAdmin' };
  const id = map[menu];
  if(id){ const el = document.getElementById(id); if(el) el.classList.add('active'); }
}
function wsSetTitle(txt){ const el = document.getElementById('wsPageTitle'); if(el) el.innerText = txt; }
function wsToast(msg){
  let t = document.querySelector('.ws-toast');
  if(!t){ t = document.createElement('div'); t.className = 'ws-toast'; document.body.appendChild(t); }
  t.innerText = msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2500);
}

const ADMIN_UIDS = ['5jLY5Gafn7VJvEIarXxDyfMf7v12'];

// ===== LOAD USER =====
async function wsLoadUser(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaGet){ setTimeout(wsLoadUser, 500); return; }
    const uid = localStorage.getItem('wafa_uid');
    if(!uid){
      const el1 = document.getElementById('wsUserName');
      const el2 = document.getElementById('wsUserEmail');
      const el3 = document.getElementById('wsHeaderUser');
      if(el1) el1.innerText = 'Guest';
      if(el2) el2.innerText = 'Login untuk order';
      if(el3) el3.innerText = '👤 Guest';
      return;
    }
    const snap = await window.wafaGet(window.wafaRef(window.wafaDB, 'users/' + uid));
    const data = snap.val();
    if(data){
      const name = data.nickname || data.name || data.email || 'User';
      const email = data.email || '-';
      const el1 = document.getElementById('wsUserName');
      const el2 = document.getElementById('wsUserEmail');
      const el3 = document.getElementById('wsHeaderUser');
      if(el1) el1.innerText = name.slice(0,18);
      if(el2) el2.innerText = email.length > 20 ? email.slice(0,18)+'...' : email;
      if(el3) el3.innerText = '👤 ' + name.slice(0,12);
    }
    if(ADMIN_UIDS.includes(uid)){
      const adminMenu = document.getElementById('wsMenuAdmin');
      if(adminMenu) adminMenu.style.display = 'flex';
    }
    try{ localStorage.setItem('wafa_user', JSON.stringify({nickname:data.nickname||'',email:data.email||'',saldo:data.saldo||0})); }catch(e){}
  }catch(e){ console.log('wsLoadUser error:', e); }
}

// ===== LOAD BRANDING =====
function wsLoadBranding(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadBranding, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/branding'), (snap)=>{
      const d = snap.val(); if(!d) return;
      if(d.logo){
        const logoImg = document.getElementById('wsLogoImg');
        if(logoImg) logoImg.src = d.logo;
        const fav = document.querySelector('link[rel="icon"]') || document.createElement('link');
        fav.rel = 'icon'; fav.href = d.logo;
        document.head.appendChild(fav);
      }
      if(d.brandName){
        const brandEl = document.getElementById('wsBrandName');
        if(brandEl) brandEl.innerText = d.brandName;
        const titleEl = document.getElementById('wsPageTitle');
        if(titleEl) titleEl.innerText = d.brandName + ' ⚡';
      }
    });
  }catch(e){ console.log('wsLoadBranding error:', e); }
}

// ===== LOAD GAMES =====
function wsLoadGames(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadGames, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/games'), (snap)=>{
      const data = snap.val() || {};
      Object.keys(data).forEach(key=>{
        const g = data[key] || {};
        if(g.logo) document.querySelectorAll(`[data-game-icon="${key}"]`).forEach(img=>{ img.src = g.logo; });
        if(g.name) document.querySelectorAll(`[data-game-name="${key}"]`).forEach(el=>{ el.innerText = g.name; });
        const statusEl = document.querySelector(`[data-game-status="${key}"]`);
        if(statusEl){
          const isActive = g.active === true;
          if(isActive){ statusEl.innerText = 'AKTIF'; statusEl.style.color = '#00ff88'; }
          else { statusEl.innerText = 'SOON'; statusEl.style.color = '#8d94b8'; }
        }
      });
    });
  }catch(e){ console.log('wsLoadGames error:', e); }
}

// ===== LOAD THEME =====
function wsLoadTheme(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadTheme, 500); return; }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/theme'), (snap)=>{
      const d = snap.val(); if(!d) return;
      if(d.primary){ document.documentElement.style.setProperty('--primary', d.primary); document.documentElement.style.setProperty('--killua-primary', d.primary); }
      if(d.accent){ document.documentElement.style.setProperty('--accent', d.accent); document.documentElement.style.setProperty('--killua-accent', d.accent); }
    });
  }catch(e){ console.log('wsLoadTheme error:', e); }
}

// ============================================================
// ===== CHAT WIDGET DM-STYLE (2 MODE: BOT FLOATING / ADMIN FULLSCREEN) =====
// ============================================================
let wsBotConfig = { enabled: false, aiEnabled: false, systemPrompt: '', faq: [] };
let wsChatUnsub = null;
let wsChatMode = null; // 'floating' | 'fullscreen'
let wsReplyTo = null;
let wsCurrentChatData = {};

// --- CSS ---
(function wsInjectChatCSS(){
  if(document.getElementById('wsChatCSS')) return;
  const style = document.createElement('style');
  style.id = 'wsChatCSS';
  style.textContent = `
    #wsChatFab{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#4a90e2,#6b5ce7);border:none;color:#fff;font-size:24px;cursor:pointer;z-index:9000;box-shadow:0 8px 24px rgba(74,144,226,0.45);display:none;align-items:center;justify-content:center;transition:transform 0.2s;padding:0}
    #wsChatFab.show{display:flex}
    #wsChatFab:hover{transform:scale(1.08)}
    #wsChatFab .ws-chat-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:10px;min-width:18px;text-align:center;display:none;line-height:1.4}
    #wsChatFab .ws-chat-badge.show{display:block}

    /* BASE PANEL */
    #wsChatPanel{background:#0a0a0a;display:none;flex-direction:column;overflow:hidden;z-index:9001;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif}
    #wsChatPanel.open{display:flex}

    /* FLOATING MODE (bot) */
    #wsChatPanel.floating{position:fixed;right:20px;bottom:88px;width:380px;max-width:calc(100vw - 24px);height:600px;max-height:calc(100vh - 110px);border:1px solid #2a2a2a;border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,0.8)}

    /* FULLSCREEN MODE (admin) */
    #wsChatPanel.fullscreen{position:fixed;inset:0;width:100vw;height:100vh;max-width:100vw;max-height:100vh;border:none;border-radius:0;box-shadow:none;z-index:99999}

    /* HEADER */
    #wsChatHeader{padding:10px 12px;background:#141414;border-bottom:1px solid #1f1f1f;display:flex;align-items:center;gap:10px;flex-shrink:0;position:relative}
    #wsChatHeader .ws-chat-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#6b5ce7,#4a90e2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;position:relative}
    #wsChatHeader .ws-chat-avatar::after{content:'';position:absolute;bottom:1px;right:1px;width:10px;height:10px;background:#4ade80;border:2px solid #141414;border-radius:50%}
    #wsChatHeader .ws-chat-headinfo{flex:1;min-width:0}
    #wsChatHeader .ws-chat-title{font-weight:800;font-size:14px;color:#e8e8e8;display:block;line-height:1.2}
    #wsChatHeader .ws-chat-status{font-size:11px;color:#4ade80;display:block;margin-top:2px;font-weight:600}
    #wsChatHeader .ws-chat-status.off{color:#8a8a8a}
    #wsChatHeader .ws-chat-btn{background:transparent;border:none;color:#8a8a8a;font-size:18px;cursor:pointer;padding:6px 8px;line-height:1;border-radius:8px;font-family:inherit}
    #wsChatHeader .ws-chat-btn:hover{background:#1f1f1f;color:#e8e8e8}

    /* MESSAGES */
    #wsChatMessages{flex:1;overflow-y:auto;padding:14px 12px 6px 12px;display:flex;flex-direction:column;gap:2px;background:#0a0a0a;position:relative;scroll-behavior:smooth}
    #wsChatMessages::-webkit-scrollbar{width:5px}
    #wsChatMessages::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
    #wsChatPanel.fullscreen #wsChatMessages{padding:20px max(20px, calc((100vw - 900px)/2)) 20px max(20px, calc((100vw - 900px)/2))}

    .ws-date-sep{text-align:center;margin:12px 0 6px 0}
    .ws-date-sep span{display:inline-block;background:#1a1a1a;color:#8a8a8a;font-size:10px;font-weight:700;padding:4px 12px;border-radius:12px;letter-spacing:0.3px;text-transform:uppercase}

    .ws-msg-row{display:flex;gap:6px;align-items:flex-end;max-width:100%;padding:1px 0}
    .ws-msg-row.mine{justify-content:flex-end}
    .ws-msg-row.theirs{justify-content:flex-start}
    .ws-msg-row.grouped-top{margin-top:6px}
    .ws-msg-avatar{width:26px;height:26px;border-radius:50%;background:#2a2a2a;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;align-self:flex-end;margin-bottom:2px}
    .ws-msg-avatar.hidden{visibility:hidden}

    .ws-bubble{max-width:78%;padding:7px 11px 6px 11px;border-radius:16px;font-size:13px;line-height:1.4;word-wrap:break-word;white-space:pre-wrap;position:relative;box-shadow:0 1px 1px rgba(0,0,0,0.15);cursor:default}
    .ws-bubble:hover{filter:brightness(1.05)}
    .ws-bubble.mine{background:#4a90e2;color:#fff;border-bottom-right-radius:4px}
    .ws-bubble.theirs{background:#1f1f1f;color:#e8e8e8;border-bottom-left-radius:4px}
    .ws-bubble.bot{background:linear-gradient(135deg,#6b5ce7,#4a90e2);color:#fff;border-bottom-left-radius:4px}
    .ws-bubble img{max-width:100%;max-height:280px;border-radius:10px;margin:-2px 0 4px 0;display:block;cursor:pointer}

    .ws-reply-preview{background:rgba(0,0,0,0.25);border-left:3px solid rgba(255,255,255,0.6);border-radius:6px;padding:5px 8px;margin-bottom:5px;font-size:11px;line-height:1.3;overflow:hidden}
    .ws-bubble.theirs .ws-reply-preview{background:rgba(255,255,255,0.05);border-left-color:#4a90e2}
    .ws-reply-preview .ws-reply-name{font-weight:800;opacity:0.9;margin-bottom:1px}
    .ws-reply-preview .ws-reply-text{opacity:0.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}

    .ws-bubble-footer{display:flex;align-items:center;justify-content:flex-end;gap:4px;margin-top:2px;font-size:10px;opacity:0.7}
    .ws-bubble.mine .ws-bubble-footer{color:rgba(255,255,255,0.85)}
    .ws-bubble.theirs .ws-bubble-footer{color:#8a8a8a}
    .ws-read-tick{font-size:11px;letter-spacing:-2px;font-weight:700}
    .ws-read-tick.read{color:#6ee7f9}

    .ws-typing{display:flex;gap:3px;padding:11px 14px;background:#1f1f1f;border-radius:16px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content;margin-left:32px}
    .ws-typing span{width:6px;height:6px;background:#8a8a8a;border-radius:50%;animation:wsDot 1.4s infinite}
    .ws-typing span:nth-child(2){animation-delay:0.2s}
    .ws-typing span:nth-child(3){animation-delay:0.4s}
    @keyframes wsDot{0%,60%,100%{opacity:0.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}

    .ws-chat-quick{display:flex;gap:6px;padding:6px 10px 8px 10px;flex-wrap:wrap;background:#141414;border-top:1px solid #1f1f1f}
    .ws-chat-quick button{padding:6px 11px;border-radius:16px;border:1px solid #2a2a2a;background:#0a0a0a;color:#a8a8a8;font-size:11px;cursor:pointer;font-family:inherit;transition:0.15s}
    .ws-chat-quick button:hover{border-color:#4a90e2;color:#4a90e2}

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
    #wsChatInput .ws-icon-btn.attach:hover{background:#3a3a3a}
    #wsChatInput .ws-icon-btn.send{background:#4a90e2;color:#fff}
    #wsChatInput .ws-icon-btn.send:hover{background:#3a7bc8}

    #wsChatEmpty{text-align:center;color:#5a5a5a;font-size:12px;padding:32px 20px;line-height:1.7;margin:auto}
    #wsChatEmpty .big{font-size:48px;margin-bottom:12px;line-height:1;opacity:0.5}

    .ws-msg-menu{position:fixed;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:6px;z-index:999999;box-shadow:0 12px 40px rgba(0,0,0,0.7);min-width:170px;animation:wsMenuPop 0.15s ease}
    @keyframes wsMenuPop{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
    .ws-msg-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;background:transparent;border:none;color:#e8e8e8;font-size:13px;cursor:pointer;text-align:left;border-radius:8px;font-family:inherit}
    .ws-msg-menu button:hover{background:#2a2a2a}
    .ws-msg-menu button.danger{color:#ef4444}
    .ws-msg-menu button.danger:hover{background:rgba(239,68,68,0.12)}

    .ws-header-menu{position:absolute;top:52px;right:12px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:6px;z-index:9002;box-shadow:0 12px 40px rgba(0,0,0,0.7);min-width:200px;animation:wsMenuPop 0.15s ease}
    .ws-header-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;background:transparent;border:none;color:#e8e8e8;font-size:13px;cursor:pointer;text-align:left;border-radius:8px;font-family:inherit}
    .ws-header-menu button:hover{background:#2a2a2a}

    #wsScrollBottom{position:absolute;right:14px;bottom:120px;width:36px;height:36px;border-radius:50%;background:#1f1f1f;border:1px solid #2a2a2a;color:#e8e8e8;font-size:16px;cursor:pointer;display:none;align-items:center;justify-content:center;z-index:9002;box-shadow:0 4px 12px rgba(0,0,0,0.5);padding:0}
    #wsScrollBottom.show{display:flex}
    #wsScrollBottom:hover{background:#2a2a2a}

    #wsImgViewer{position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9999999;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(10px)}
    #wsImgViewer.show{display:flex}
    #wsImgViewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px}
    #wsImgViewer .ws-img-close{position:absolute;top:16px;right:16px;width:40px;height:40px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:50%;color:#e8e8e8;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}

    .ws-confirm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999998;display:flex;align-items:center;justify-content:center;padding:20px}
    .ws-confirm-box{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:18px;padding:22px;max-width:320px;width:100%;text-align:center}
    .ws-confirm-box .title{font-size:15px;font-weight:800;color:#e8e8e8;margin-bottom:8px}
    .ws-confirm-box .desc{font-size:12px;color:#8a8a8a;line-height:1.6;margin-bottom:18px}
    .ws-confirm-box .btns{display:flex;gap:8px}
    .ws-confirm-box button{flex:1;padding:12px;border-radius:10px;border:none;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}
    .ws-confirm-box button.cancel{background:#2a2a2a;color:#e8e8e8}
    .ws-confirm-box button.danger{background:#ef4444;color:#fff}

    @media (max-width:500px){
      #wsChatPanel.floating{right:8px;left:8px;bottom:74px;width:auto;height:calc(100vh - 90px);max-height:calc(100vh - 90px);border-radius:16px}
      #wsChatFab{right:14px;bottom:14px;width:52px;height:52px}
    }
  `;
  document.head.appendChild(style);
})();

// --- HTML ---
(function wsInjectChatHTML(){
  if(document.getElementById('wsChatFab')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="wsChatFab" onclick="wsChatOpen('floating')" aria-label="Chat">
      💬<span class="ws-chat-badge" id="wsChatBadge">0</span>
    </button>
    <div id="wsChatPanel">
      <div id="wsChatHeader">
        <button class="ws-chat-btn" id="wsChatBackBtn" style="display:none" onclick="wsChatClose()" aria-label="Back">←</button>
        <div class="ws-chat-avatar">💬</div>
        <div class="ws-chat-headinfo">
          <span class="ws-chat-title" id="wsChatTitle">Chat Admin</span>
          <span class="ws-chat-status" id="wsChatStatus">Online • Bales cepet</span>
        </div>
        <button class="ws-chat-btn" onclick="wsToggleHeaderMenu(event)" aria-label="Menu">⋮</button>
        <button class="ws-chat-btn" onclick="wsChatClose()" aria-label="Close">✕</button>
      </div>
      <div id="wsChatMessages">
        <div id="wsChatEmpty">
          <div class="big">💬</div>
          Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.
        </div>
      </div>
      <button id="wsScrollBottom" onclick="wsScrollToBottom()" aria-label="Scroll ke bawah">▼</button>
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
        <button class="ws-icon-btn attach" onclick="document.getElementById('wsChatFileInput').click()" title="Kirim gambar">📎</button>
        <input type="text" id="wsChatTextInput" placeholder="Ketik pesan..." onkeypress="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();wsSendChatMsg()}">
        <button class="ws-icon-btn send" onclick="wsSendChatMsg()" title="Kirim">➤</button>
      </div>
    </div>
    <div id="wsImgViewer" onclick="wsCloseFullImage(event)">
      <button class="ws-img-close" onclick="wsCloseFullImage(event)">✕</button>
      <img id="wsImgViewerImg" src="" alt="Gambar">
    </div>
  `;
  document.body.appendChild(wrap);
})();

// --- Load bot config ---
function wsLoadBotConfig(){
  if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){ setTimeout(wsLoadBotConfig, 500); return; }
  window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/bot_ai'), (snap)=>{
    const d = snap.val() || {};
    wsBotConfig = {
      enabled: d.enabled === true,
      aiEnabled: d.aiEnabled === true,
      systemPrompt: d.systemPrompt || '',
      faq: Array.isArray(d.faq) ? d.faq : []
    };
    const statusEl = document.getElementById('wsChatStatus');
    if(statusEl){
      if(wsBotConfig.enabled){ statusEl.innerText = 'Bot Aktif • Siap bantu 24/7'; statusEl.classList.remove('off'); }
      else { statusEl.innerText = 'Online • Bales manual'; statusEl.classList.remove('off'); }
    }
  });
}

function wsSyncChatFab(){
  const fab = document.getElementById('wsChatFab');
  if(!fab) return;
  if(wsIsLoggedIn()) fab.classList.add('show');
  else fab.classList.remove('show');
}

// --- OPEN (mode: 'floating' | 'fullscreen') ---
function wsChatOpen(mode){
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Chat butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href = 'login.html';
    }
    return;
  }
  const panel = document.getElementById('wsChatPanel');
  const backBtn = document.getElementById('wsChatBackBtn');
  if(!panel) return;

  // Set mode class
  panel.classList.remove('floating', 'fullscreen');
  panel.classList.add(mode);
  panel.classList.add('open');
  wsChatMode = mode;

  // Back button: show in fullscreen on mobile
  if(backBtn) backBtn.style.display = (mode === 'fullscreen') ? 'block' : 'none';

  // Hide quick replies in floating for cleanliness? Keep them.
  wsChatOpenSession();
  setTimeout(()=>{
    const inp = document.getElementById('wsChatTextInput');
    if(inp) inp.focus();
    wsScrollToBottom(true);
  }, 250);
}

// --- CLOSE ---
function wsChatClose(){
  const panel = document.getElementById('wsChatPanel');
  if(!panel) return;
  panel.classList.remove('open', 'floating', 'fullscreen');
  wsChatMode = null;
  wsChatCloseSession();
}

// Alias agar kompatibel dengan file lain
function wsToggleBotChat(){ wsChatOpen('floating'); }

function wsChatOpenSession(){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB) return;
  if(wsChatUnsub) wsChatUnsub();
  wsChatUnsub = window.wafaOnValue(window.wafaRef(window.wafaDB, 'chats/' + uid), (snap)=>{
    const data = snap.val() || {};
    wsCurrentChatData = data;
    wsRenderChatMessages(data);
    wsMarkRead(data);
  });
}
function wsChatCloseSession(){
  if(wsChatUnsub){ wsChatUnsub(); wsChatUnsub = null; }
}

// --- Format ---
function wsFormatDate(ts){
  if(!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((today - msgDay) / (1000*60*60*24));
  if(diff === 0) return 'Hari ini';
  if(diff === 1) return 'Kemarin';
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
function wsFormatTime(ts){ if(!ts) return ''; return new Date(ts).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}); }
function wsGroupByDate(msgs){
  const groups = []; let cur = null;
  msgs.forEach(m=>{
    const day = m.time ? new Date(m.time).toDateString() : 'unknown';
    if(day !== cur){ groups.push({type:'date', date: m.time}); cur = day; }
    groups.push({type:'msg', data: m});
  });
  return groups;
}

function wsRenderChatMessages(data){
  const box = document.getElementById('wsChatMessages');
  if(!box) return;
  const msgs = Object.entries(data).map(([k,v])=>({...v,_id:k})).sort((a,b)=>(a.time||0)-(b.time||0));
  if(msgs.length === 0){
    box.innerHTML = `<div id="wsChatEmpty"><div class="big">💬</div>Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.</div>`;
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
    const from = m.from === 'admin' ? 'theirs' : (m.from === 'bot' || m.from === 'system') ? 'bot' : 'mine';
    const isMine = from === 'mine';
    const isBot = from === 'bot';
    const grouped = (prevFrom === from) && (m.time - prevTime < 120000);
    prevFrom = from; prevTime = m.time;

    const row = document.createElement('div');
    row.className = 'ws-msg-row ' + (isMine ? 'mine' : 'theirs');
    if(!grouped) row.classList.add('grouped-top');

    if(!isMine){
      const av = document.createElement('div');
      av.className = 'ws-msg-avatar' + (grouped ? ' hidden' : '');
      av.textContent = isBot ? '🤖' : '👨‍💼';
      row.appendChild(av);
    }

    const bubble = document.createElement('div');
    bubble.className = 'ws-bubble ' + from;
    bubble.dataset.id = m._id;

    if(m.replyTo){
      const rp = document.createElement('div');
      rp.className = 'ws-reply-preview';
      const replyName = m.replyTo.from === 'user' ? 'Kamu' : (m.replyTo.from === 'admin' ? 'Admin' : 'Bot');
      rp.innerHTML = `<div class="ws-reply-name">↩ ${wsEscape(replyName)}</div><div class="ws-reply-text">${wsEscape(m.replyTo.text || '[Gambar]')}</div>`;
      bubble.appendChild(rp);
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
    const tickHtml = isMine ? `<span class="ws-read-tick${m.read ? ' read' : ''}">${m.read ? '✓✓' : '✓'}</span>` : '';
    footer.innerHTML = `<span>${wsFormatTime(m.time)}</span>${tickHtml}`;
    bubble.appendChild(footer);

    wsAttachMsgActions(bubble, m);
    row.appendChild(bubble);
    box.appendChild(row);
  });

  if(wasNearBottom) wsScrollToBottom(true);
  wsUpdateScrollBtn();
}

function wsEscape(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function wsAttachMsgActions(bubble, msg){
  let pressTimer = null, longPressed = false;
  const startPress = ()=>{ longPressed = false; pressTimer = setTimeout(()=>{ longPressed = true; wsShowMsgMenu(bubble, msg); }, 500); };
  const cancelPress = ()=>{ if(pressTimer){ clearTimeout(pressTimer); pressTimer = null; } };
  bubble.addEventListener('touchstart', startPress, {passive:true});
  bubble.addEventListener('touchend', (e)=>{ cancelPress(); if(longPressed) e.preventDefault(); });
  bubble.addEventListener('touchmove', cancelPress, {passive:true});
  bubble.addEventListener('touchcancel', cancelPress);
  bubble.addEventListener('contextmenu', (e)=>{ e.preventDefault(); wsShowMsgMenu(bubble, msg); });
}

function wsShowMsgMenu(bubbleEl, msg){
  document.querySelectorAll('.ws-msg-menu').forEach(m=>m.remove());
  const isMine = msg.from === 'user';
  const menu = document.createElement('div');
  menu.className = 'ws-msg-menu';
  let buttons = '';
  if(msg.text) buttons += `<button data-action="copy">📋 Copy</button>`;
  buttons += `<button data-action="reply">↩️ Reply</button>`;
  if(isMine) buttons += `<button data-action="delete" class="danger">🗑️ Hapus</button>`;
  menu.innerHTML = buttons;
  document.body.appendChild(menu);

  const rect = bubbleEl.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  let left = rect.left;
  let top = rect.top - menuRect.height - 8;
  if(top < 10) top = rect.bottom + 8;
  if(left + menuRect.width > window.innerWidth - 10) left = window.innerWidth - menuRect.width - 10;
  if(left < 10) left = 10;
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';

  menu.querySelectorAll('button').forEach(btn=>{
    btn.onclick = (e)=>{
      e.stopPropagation();
      const action = btn.dataset.action;
      menu.remove();
      if(action === 'copy') wsCopyMsg(msg.text);
      else if(action === 'reply') wsSetReply(msg);
      else if(action === 'delete') wsConfirmDelete(msg._id);
    };
  });

  setTimeout(()=>{
    const close = (e)=>{ if(!menu.contains(e.target)){ menu.remove(); document.removeEventListener('click', close); document.removeEventListener('touchstart', close); } };
    document.addEventListener('click', close);
    document.addEventListener('touchstart', close);
  }, 50);
}

function wsCopyMsg(text){
  if(!text) return;
  navigator.clipboard.writeText(text).then(()=>wsToast('📋 Pesan disalin')).catch(()=>wsToast('❌ Gagal menyalin'));
}

function wsSetReply(msg){
  wsReplyTo = { msgId: msg._id, text: msg.text || '[Gambar]', from: msg.from };
  const bar = document.getElementById('wsReplyBar');
  const nameEl = document.getElementById('wsReplyBarName');
  const textEl = document.getElementById('wsReplyBarText');
  const fromName = msg.from === 'user' ? 'Kamu' : (msg.from === 'admin' ? 'Admin' : 'Bot');
  nameEl.innerText = '↩ Membalas ' + fromName;
  textEl.innerText = msg.text || '[Gambar]';
  bar.classList.add('show');
  const inp = document.getElementById('wsChatTextInput');
  if(inp) inp.focus();
}
function wsCancelReply(){
  wsReplyTo = null;
  document.getElementById('wsReplyBar').classList.remove('show');
}

function wsConfirmDelete(msgId){
  const overlay = document.createElement('div');
  overlay.className = 'ws-confirm-overlay';
  overlay.innerHTML = `<div class="ws-confirm-box">
    <div class="title">Hapus pesan?</div>
    <div class="desc">Pesan bakal dihapus. Tindakan ini nggak bisa dibatalkan.</div>
    <div class="btns">
      <button class="cancel" id="wsCancelDel">Batal</button>
      <button class="danger" id="wsConfirmDel">Hapus</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#wsCancelDel').onclick = ()=>overlay.remove();
  overlay.querySelector('#wsConfirmDel').onclick = async ()=>{ overlay.remove(); await wsDeleteMsg(msgId); };
  overlay.onclick = (e)=>{ if(e.target === overlay) overlay.remove(); };
}

async function wsDeleteMsg(msgId){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid){ wsToast('Login dulu ya'); return; }
  try{
    const url = `https://wafastoreonly-default-rtdb.asia-southeast1.firebasedatabase.app/chats/${uid}/${msgId}.json`;
    const res = await fetch(url, { method: 'DELETE' });
    if(res.ok) wsToast('🗑️ Pesan dihapus');
    else wsToast('❌ Gagal hapus');
  }catch(e){ wsToast('❌ Gagal hapus: ' + e.message); }
}

function wsMarkRead(data){
  if(!window.wafaDB || !window.wafaUpdate) return;
  const uid = localStorage.getItem('wafa_uid');
  if(!uid) return;
  Object.entries(data).forEach(([k,v])=>{
    if(v.from === 'admin' && !v.read){
      window.wafaUpdate(window.wafaRef(window.wafaDB, `chats/${uid}/${k}`), { read: true }).catch(()=>{});
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
    await window.wafaSet(window.wafaRef(window.wafaDB, `chats/${uid}/${msgId}`), msgData);
    wsScrollToBottom(true);
  }catch(e){ wsToast('❌ Gagal kirim'); return; }
  wsHandleBotReply(text);
}

async function wsHandleBotReply(userText){
  if(!wsBotConfig.enabled) return;
  const lower = userText.toLowerCase();
  const matched = (wsBotConfig.faq || []).find(f=>{
    if(!f || !f.keywords) return false;
    const kws = f.keywords.split(',').map(k=>k.trim().toLowerCase()).filter(Boolean);
    return kws.some(k => k && lower.includes(k));
  });
  wsShowTyping(true);
  await wsSleep(400 + Math.random()*400);
  if(matched && matched.answer){ wsShowTyping(false); await wsSaveBotMsg(matched.answer); return; }
  if(wsBotConfig.aiEnabled){
    try{
      const res = await fetch('/api/bot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userText, systemPrompt: wsBotConfig.systemPrompt }) });
      if(res.ok){
        const data = await res.json();
        const reply = (data && (data.reply || data.text || data.answer)) || '';
        wsShowTyping(false);
        if(reply) await wsSaveBotMsg(reply);
        else await wsSaveBotMsg('Maaf kak, aku belum ngerti. Coba chat Admin langsung ya 🙏');
        return;
      }
    }catch(e){}
  }
  wsShowTyping(false);
}

async function wsSaveBotMsg(text){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB || !window.wafaSet) return;
  const msgId = 'bot_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);
  try{
    await window.wafaSet(window.wafaRef(window.wafaDB, `chats/${uid}/${msgId}`), { from: 'bot', text: text, time: Date.now(), read: true });
  }catch(e){}
}
function wsSleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function wsUploadChatImage(input){
  const file = input.files && input.files[0];
  input.value = '';
  if(!file) return;
  if(!wsIsLoggedIn()){ wsToast('Login dulu ya'); return; }
  if(file.size > 2 * 1024 * 1024){ wsToast('❌ Gambar max 2MB'); return; }
  const uid = localStorage.getItem('wafa_uid');
  if(!window.wafaDB || !window.wafaSet){ wsToast('Koneksi belum siap'); return; }
  const reader = new FileReader();
  reader.onload = async ()=>{
    const msgId = Date.now() + '_' + Math.random().toString(36).slice(2,7);
    const msgData = { from: 'user', text: '', image: reader.result, time: Date.now(), read: false };
    if(wsReplyTo){ msgData.replyTo = wsReplyTo; wsCancelReply(); }
    try{ await window.wafaSet(window.wafaRef(window.wafaDB, `chats/${uid}/${msgId}`), msgData); wsToast('📤 Gambar terkirim'); wsScrollToBottom(true); }
    catch(e){ wsToast('❌ Gagal kirim gambar'); }
  };
  reader.readAsDataURL(file);
}

function wsAddBotMsg(txt){
  if(!txt) return;
  const panel = document.getElementById('wsChatPanel');
  if(panel && !panel.classList.contains('open')){
    const badge = document.getElementById('wsChatBadge');
    if(badge){ const n = parseInt(badge.textContent || '0') + 1; badge.textContent = String(n); badge.classList.add('show'); }
  }
  wsSaveBotMsg(String(txt));
}

function wsToggleChatAdmin(){ wsChatOpen('fullscreen'); }

// --- HEADER MENU ---
function wsToggleHeaderMenu(e){
  e.stopPropagation();
  document.querySelectorAll('.ws-header-menu').forEach(m=>m.remove());
  const menu = document.createElement('div');
  menu.className = 'ws-header-menu';
  menu.innerHTML = `
    <button data-action="markread">✅ Tandai sudah dibaca</button>
    <button data-action="clearview">🧹 Bersihkan tampilan</button>
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
      }
    };
  });
  setTimeout(()=>{
    const close = (ev)=>{ if(!menu.contains(ev.target)){ menu.remove(); document.removeEventListener('click', close); } };
    document.addEventListener('click', close);
  }, 50);
}

// --- SCROLL ---
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
  if(dist > 200) btn.classList.add('show');
  else btn.classList.remove('show');
}
document.addEventListener('DOMContentLoaded', ()=>{
  const box = document.getElementById('wsChatMessages');
  if(box) box.addEventListener('scroll', wsUpdateScrollBtn);
});

// --- FULL IMAGE ---
function wsOpenFullImage(src){
  const viewer = document.getElementById('wsImgViewer');
  const img = document.getElementById('wsImgViewerImg');
  if(!viewer || !img) return;
  img.src = src;
  viewer.classList.add('show');
}
function wsCloseFullImage(e){
  if(e && e.target && e.target.tagName === 'IMG') return;
  const viewer = document.getElementById('wsImgViewer');
  if(viewer) viewer.classList.remove('show');
}

// --- ESC to close fullscreen chat ---
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && wsChatMode === 'fullscreen'){ wsChatClose(); }
});

// --- SYNC FAB ---
window.addEventListener('storage', (e)=>{ if(e.key === 'wafa_uid') wsSyncChatFab(); });

// --- INIT ---
function wsInitAll(){
  wsLoadUser();
  wsLoadBranding();
  wsLoadGames();
  wsLoadTheme();
  wsLoadBotConfig();
  wsSyncChatFab();
  setInterval(wsSyncChatFab, 2000);
}
if(document.readyState === 'complete'){ wsInitAll(); }
else { window.addEventListener('load', wsInitAll); }
