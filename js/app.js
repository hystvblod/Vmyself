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

  function todayKey(){
    return new Date().toISOString().slice(0,10);
  }

  function calcBMI(weightKg, heightCm){
    const w = Number(weightKg), h = Number(heightCm) / 100;
    if(!w || !h) return null;
    return w / (h*h);
  }

  function bmiLabel(bmi){
    if(bmi == null) return '';
    if(bmi < 18.5) return 'Sous la zone santé';
    if(bmi < 25) return 'Zone santé';
    if(bmi < 30) return 'Surpoids';
    if(bmi < 35) return 'Obésité I';
    if(bmi < 40) return 'Obésité II';
    return 'Obésité III';
  }

  function calcWHtR(waistCm, heightCm){
    const waist = Number(waistCm), height = Number(heightCm);
    if(!waist || !height) return null;
    return waist / height;
  }

  function whtrLabel(value){
    if(value == null) return '';
    if(value < 0.4) return 'Très bas';
    if(value < 0.5) return 'Repère correct';
    if(value < 0.6) return 'À surveiller';
    return 'Élevé';
  }

  function estimateCalories(profile){
    const weight = Number(profile.weightKg);
    const height = Number(profile.heightCm);
    const age = Number(profile.age);
    if(!weight || !height || !age) return null;
    const isMale = profile.sex === 'male';
    const bmr = isMale
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    return Math.round(bmr * 1.2 - 300);
  }

  function getTodayJournal(state){
    return state.journal[todayKey()] || {
      waterL: 0,
      sleepH: 0,
      meals: [],
      weightKg: state.profile.weightKg || '',
      moodColor: 'yellow',
      note: ''
    };
  }

  function renderHome(){
    VMI18n.apply();
    VMAuth.ensureLockUI();
    VMAds.maybeRenderBanner();

    const state = VMStorage.read();
    const journal = getTodayJournal(state);
    const hide = !!state.settings.hideSensitive;
    const bmi = calcBMI(journal.weightKg || state.profile.weightKg, state.profile.heightCm);
    const whtr = calcWHtR(state.profile.waistCm, state.profile.heightCm);
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
    document.getElementById('bmiLabel').textContent = bmiLabel(bmi);
    document.getElementById('waistValue').textContent = VMUI.sensitiveText(whtr ? whtr.toFixed(2) : '—', hide);
    document.getElementById('waistLabel').textContent = whtrLabel(whtr);
    document.getElementById('caloriesValue').textContent = `${calories} kcal`;
    const target = estimateCalories(state.profile);
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
    const label = VMI18n.t(`status.${journal.moodColor === 'green-dark' ? 'greenDark' : journal.moodColor === 'green-light' ? 'greenLight' : journal.moodColor}`);
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
    });

    document.getElementById('openOnboardingBtn')?.addEventListener('click', () => {
      openOnboarding();
    });

    document.getElementById('crackBtn')?.addEventListener('click', () => {
      const support = crackSupports[Math.floor(Math.random() * crackSupports.length)];
      document.getElementById('crackSupportText').textContent = support;
      document.getElementById('motivationCard').textContent = encouragements[state.profile.goal || 'health'][0];
      document.getElementById('crackTips').innerHTML = crackTips.map((tip) => `<div class="tip-card">${tip}</div>`).join('');
      document.getElementById('crackModal')?.classList.remove('hidden');
      VMAds.maybeInterstitial('crack');
    });

    document.getElementById('closeCrackBtn')?.addEventListener('click', () => {
      document.getElementById('crackModal')?.classList.add('hidden');
    });

    document.getElementById('saveSmallVictoryBtn')?.addEventListener('click', () => {
      addVictory("J’ai repris la main après un moment difficile.");
      document.getElementById('crackModal')?.classList.add('hidden');
    });

    document.getElementById('saveOnboardingBtn')?.addEventListener('click', saveOnboarding);
  }

  function maybeShowOnboarding(state){
    if(!state.meta.onboarded){
      openOnboarding();
    }
    const select = document.getElementById('onbQuestion');
    if(select && !select.dataset.filled){
      fillRecoveryQuestions(select, state.profile.recoveryQuestionKey || 'pet');
      select.dataset.filled = '1';
    }
  }

  function openOnboarding(){
    const state = VMStorage.read();
    const modal = document.getElementById('onboardingModal');
    if(!modal) return;
    modal.classList.remove('hidden');
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
    document.getElementById('onbWhy').value = state.profile.why || '';
    document.getElementById('onbPin').value = state.profile.pin || '';
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

  function saveOnboarding(){
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
      why: document.getElementById('onbWhy').value.trim(),
      pin: lockEnabled ? pin : '',
      recoveryQuestionKey: document.getElementById('onbQuestion').value,
      recoveryAnswer: document.getElementById('onbAnswer').value.trim()
    };
    if(lockEnabled && pin !== pinConfirm){
      VMUI.toast('Les codes PIN ne correspondent pas.');
      return;
    }
    if(!payload.name || !payload.heightCm || !payload.weightKg){
      VMUI.toast('Complète au moins prénom, taille et poids.');
      return;
    }
    VMStorage.update((state) => {
      state.profile = { ...state.profile, ...payload };
      state.meta.onboarded = true;
      return state;
    });
    document.getElementById('onboardingModal')?.classList.add('hidden');
    VMUI.toast(VMI18n.t('toast.saved'));
    renderHome();
  }

  function addVictory(text){
    VMStorage.update((state) => {
      state.victories.unshift({ text, date: VMUI.formatDate() });
      state.victories = state.victories.slice(0, 50);
      return state;
    });
    VMUI.toast(VMI18n.t('toast.saved'));
    renderHome();
  }

  document.addEventListener('DOMContentLoaded', renderHome);
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="lockapp"]').forEach((radio) => {
      radio.addEventListener('change', togglePinBlock);
    });
    togglePinBlock();
  });

  function togglePinBlock(){
    const pinBlock = document.getElementById('pinBlock');
    if(!pinBlock) return;
    const lockEnabled = document.querySelector('input[name="lockapp"]:checked')?.value === 'yes';
    pinBlock.style.display = lockEnabled ? 'block' : 'none';
  }

  document.getElementById("btnContinue")?.addEventListener("click",(e)=>{
    e.preventDefault();
    saveOnboarding();
    window.location.href = "pages/home.html";
  });

  window.VMShared = { todayKey, calcBMI, bmiLabel, calcWHtR, whtrLabel, estimateCalories, addVictory };
  return { renderHome };
})();
