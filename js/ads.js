window.VMAds = (() => {
  function maybeRenderBanner(){
    const state = VMStorage.read();
    if(state.settings.noAds || state.settings.premium) return;
    if(document.querySelector('.local-ad-banner')) return;
    const target = document.querySelector('.page-content');
    if(!target) return;
    const ad = document.createElement('section');
    ad.className = 'card local-ad-banner';
    ad.innerHTML = `
      <div class="section-heading">
        <div>
          <div class="eyebrow">Ads</div>
          <h2>${VMI18n.t('ads.banner')}</h2>
        </div>
      </div>
      <p class="muted">Zone locale prévue pour AdMob banner.</p>
    `;
    target.appendChild(ad);
  }

  function maybeInterstitial(context = 'generic'){
    const state = VMStorage.read();
    if(state.settings.noAds || state.settings.premium) return false;
    const page = document.documentElement.dataset.page || '';
    if(page === 'shop' || page === 'settings') return false;
    const key = 'vmyself.ads.counter';
    const count = Number(sessionStorage.getItem(key) || 0) + 1;
    sessionStorage.setItem(key, String(count));
    if(count % 4 !== 0) return false;
    VMUI.toast(`${VMI18n.t('ads.interstitial')} · ${context}`);
    return true;
  }

  return { maybeRenderBanner, maybeInterstitial };
})();