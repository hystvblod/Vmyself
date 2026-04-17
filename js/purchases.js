window.VMPurchases = (() => {
  function enablePremium(){
    const next = VMStorage.update((state) => {
      state.settings.premium = true;
      return state;
    });
    return next;
  }

  function enableNoAds(){
    const next = VMStorage.update((state) => {
      state.settings.noAds = true;
      return state;
    });
    return next;
  }

  return { enablePremium, enableNoAds };
})();