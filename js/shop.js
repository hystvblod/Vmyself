document.addEventListener('DOMContentLoaded', () => {
  VMI18n.apply();
  VMAuth.ensureLockUI();

  document.getElementById('buyPremiumBtn')?.addEventListener('click', () => {
    VMPurchases.enablePremium();
    VMUI.toast(VMI18n.t('toast.premium'));
  });

  document.getElementById('buyNoAdsBtn')?.addEventListener('click', () => {
    VMPurchases.enableNoAds();
    VMUI.toast(VMI18n.t('toast.noAds'));
  });
});