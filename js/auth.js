window.VMAuth = (() => {
  function ensureLockUI(){
    const state = VMStorage.read();
    const lockOnOpen = state.settings.lockOnOpen;
    const pin = state.profile.pin;
    const lock = document.getElementById('appLock');
    if(!lock) return;
    if(lockOnOpen && pin){
      lock.classList.remove('hidden');
      lock.setAttribute('aria-hidden', 'false');
      initLockEvents();
      updatePinDots('');
      const label = document.getElementById('recoveryQuestionLabel');
      if(label){
        label.textContent = VMI18n.getRecoveryQuestionLabel(state.profile.recoveryQuestionKey || 'pet');
      }
    }
  }

  function initLockEvents(){
    const pinInput = document.getElementById('pinInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const forgotBtn = document.getElementById('openRecoveryBtn');
    const recoveryBox = document.getElementById('recoveryBox');
    const recoveryCheckBtn = document.getElementById('recoveryCheckBtn');
    if(!pinInput || pinInput.dataset.bound) return;
    pinInput.dataset.bound = '1';

    pinInput.addEventListener('input', () => updatePinDots(pinInput.value));

    unlockBtn?.addEventListener('click', tryUnlock);
    pinInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') tryUnlock();
    });

    forgotBtn?.addEventListener('click', () => recoveryBox?.classList.toggle('hidden'));
    recoveryCheckBtn?.addEventListener('click', checkRecovery);
  }

  function updatePinDots(value){
    const dots = [...(document.querySelectorAll('#pinDots span') || [])];
    dots.forEach((dot, index) => {
      dot.style.background = index < String(value).length ? 'linear-gradient(135deg,#73b8ff,#ff8fbb)' : 'rgba(115,184,255,.16)';
    });
  }

  function tryUnlock(){
    const pinInput = document.getElementById('pinInput');
    const lock = document.getElementById('appLock');
    const state = VMStorage.read();
    if(pinInput?.value === state.profile.pin){
      lock?.classList.add('hidden');
      pinInput.value = '';
      updatePinDots('');
      return;
    }
    VMUI.toast('Code incorrect.');
  }

  function checkRecovery(){
    const answer = (document.getElementById('recoveryAnswerInput')?.value || '').trim().toLowerCase();
    const expected = (VMStorage.read().profile.recoveryAnswer || '').trim().toLowerCase();
    if(answer && expected && answer === expected){
      document.getElementById('appLock')?.classList.add('hidden');
      VMUI.toast('Réponse validée.');
    }else{
      VMUI.toast('Réponse incorrecte.');
    }
  }

  return { ensureLockUI };
})();