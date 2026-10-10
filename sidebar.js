// SIDEBAR WAFASTORE - AUTO INJECT WITH FIREBASE GAME ICONS + CHAT WIDGET
(function(){
  const sidebarHTML = `
    <div id="wsOverlay" onclick="wsCloseSidebar()"></div>
    <aside id="wsSidebar">
      <div class="ws-logo">
        <img src="./logo.png" alt="logo" id="wsLogoImg">
        <span id="wsBrandName">WafaStoreOnly</span>
      </div>
      <nav class="ws-menu">
        <div class="ws-item" id="wsMenuBeranda" onclick="wsOpen('beranda')">
          🏠 <span>Beranda</span>
        </div>

        <div class="ws-item" id="wsMenuTopup" onclick="wsToggleTopup(event)">
          ⚡ <span>Top Up Game</span> <span class="arrow">▼</span>
        </div>
        <div class="ws-submenu" id="wsSubTopup">
          <a onclick="wsGo('roblox')" data-game-key="roblox">
            <img class="ws-game-icon" data-game-icon="roblox" src="./roblox.png" alt="roblox" style="width:20px;height:20px;object-fit:contain;border-radius:4px">
            <span data-game-name="roblox">Roblox</span>
            <span class="ws-game-status" data-game-status="roblox" style="margin-left:auto;font-size:9px;color:#00ff88">AKTIF</span>
          </a>
          <a onclick="wsGo('mlbb')" data-game-key="mlbb">
            <img class="ws-game-icon" data-game-icon="mlbb" src="./mlbb.png" alt="mlbb" style="width:20px;height:20px;object-fit:contain;border-radius:4px">
            <span data-game-name="mlbb">Mobile Legends</span>
            <span class="ws-game-status" data-game-status="mlbb" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span>
          </a>
          <a onclick="wsGo('pubg')" data-game-key="pubg">
            <img class="ws-game-icon" data-game-icon="pubg" src="./pubg.png" alt="pubg" style="width:20px;height:20px;object-fit:contain;border-radius:4px">
            <span data-game-name="pubg">PUBG Mobile</span>
            <span class="ws-game-status" data-game-status="pubg" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span>
          </a>
          <a onclick="wsGo('ff')" data-game-key="ff">
            <img class="ws-game-icon" data-game-icon="ff" src="./ff.png" alt="ff" style="width:20px;height:20px;object-fit:contain;border-radius:4px">
            <span data-game-name="ff">Free Fire</span>
            <span class="ws-game-status" data-game-status="ff" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span>
          </a>
          <a onclick="wsGo('genshin')" data-game-key="genshin">
            <img class="ws-game-icon" data-game-icon="genshin" src="./genshin.png" alt="genshin" style="width:20px;height:20px;object-fit:contain;border-radius:4px">
            <span data-game-name="genshin">Genshin Impact</span>
            <span class="ws-game-status" data-game-status="genshin" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span>
          </a>
          <a onclick="wsGo('valorant')" data-game-key="valorant">
            <img class="ws-game-icon" data-game-icon="valorant" src="./valorant.png" alt="valorant" style="width:20px;height:20px;object-fit:contain;border-radius:4px">
            <span data-game-name="valorant">Valorant</span>
            <span class="ws-game-status" data-game-status="valorant" style="margin-left:auto;font-size:9px;color:#8d94b8">SOON</span>
          </a>
        </div>

        <div class="ws-item" id="wsMenuPesanan" onclick="wsOpen('pesanan')">
          📦 <span>Pesanan</span>
        </div>

        <div class="ws-item" id="wsMenuDompet" onclick="wsOpen('dompet')">
          👛 <span>Dompet</span>
        </div>

        <div class="ws-item" id="wsMenuProfil" onclick="wsOpen('profil')">
          👤 <span>Profil</span>
        </div>

        <div class="ws-item" id="wsMenuLeaderboard" onclick="wsOpen('leaderboard')">
          🏆 <span>Leaderboard</span>
        </div>

        <div class="ws-item" id="wsMenuChat" onclick="wsOpenChatAdmin()">
          💬 <span>Chat Admin</span>
        </div>

        <div class="ws-item" id="wsMenuAdmin" style="display:none" onclick="wsOpen('admin')">
          🛡️ <span>Admin Panel</span>
        </div>
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
  if(content){
    content.insertAdjacentHTML('afterbegin', headerHTML);
  } else {
    document.body.insertAdjacentHTML('beforeend', `<div id="wsContent">${headerHTML}</div>`);
  }
})();

// ===== HELPERS =====
function wsIsLoggedIn(){
  return !!localStorage.getItem('wafa_uid');
}
function wsRequireLogin(pageName, redirectTarget){
  if(wsIsLoggedIn()) return true;
  if(confirm(`🔒 ${pageName} butuh login dulu.\n\nMau login sekarang?`)){
    sessionStorage.setItem('wafa_redirect_after_login', redirectTarget || 'index');
    window.location.href = 'login.html';
  }
  return false;
}
function wsUserBoxClick(){
  if(wsIsLoggedIn()){
    window.location.href = 'profil.html';
  } else {
    if(confirm('🔒 Login dulu yuk!\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href = 'login.html';
    }
  }
}

// ===== SIDEBAR TOGGLE =====
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
  const item = document.getElementById('wsMenuTopup');
  const sub = document.getElementById('wsSubTopup');
  item.classList.toggle('open');
  sub.classList.toggle('open');
}

// ===== NAVIGASI GAME =====
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

// ===== NAVIGASI MENU =====
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

  if(protectedPages[page]){
    if(!wsRequireLogin(protectedPages[page].name, protectedPages[page].target)) return;
  }

  if(page === 'pesanan'){
    if(typeof openPesanan === 'function') openPesanan();
    else window.location.href = 'index.html#pesanan';
  } else if(page === 'dompet'){
    window.location.href = 'dompet.html';
  } else if(page === 'profil'){
    window.location.href = 'profil.html';
  } else if(page === 'leaderboard'){
    if(typeof openLeaderboard === 'function') openLeaderboard();
    else window.location.href = 'index.html#leaderboard';
  } else if(page === 'admin'){
    window.location.href = 'admin.html';
  }
}

// ===== CHAT ADMIN dari sidebar =====
function wsOpenChatAdmin(){
  wsCloseSidebar();
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Chat butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href = 'login.html';
    }
    return;
  }
  const panel = document.getElementById('wsChatPanel');
  if(!panel){ wsToast('❌ Panel chat belum siap, refresh dulu'); return; }
  if(!panel.classList.contains('open')) wsToggleBotChat();
  else { const inp = document.getElementById('wsChatTextInput'); if(inp) inp.focus(); }
}

function wsSetActive(menu){
  document.querySelectorAll('.ws-item').forEach(i=>i.classList.remove('active'));
  const map = { 'beranda': 'wsMenuBeranda', 'pesanan': 'wsMenuPesanan', 'dompet': 'wsMenuDompet', 'profil': 'wsMenuProfil', 'leaderboard': 'wsMenuLeaderboard', 'chat': 'wsMenuChat', 'admin': 'wsMenuAdmin' };
  const id = map[menu];
  if(id){ const el = document.getElementById(id); if(el) el.classList.add('active'); }
}
function wsSetTitle(txt){
  const el = document.getElementById('wsPageTitle');
  if(el) el.innerText = txt;
}
function wsToast(msg){
  let t = document.querySelector('.ws-toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'ws-toast';
    document.body.appendChild(t);
  }
  t.innerText = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2500);
}

// UID ADMIN
const ADMIN_UIDS = ['5jLY5Gafn7VJvEIarXxDyfMf7v12'];

// ===== LOAD USER INFO =====
async function wsLoadUser(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaGet){
      setTimeout(wsLoadUser, 500);
      return;
    }
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
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){
      setTimeout(wsLoadBranding, 500);
      return;
    }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/branding'), (snap)=>{
      const d = snap.val();
      if(!d) return;
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

// ===== LOAD GAME ICONS =====
function wsLoadGames(){
  try{
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){
      setTimeout(wsLoadGames, 500);
      return;
    }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/games'), (snap)=>{
      const data = snap.val() || {};
      Object.keys(data).forEach(key=>{
        const g = data[key] || {};
        if(g.logo){
          document.querySelectorAll(`[data-game-icon="${key}"]`).forEach(img=>{ img.src = g.logo; });
        }
        if(g.name){
          document.querySelectorAll(`[data-game-name="${key}"]`).forEach(el=>{ el.innerText = g.name; });
        }
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
    if(!window.wafaDB || !window.wafaRef || !window.wafaOnValue){
      setTimeout(wsLoadTheme, 500);
      return;
    }
    window.wafaOnValue(window.wafaRef(window.wafaDB, 'settings/theme'), (snap)=>{
      const d = snap.val();
      if(!d) return;
      if(d.primary){
        document.documentElement.style.setProperty('--primary', d.primary);
        document.documentElement.style.setProperty('--killua-primary', d.primary);
      }
      if(d.accent){
        document.documentElement.style.setProperty('--accent', d.accent);
        document.documentElement.style.setProperty('--killua-accent', d.accent);
      }
    });
  }catch(e){ console.log('wsLoadTheme error:', e); }
}

// ============================================================
// ===== CHAT WIDGET =====
// ============================================================
let wsBotConfig = { enabled: false, aiEnabled: false, systemPrompt: '', faq: [] };
let wsChatUnsub = null;
let wsChatOpened = false;

(function wsInjectChatCSS(){
  if(document.getElementById('wsChatCSS')) return;
  const style = document.createElement('style');
  style.id = 'wsChatCSS';
  style.textContent = `
    #wsChatFab{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#4a90e2,#6b5ce7);border:none;color:#fff;font-size:24px;cursor:pointer;z-index:9000;box-shadow:0 8px 24px rgba(74,144,226,0.45);display:none;align-items:center;justify-content:center;transition:transform 0.2s,box-shadow 0.2s;padding:0}
    #wsChatFab.show{display:flex}
    #wsChatFab:hover{transform:scale(1.08);box-shadow:0 10px 30px rgba(74,144,226,0.6)}
    #wsChatFab .ws-chat-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:10px;min-width:18px;text-align:center;display:none;line-height:1.4}
    #wsChatFab .ws-chat-badge.show{display:block}
    #wsChatPanel{position:fixed;right:20px;bottom:88px;width:360px;max-width:calc(100vw - 40px);height:520px;max-height:calc(100vh - 120px);background:#141414;border:1px solid #2a2a2a;border-radius:16px;display:none;flex-direction:column;overflow:hidden;z-index:9001;box-shadow:0 20px 60px rgba(0,0,0,0.7)}
    #wsChatPanel.open{display:flex}
    #wsChatHeader{padding:12px 14px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;display:flex;align-items:center;gap:10px;flex-shrink:0}
    #wsChatHeader .ws-chat-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#6b5ce7,#4a90e2);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
    #wsChatHeader .ws-chat-headinfo{flex:1;min-width:0}
    #wsChatHeader .ws-chat-title{font-weight:800;font-size:13px;color:#e8e8e8;display:block;line-height:1.2}
    #wsChatHeader .ws-chat-status{font-size:10px;color:#4ade80;display:block;margin-top:2px;font-weight:600}
    #wsChatHeader .ws-chat-status.off{color:#8a8a8a}
    #wsChatHeader .ws-chat-close{background:transparent;border:none;color:#8a8a8a;font-size:18px;cursor:pointer;padding:4px 8px;line-height:1}
    #wsChatHeader .ws-chat-close:hover{color:#e8e8e8}
    #wsChatMessages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;background:#0f0f0f}
    #wsChatMessages::-webkit-scrollbar{width:4px}
    #wsChatMessages::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
    .ws-msg{max-width:82%;padding:9px 13px;border-radius:14px;font-size:12.5px;line-height:1.5;word-wrap:break-word;white-space:pre-wrap;font-family:inherit}
    .ws-msg.user{background:#4a90e2;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
    .ws-msg.bot{background:linear-gradient(135deg,#6b5ce7,#4a90e2);color:#fff;align-self:flex-start;border-bottom-left-radius:4px}
    .ws-msg.admin{background:#1a1a1a;border:1px solid #2a2a2a;color:#e8e8e8;align-self:flex-start;border-bottom-left-radius:4px}
    .ws-msg img{max-width:100%;border-radius:8px;margin-top:6px;display:block}
    .ws-msg .ws-msg-time{font-size:9px;opacity:0.55;margin-top:4px;display:block;text-align:right}
    .ws-typing{display:flex;gap:3px;padding:11px 14px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:14px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content}
    .ws-typing span{width:6px;height:6px;background:#8a8a8a;border-radius:50%;animation:wsDot 1.4s infinite}
    .ws-typing span:nth-child(2){animation-delay:0.2s}
    .ws-typing span:nth-child(3){animation-delay:0.4s}
    @keyframes wsDot{0%,60%,100%{opacity:0.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
    .ws-chat-quick{display:flex;gap:6px;padding:0 10px 8px 10px;flex-wrap:wrap;background:#1a1a1a}
    .ws-chat-quick button{padding:6px 11px;border-radius:16px;border:1px solid #2a2a2a;background:#0f0f0f;color:#a8a8a8;font-size:11px;cursor:pointer;font-family:inherit;transition:0.15s}
    .ws-chat-quick button:hover{border-color:#4a90e2;color:#4a90e2}
    #wsChatInput{display:flex;gap:6px;padding:10px;border-top:1px solid #2a2a2a;background:#1a1a1a;align-items:center;flex-shrink:0}
    #wsChatInput input[type=text]{flex:1;padding:10px 14px;border-radius:20px;border:1px solid #2a2a2a;background:#0f0f0f;color:#e8e8e8;outline:none;font-size:12.5px;font-family:inherit;min-width:0}
    #wsChatInput input[type=text]:focus{border-color:#4a90e2}
    #wsChatInput .ws-attach,#wsChatInput .ws-send{width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;padding:0;font-family:inherit}
    #wsChatInput .ws-attach{background:#2a2a2a;color:#e8e8e8}
    #wsChatInput .ws-attach:hover{background:#3a3a3a}
    #wsChatInput .ws-send{background:#4a90e2;color:#fff}
    #wsChatInput .ws-send:hover{background:#3a7bc8}
    #wsChatEmpty{text-align:center;color:#5a5a5a;font-size:12px;padding:24px 16px;line-height:1.7}
    #wsChatEmpty .big{font-size:40px;margin-bottom:8px;line-height:1}
    @media (max-width:500px){
      #wsChatPanel{right:10px;left:10px;bottom:80px;width:auto;height:calc(100vh - 100px);max-height:calc(100vh - 100px)}
      #wsChatFab{right:14px;bottom:14px;width:52px;height:52px}
    }
  `;
  document.head.appendChild(style);
})();

(function wsInjectChatHTML(){
  if(document.getElementById('wsChatFab')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="wsChatFab" onclick="wsToggleBotChat()" aria-label="Chat">
      💬<span class="ws-chat-badge" id="wsChatBadge">0</span>
    </button>
    <div id="wsChatPanel">
      <div id="wsChatHeader">
        <div class="ws-chat-avatar">💬</div>
        <div class="ws-chat-headinfo">
          <span class="ws-chat-title" id="wsChatTitle">Chat Admin</span>
          <span class="ws-chat-status" id="wsChatStatus">Online • Bales cepet</span>
        </div>
        <button class="ws-chat-close" onclick="wsToggleBotChat()" aria-label="Close">✕</button>
      </div>
      <div id="wsChatMessages">
        <div id="wsChatEmpty">
          <div class="big">💬</div>
          Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.
        </div>
      </div>
      <div class="ws-chat-quick" id="wsChatQuick">
        <button onclick="wsQuickAsk('Cara order gimana?')">Cara order</button>
        <button onclick="wsQuickAsk('Metode pembayaran apa aja?')">Pembayaran</button>
        <button onclick="wsQuickAsk('Berapa lama prosesnya?')">Lama proses</button>
        <button onclick="wsQuickAsk('Minimal top up berapa?')">Min top up</button>
      </div>
      <div id="wsChatInput">
        <input type="file" id="wsChatFileInput" accept="image/*" style="display:none" onchange="wsUploadChatImage(this)">
        <button class="ws-attach" onclick="document.getElementById('wsChatFileInput').click()" title="Kirim gambar">📎</button>
        <input type="text" id="wsChatTextInput" placeholder="Ketik pesan..." onkeypress="if(event.key==='Enter')wsSendChatMsg()">
        <button class="ws-send" onclick="wsSendChatMsg()" title="Kirim">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);
})();

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

function wsToggleBotChat(){
  if(!wsIsLoggedIn()){
    if(confirm('🔒 Chat butuh login dulu.\n\nMau login sekarang?')){
      sessionStorage.setItem('wafa_redirect_after_login', 'index');
      window.location.href = 'login.html';
    }
    return;
  }
  const panel = document.getElementById('wsChatPanel');
  if(!panel) return;
  const willOpen = !panel.classList.contains('open');
  panel.classList.toggle('open');
  wsChatOpened = willOpen;
  if(willOpen){
    wsChatOpenSession();
    setTimeout(()=>{ const inp = document.getElementById('wsChatTextInput'); if(inp) inp.focus(); }, 200);
  } else {
    wsChatCloseSession();
  }
}

function wsChatOpenSession(){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB) return;
  if(wsChatUnsub) wsChatUnsub();
  wsChatUnsub = window.wafaOnValue(window.wafaRef(window.wafaDB, 'chats/' + uid), (snap)=>{
    const data = snap.val() || {};
    wsRenderChatMessages(data);
    wsMarkRead(data);
  });
}

function wsChatCloseSession(){
  if(wsChatUnsub){ wsChatUnsub(); wsChatUnsub = null; }
}

function wsRenderChatMessages(data){
  const box = document.getElementById('wsChatMessages');
  if(!box) return;
  const msgs = Object.entries(data).map(([k,v])=>({...v,_id:k})).sort((a,b)=>(a.time||0)-(b.time||0));
  if(msgs.length === 0){
    box.innerHTML = `<div id="wsChatEmpty"><div class="big">💬</div>Halo kak! Ada yang bisa dibantu?<br>Chat langsung ke Admin ya.</div>`;
    return;
  }
  box.innerHTML = '';
  msgs.forEach(m=>{
    const div = document.createElement('div');
    const from = m.from === 'admin' ? 'admin' : (m.from === 'bot' || m.from === 'system') ? 'bot' : 'user';
    div.className = 'ws-msg ' + from;
    if(m.image){
      div.innerHTML = `<img src="${m.image}" alt="gambar">` + (m.text ? `<div>${wsEscape(m.text)}</div>` : '');
    } else {
      div.textContent = m.text || '';
    }
    if(m.time){
      const t = document.createElement('span');
      t.className = 'ws-msg-time';
      t.textContent = new Date(m.time).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
      div.appendChild(t);
    }
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
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

function wsEscape(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  } else if(el){ el.remove(); }
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
  if(!window.wafaDB || !window.wafaSet){ wsToast('Koneksi belum siap, coba lagi'); return; }
  const msgId = Date.now() + '_' + Math.random().toString(36).slice(2,7);
  const msgData = { from: 'user', text: text, time: Date.now(), read: false };
  inp.value = '';
  try{
    await window.wafaSet(window.wafaRef(window.wafaDB, `chats/${uid}/${msgId}`), msgData);
  }catch(e){ console.error('Gagal kirim chat:', e); wsToast('❌ Gagal kirim, cek koneksi'); return; }
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
      const res = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, systemPrompt: wsBotConfig.systemPrompt })
      });
      if(res.ok){
        const data = await res.json();
        const reply = (data && (data.reply || data.text || data.answer)) || '';
        wsShowTyping(false);
        if(reply){ await wsSaveBotMsg(reply); }
        else { await wsSaveBotMsg('Maaf kak, aku belum ngerti. Coba chat Admin langsung ya 🙏'); }
        return;
      }
    }catch(e){ console.warn('AI fallback error:', e); }
  }
  wsShowTyping(false);
}

async function wsSaveBotMsg(text){
  const uid = localStorage.getItem('wafa_uid');
  if(!uid || !window.wafaDB || !window.wafaSet) return;
  const msgId = 'bot_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);
  try{
    await window.wafaSet(window.wafaRef(window.wafaDB, `chats/${uid}/${msgId}`), {
      from: 'bot', text: text, time: Date.now(), read: true
    });
  }catch(e){ console.error('Gagal simpan pesan bot:', e); }
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
    try{
      await window.wafaSet(window.wafaRef(window.wafaDB, `chats/${uid}/${msgId}`), {
        from: 'user', text: '', image: reader.result, time: Date.now(), read: false
      });
      wsToast('📤 Gambar terkirim');
    }catch(e){ wsToast('❌ Gagal kirim gambar'); }
  };
  reader.readAsDataURL(file);
}

function wsAddBotMsg(txt){
  if(!txt) return;
  const panel = document.getElementById('wsChatPanel');
  if(panel && !panel.classList.contains('open')){
    const badge = document.getElementById('wsChatBadge');
    if(badge){
      const n = parseInt(badge.textContent || '0') + 1;
      badge.textContent = String(n);
      badge.classList.add('show');
    }
  }
  wsSaveBotMsg(String(txt));
}

function wsToggleChatAdmin(){ wsToggleBotChat(); }

window.addEventListener('storage', (e)=>{ if(e.key === 'wafa_uid') wsSyncChatFab(); });

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
