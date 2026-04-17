window.VMShared = (() => {
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

  function addVictory(text){
    VMStorage.update((state) => {
      state.victories.unshift({ text, date: VMUI.formatDate() });
      state.victories = state.victories.slice(0, 50);
      return state;
    });
    VMUI.toast(VMI18n.t('toast.saved'));
  }

  return { todayKey, calcBMI, bmiLabel, calcWHtR, whtrLabel, estimateCalories, addVictory };
})();
