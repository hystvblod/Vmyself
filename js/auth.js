window.VMAuth = (() => {
  function buildLockMarkup(){
    return `
      <div id="appLock" class="lock-screen hidden" aria-hidden="true">
        <div class="lock-card card center">
          <div class="brand-mark">V</div>
          <h1 data-i18n="lock.title"></h1>
          <p class="muted" data-i18n="lock.subtitle"></p>
          <div class="pin-dots" id="pinDots"><span></span><span></span><span></span><span></span></div>
          <input id="pinInput" class="field" inputmode="numeric" maxlength="6" autocomplete="off" data-i18n-placeholder="lock.pinPlaceholder" />
          <button id="unlockBtn" class="btn primary" data-i18n="lock.unlock"></button>
          <button id="openRecoveryBtn" class="btn ghost" data-i18n="lock.forgot"></button>
          <div id="recoveryBox" class="recovery-box hidden">
            <label class="label" id="recoveryQuestionLabel"></label>
            <input id="recoveryAnswerInput" class="field" autocomplete="off" data-i18n-placeholder="lock.answerPlaceholder" />
            <button id="recoveryCheckBtn" class="btn soft" data-i18n="lock.recover"></button>
          </div>
        </div>
      </div>`;
  }

  function getOrCreateLock(){
    let lock = document.getElementById('appLock');
    if(lock) return lock;
    document.body.insertAdjacentHTML('afterbegin', buildLockMarkup());
    VMI18n.apply();
    return document.getElementById('appLock');
  }

  function ensureLockUI(){
    const state = VMStorage.read();
    const lockOnOpen = state.settings.lockOnOpen;
    const pin = state.profile.pin;
    const lock = getOrCreateLock();
    if(!lock) return;
    if(lockOnOpen && pin){
      lock.classList.remove('hidden');
      lock.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      initLockEvents();
      updatePinDots('');
      const label = document.getElementById('recoveryQuestionLabel');
      if(label){
        label.textContent = VMI18n.getRecoveryQuestionLabel(state.profile.recoveryQuestionKey || 'pet');
      }
    }else{
      lock.classList.add('hidden');
      lock.setAttribute('aria-hidden', 'true');
      if(document.getElementById('onboardingModal')?.classList.contains('hidden') !== false && document.getElementById('crackModal')?.classList.contains('hidden') !== false){
        document.body.classList.remove('modal-open');
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

  function closeLock(){
    const lock = document.getElementById('appLock');
    lock?.classList.add('hidden');
    lock?.setAttribute('aria-hidden', 'true');
    const pinInput = document.getElementById('pinInput');
    if(pinInput) pinInput.value = '';
    updatePinDots('');
    if(document.getElementById('onboardingModal')?.classList.contains('hidden') !== false && document.getElementById('crackModal')?.classList.contains('hidden') !== false){
      document.body.classList.remove('modal-open');
    }
  }

  function tryUnlock(){
    const pinInput = document.getElementById('pinInput');
    const state = VMStorage.read();
    if(pinInput?.value === state.profile.pin){
      closeLock();
      return;
    }
    VMUI.toast('Code incorrect.');
  }

  function checkRecovery(){
    const answer = (document.getElementById('recoveryAnswerInput')?.value || '').trim().toLowerCase();
    const expected = (VMStorage.read().profile.recoveryAnswer || '').trim().toLowerCase();
    if(answer && expected && answer === expected){
      closeLock();
      VMUI.toast('Réponse validée.');
    }else{
      VMUI.toast('Réponse incorrecte.');
    }
  }

  return { ensureLockUI };
})();
