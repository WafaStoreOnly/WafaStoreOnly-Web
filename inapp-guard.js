// INAPP-GUARD.JS — Handle in-app browser (Discord/IG/TT/FB/dll)
(function(){
  const ua = navigator.userAgent || '';

  let source = null;
  let isAndroid = /Android/i.test(ua);
  let isIOS = /iPhone|iPad|iPod/i.test(ua);
  let isMobile = isAndroid || isIOS;
  let isPC = !isMobile;

  if(/Discord/i.test(ua)) source = 'Discord';
  else if(/Instagram/i.test(ua)) source = 'Instagram';
  else if(/FBAN|FBAV|FB_IAB/i.test(ua)) source = 'Facebook';
  else if(/TikTok|BytedanceWebview|musical_ly/i.test(ua)) source = 'TikTok';
  else if(/Twitter/i.test(ua)) source = 'Twitter/X';
  else if(/Line\//i.test(ua)) source = 'LINE';
  else if(/WhatsApp/i.test(ua)) source = 'WhatsApp';
  else if(/Snapchat/i.test(ua)) source = 'Snapchat';
  else if(/Pinterest/i.test(ua)) source = 'Pinterest';

  if(isPC) return;
  if(!source) return;

  console.log('🔍 In-app browser terdeteksi:', source);
  window.WAFA_INAPP = { isInApp: true, source: source, isAndroid, isIOS };

  window.wafaOpenExternalBrowser = function(url){
    url = url || window.location.href;
    if(isAndroid){
      const cleanUrl = url.replace(/^https?:\/\//, '');
      const intent = 'intent://' + cleanUrl + '#Intent;scheme=https;package=com.android.chrome;end';
      try{ window.location.href = intent; return true; }catch(e){ console.warn('Intent gagal:', e); }
    }
    if(isIOS){
      const safariUrl = url.replace(/^https?:\/\//, 'x-safari-https://');
      try{ window.location.href = safariUrl; return true; }catch(e){ console.warn('Safari scheme gagal:', e); }
    }
    return false;
  };

  window.wafaWatchFileInput = function(inputEl){
    if(!inputEl) return;
    let opened = false;
    const onFocus = ()=>{ opened = true; };
    inputEl.addEventListener('focus', onFocus);
    inputEl.addEventListener('click', onFocus);
    inputEl.addEventListener('change', onFocus);
    setTimeout(()=>{ if(!opened) showOpenInBrowserBanner(); }, 1500);
  };

  function showOpenInBrowserBanner(){
    if(document.getElementById('inapp-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'inapp-banner';
    banner.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;background:#1a1a1a;border:1px solid #fbbf24;border-radius:14px;padding:16px;z-index:999999;box-shadow:0 8px 30px rgba(0,0,0,0.6);font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif';
    banner.innerHTML = `
      <div style="display:flex;gap:12px;align-items:flex-start">
        <div style="font-size:28px;flex-shrink:0">⚠️</div>
        <div style="flex:1">
          <div style="font-weight:800;font-size:13px;color:#fbbf24;margin-bottom:4px">File picker diblokir</div>
          <div style="font-size:11px;color:#a8a8a8;line-height:1.6;margin-bottom:10px">
            Buka di <b style="color:#e8e8e8">Chrome/Safari</b> biar upload lancar.
          </div>
          <div style="display:flex;gap:6px">
            <button id="inapp-open-btn" style="flex:1;padding:8px 12px;border-radius:8px;border:none;background:#4a90e2;color:#fff;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit">🌐 Buka di Browser</button>
            <button id="inapp-close-btn" style="padding:8px 12px;border-radius:8px;border:1px solid #2a2a2a;background:transparent;color:#8a8a8a;font-weight:600;font-size:12px;cursor:pointer;font-family:inherit">✕</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    document.getElementById('inapp-open-btn').onclick = ()=>{ window.wafaOpenExternalBrowser(); };
    document.getElementById('inapp-close-btn').onclick = ()=>{ banner.remove(); };
  }

  window.addEventListener('load', ()=>{
    if(source === 'Discord' || source === 'Instagram'){
      const tip = document.createElement('div');
      tip.id = 'inapp-tip';
      tip.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);background:#5865F2;color:#fff;padding:8px 14px;border-radius:20px;font-size:11px;font-weight:700;z-index:99998;box-shadow:0 4px 12px rgba(0,0,0,0.4);font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis';
      tip.innerHTML = `📱 Buka di Chrome biar lancar · <span style="text-decoration:underline;cursor:pointer" id="inapp-tip-open">Buka</span>`;
      document.body.appendChild(tip);
      document.getElementById('inapp-tip-open').onclick = ()=>{ window.wafaOpenExternalBrowser(); };
      setTimeout(()=>{ tip.style.opacity = '0'; tip.style.transition = 'opacity 0.5s'; setTimeout(()=>tip.remove(), 500); }, 8000);
    }
  });
})();
