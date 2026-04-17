document.addEventListener('DOMContentLoaded', () => {
  VMI18n.apply();
  VMAuth.ensureLockUI();

  const state = VMStorage.read();
  fillQuestions();
  fillFields(state);
  bind();
  recalc();
});

function fillQuestions(){
  const select = document.getElementById('profileQuestion');
  if(!select) return;
  select.innerHTML = Object.keys(VMI18n.recoveryQuestions).map((key) => `
    <option value="${key}">${VMI18n.getRecoveryQuestionLabel(key)}</option>
  `).join('');
}

function fillFields(state){
  const p = state.profile;
  ['Name','Age','Sex','Goal','Why','Height','Weight','TargetWeight','Waist','Pin','Answer'].forEach(() => {});
  document.getElementById('profileName').value = p.name || '';
  document.getElementById('profileAge').value = p.age || '';
  document.getElementById('profileSex').value = p.sex || 'female';
  document.getElementById('profileGoal').value = p.goal || 'health';
  document.getElementById('profileWhy').value = p.why || '';
  document.getElementById('profileHeight').value = p.heightCm || '';
  document.getElementById('profileWeight').value = p.weightKg || '';
  document.getElementById('profileTargetWeight').value = p.targetWeightKg || '';
  document.getElementById('profileWaist').value = p.waistCm || '';
  document.getElementById('profilePin').value = p.pin || '';
  document.getElementById('profileQuestion').value = p.recoveryQuestionKey || 'pet';
  document.getElementById('profileAnswer').value = p.recoveryAnswer || '';
}

function bind(){
  ['profileHeight','profileWeight','profileWaist','profileAge','profileSex'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', recalc);
  });

  document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
    VMStorage.update((state) => {
      state.profile = {
        ...state.profile,
        name: document.getElementById('profileName').value.trim(),
        age: document.getElementById('profileAge').value.trim(),
        sex: document.getElementById('profileSex').value,
        goal: document.getElementById('profileGoal').value,
        why: document.getElementById('profileWhy').value.trim(),
        heightCm: document.getElementById('profileHeight').value.trim(),
        weightKg: document.getElementById('profileWeight').value.trim(),
        targetWeightKg: document.getElementById('profileTargetWeight').value.trim(),
        waistCm: document.getElementById('profileWaist').value.trim(),
        pin: document.getElementById('profilePin').value.trim(),
        recoveryQuestionKey: document.getElementById('profileQuestion').value,
        recoveryAnswer: document.getElementById('profileAnswer').value.trim()
      };
      state.meta.onboarded = true;
      return state;
    });
    VMUI.toast(VMI18n.t('toast.saved'));
    location.href = 'index.html';
  });
}

function recalc(){
  const bmi = VMShared.calcBMI(document.getElementById('profileWeight').value, document.getElementById('profileHeight').value);
  const whtr = VMShared.calcWHtR(document.getElementById('profileWaist').value, document.getElementById('profileHeight').value);
  const profile = {
    weightKg: document.getElementById('profileWeight').value,
    heightCm: document.getElementById('profileHeight').value,
    age: document.getElementById('profileAge').value,
    sex: document.getElementById('profileSex').value
  };
  document.getElementById('profileBmi').textContent = bmi ? bmi.toFixed(1) : '—';
  document.getElementById('profileBmiLabel').textContent = VMShared.bmiLabel(bmi);
  document.getElementById('profileWhtr').textContent = whtr ? whtr.toFixed(2) : '—';
  document.getElementById('profileWhtrLabel').textContent = VMShared.whtrLabel(whtr);
  const target = VMShared.estimateCalories(profile);
  document.getElementById('profileCalorieTarget').textContent = target ? `${target} kcal` : '—';
}