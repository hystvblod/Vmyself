window.VMApp = (() => {
  const encouragements = {
    confidence: [
      "Tu n’as pas besoin d’être parfaite pour être fière de toi.",
      "Chaque choix calme compte, même les petits.",
      "Tu construis quelque chose de solide, jour après jour."
    ],
    health: [
      "Ton corps mérite du respect, pas de la brutalité.",
      "Avancer doucement vaut mieux que culpabiliser fort.",
      "Un jour moyen peut quand même te rapprocher de ton objectif."
    ],
    energy: [
      "L’énergie revient souvent par de petites habitudes tenues.",
      "Un bon pas aujourd’hui vaut mieux qu’un plan parfait jamais tenu.",
      "Tu peux te recentrer maintenant, sans attendre demain."
    ],
    wellbeing: [
      "Le mieux-être se construit avec des gestes simples répétés.",
      "Tu peux tomber un peu et quand même continuer.",
      "Respire : tu es déjà en train de reprendre la main."
    ],
    body: [
      "Tu n’as pas besoin d’aimer chaque détail pour prendre soin de toi aujourd’hui.",
      "Le confort dans ton corps se construit avec de petits gestes répétés.",
      "Tu peux viser le mieux-être sans te maltraiter."
    ],
    habit: [
      "Une habitude calme répétée vaut plus qu’un grand élan de deux jours.",
      "Revenir à l’essentiel est déjà une vraie avancée.",
      "La régularité douce change plus que la pression."
    ]
  };

  const adviceByStatus = {
    'green-dark': "Belle dynamique aujourd’hui. Garde le rythme sans te priver excessivement.",
    'green-light': "Tu es sur une bonne pente. Essaie de sécuriser l’eau et un repas simple ce soir.",
    'yellow': "Journée mitigée. Reviens à l’essentiel : eau, respiration, un repas plus stable.",
    'orange': "Tu sembles fragilisé·e. Vise le minimum utile et évite le tout ou rien.",
    'red': "Aujourd’hui, la priorité est la douceur. Bois un verre d’eau, respire, puis choisis une seule petite victoire."
  };

  const crackSupports = [
    "Un craquage n’efface pas tes efforts. C’est un moment, pas ton identité.",
    "Tu peux t’arrêter maintenant, te parler mieux, et repartir à la prochaine action.",
    "Ton parcours n’est pas cassé. Il a juste besoin d’un retour au calme."
  ];

  const crackTips = [
    "Bois un verre d’eau doucement.",
    "Éloigne-toi 2 minutes de la cuisine ou du paquet.",
    "Écris une mini-victoire dans ton coffre.",
    "Choisis le prochain bon geste, pas une punition."
  ];

  function getTodayJournal(state){
    return state.journal[VMShared.todayKey()] || {
      waterL: 0,
      sleepH: 0,
      meals: [],
      weightKg: state.profile.weightKg || '',
      moodColor: 'yellow',
      note: ''
    };
  }

  function setModalState(modal, isOpen){
    if(!modal) return;
    modal.classList.toggle('hidden', !isOpen);
    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.classList.toggle('modal-open', isOpen && !document.getElementById('appLock')?.classList.contains('hidden'));
    if(isOpen){
      document.body.classList.add('modal-open');
    }else if(document.getElementById('crackModal')?.classList.contains('hidden') && document.getElementById('onboardingModal')?.classList.contains('hidden') && document.getElementById('appLock')?.classList.contains('hidden')){
      document.body.classList.remove('modal-open');
    }
  }

  function renderHome(){
    VMI18n.apply();
    VMAuth.ensureLockUI();
    VMAds.maybeRenderBanner();

    const state = VMStorage.read();
    const journal = getTodayJournal(state);
    const hide = !!state.settings.hideSensitive;
    const bmi = VMShared.calcBMI(journal.weightKg || state.profile.weightKg, state.profile.heightCm);
    const whtr = VMShared.calcWHtR(state.profile.waistCm, state.profile.heightCm);
    const calories = (journal.meals || []).reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
    const goal = state.profile.goal || 'health';
    const encouragementList = encouragements[goal] || encouragements.health;
    const encouragement = encouragementList[(new Date().getDate()) % encouragementList.length];
    const advice = adviceByStatus[journal.moodColor] || adviceByStatus.yellow;

    VMUI.buildLegend(document.getElementById('colorLegend'));
    document.getElementById('welcomeLine').textContent = state.profile.name
      ? `Bonjour ${state.profile.name}. On avance ensemble, calmement.`
      : 'Un espace doux pour suivre ton équilibre.';

    document.getElementById('mainEncouragement').textContent = encouragement;
    document.getElementById('dailyAdvice').textContent = advice;

    document.getElementById('weightValue').textContent = VMUI.sensitiveText(journal.weightKg ? `${Number(journal.weightKg).toFixed(1)} kg` : '—', hide);
    document.getElementById('weightTrend').textContent = state.profile.targetWeightKg ? `Objectif ${state.profile.targetWeightKg} kg` : 'Ajoute un objectif';
    document.getElementById('bmiValue').textContent = VMUI.sensitiveText(bmi ? bmi.toFixed(1) : '—', hide);
    document.getElementById('bmiLabel').textContent = VMShared.bmiLabel(bmi);
    document.getElementById('waistValue').textContent = VMUI.sensitiveText(whtr ? whtr.toFixed(2) : '—', hide);
    document.getElementById('waistLabel').textContent = VMShared.whtrLabel(whtr);
    document.getElementById('caloriesValue').textContent = `${calories} kcal`;
    const target = VMShared.estimateCalories(state.profile);
    document.getElementById('caloriesLabel').textContent = target ? `Cible ~ ${target} kcal` : 'Complète ton profil';

    const waterGoal = 2;
    const sleepGoal = 8;
    VMUI.setBar(document.getElementById('waterBar'), (Number(journal.waterL || 0) / waterGoal) * 100);
    VMUI.setBar(document.getElementById('sleepBar'), (Number(journal.sleepH || 0) / sleepGoal) * 100);
    document.getElementById('waterScoreLabel').textContent = `${journal.waterL || 0} / ${waterGoal} L`;
    document.getElementById('sleepScoreLabel').textContent = `${journal.sleepH || 0} / ${sleepGoal} h`;

    const statusBox = document.getElementById('dailyStatusBox');
    const statusDot = document.getElementById('statusDot');
    const statusTitle = document.getElementById('statusTitle');
    const statusText = document.getElementById('statusText');
    const statusBadge = document.getElementById('dailyStatusBadge');
    const key = journal.moodColor === 'green-dark' ? 'greenDark' : journal.moodColor === 'green-light' ? 'greenLight' : journal.moodColor;
    const label = VMI18n.t(`status.${key}`);
    statusDot.className = `status-dot ${VMUI.colorClassByStatus(journal.moodColor)}`;
    statusTitle.textContent = label;
    statusText.textContent = advice;
    statusBadge.textContent = label;
    statusBox.style.borderColor = 'rgba(115,184,255,.14)';

    renderVaultPreview(state);
    bindHome(state);
    maybeShowOnboarding(state);
  }

  function renderVaultPreview(state){
    const list = document.getElementById('vaultPreview');
    if(!list) return;
    const entries = (state.victories || []).slice(0, 3);
    if(!entries.length){
      list.innerHTML = `<div class="mini-item"><span>Aucune petite victoire enregistrée pour le moment.</span></div>`;
      return;
    }
    list.innerHTML = entries.map((entry) => `
      <div class="mini-item"><span>${entry.text}</span><small>${entry.date}</small></div>
    `).join('');
  }

  function bindHome(state){
    document.getElementById('privacyToggleBtn')?.addEventListener('click', () => {
      VMStorage.update((s) => {
        s.settings.hideSensitive = !s.settings.hideSensitive;
        return s;
      });
      renderHome();
    }, { once:true });

    document.getElementById('openOnboardingBtn')?.addEventListener('click', () => {
      openOnboarding();
    }, { once:true });

    document.getElementById('crackBtn')?.addEventListener('click', () => {
      const support = crackSupports[Math.floor(Math.random() * crackSupports.length)];
      document.getElementById('crackSupportText').textContent = support;
      document.getElementById('motivationCard').textContent = encouragements[state.profile.goal || 'health'][0] || encouragements.health[0];
      document.getElementById('crackTips').innerHTML = crackTips.map((tip) => `<div class="tip-card">${tip}</div>`).join('');
      setModalState(document.getElementById('crackModal'), true);
      VMAds.maybeInterstitial('crack');
    }, { once:true });

    document.getElementById('closeCrackBtn')?.addEventListener('click', () => {
      setModalState(document.getElementById('crackModal'), false);
      bindHome(VMStorage.read());
    }, { once:true });

    document.getElementById('saveSmallVictoryBtn')?.addEventListener('click', () => {
      VMShared.addVictory("J’ai repris la main après un moment difficile.");
      setModalState(document.getElementById('crackModal'), false);
      renderHome();
    }, { once:true });

    document.getElementById('btnContinue')?.addEventListener('click', saveOnboarding, { once:true });
    document.querySelectorAll('input[name="lockapp"]').forEach((radio) => {
      if(!radio.dataset.bound){
        radio.dataset.bound = '1';
        radio.addEventListener('change', togglePinBlock);
      }
    });
  }

  function maybeShowOnboarding(state){
    if(!state.meta.onboarded){
      openOnboarding();
    }
  }

  function openOnboarding(){
    const state = VMStorage.read();
    const modal = document.getElementById('onboardingModal');
    if(!modal) return;
    setModalState(modal, true);
    fillRecoveryQuestions(document.getElementById('onbQuestion'), state.profile.recoveryQuestionKey || 'pet');
    document.getElementById('onbName').value = state.profile.name || '';
    document.getElementById('onbAge').value = state.profile.age || '';
    document.getElementById('onbSex').value = state.profile.sex || 'female';
    const selectedGoals = new Set(state.profile.goals || (state.profile.goal ? [state.profile.goal] : ['health']));
    document.querySelectorAll('input[name="onbGoals"]').forEach((checkbox) => {
      checkbox.checked = selectedGoals.has(checkbox.value);
    });
    document.getElementById('onbHeight').value = state.profile.heightCm || '';
    document.getElementById('onbWeight').value = state.profile.weightKg || '';
    document.getElementById('onbTargetWeight').value = state.profile.targetWeightKg || '';
    document.getElementById('onbPin').value = state.profile.pin || '';
    document.getElementById('onbPinConfirm').value = state.profile.pin || '';
    document.getElementById('onbQuestion').value = state.profile.recoveryQuestionKey || 'pet';
    document.getElementById('onbAnswer').value = state.profile.recoveryAnswer || '';
    const lockPref = state.profile.pin ? 'yes' : 'no';
    const lockRadio = document.querySelector(`input[name="lockapp"][value="${lockPref}"]`);
    if(lockRadio) lockRadio.checked = true;
    togglePinBlock();
  }

  function fillRecoveryQuestions(select, selectedKey){
    if(!select) return;
    select.innerHTML = Object.keys(VMI18n.recoveryQuestions).map((key) => `
      <option value="${key}" ${key === selectedKey ? 'selected' : ''}>${VMI18n.getRecoveryQuestionLabel(key)}</option>
    `).join('');
  }

  function validateOnboarding(payload, lockEnabled, pin, pinConfirm){
    if(!payload.name || !payload.age || !payload.heightCm || !payload.weightKg){
      return 'Complète au moins prénom, âge, taille et poids.';
    }
    if(!payload.goals.length){
      return 'Choisis au moins un objectif.';
    }
    if(lockEnabled){
      if(!/^\d{4,6}$/.test(pin)) return 'Choisis un code PIN de 4 à 6 chiffres.';
      if(pin !== pinConfirm) return 'Les codes PIN ne correspondent pas.';
      if(!payload.recoveryAnswer) return 'Ajoute une réponse de secours.';
    }
    return '';
  }

  function saveOnboarding(e){
    if(e) e.preventDefault();
    const selectedGoals = Array.from(document.querySelectorAll('input[name="onbGoals"]:checked')).map((input) => input.value);
    const lockEnabled = document.querySelector('input[name="lockapp"]:checked')?.value === 'yes';
    const pin = (document.getElementById('onbPin').value || '').trim();
    const pinConfirm = (document.getElementById('onbPinConfirm').value || '').trim();
    const payload = {
      name: document.getElementById('onbName').value.trim(),
      age: document.getElementById('onbAge').value.trim(),
      sex: document.getElementById('onbSex').value,
      goal: selectedGoals[0] || 'health',
      goals: selectedGoals,
      heightCm: document.getElementById('onbHeight').value.trim(),
      weightKg: document.getElementById('onbWeight').value.trim(),
      targetWeightKg: document.getElementById('onbTargetWeight').value.trim(),
      why: selectedGoals.join(', '),
      pin: lockEnabled ? pin : '',
      recoveryQuestionKey: document.getElementById('onbQuestion').value,
      recoveryAnswer: lockEnabled ? document.getElementById('onbAnswer').value.trim() : ''
    };

    const validationMessage = validateOnboarding(payload, lockEnabled, pin, pinConfirm);
    if(validationMessage){
      VMUI.toast(validationMessage);
      bindHome(VMStorage.read());
      return;
    }

    VMStorage.update((state) => {
      state.profile = { ...state.profile, ...payload };
      state.settings.lockOnOpen = !!payload.pin;
      state.meta.onboarded = true;
      return state;
    });

    setModalState(document.getElementById('onboardingModal'), false);
    VMUI.toast(VMI18n.t('toast.saved'));
    renderHome();
  }

  function togglePinBlock(){
    const pinBlock = document.getElementById('pinBlock');
    const recoveryWrap = document.getElementById('recoverySetupWrap');
    if(!pinBlock) return;
    const lockEnabled = document.querySelector('input[name="lockapp"]:checked')?.value === 'yes';
    pinBlock.style.display = lockEnabled ? 'grid' : 'none';
    if(recoveryWrap) recoveryWrap.style.display = lockEnabled ? 'grid' : 'none';
  }

  document.addEventListener('DOMContentLoaded', renderHome);

  return { renderHome, openOnboarding, saveOnboarding };
})();
