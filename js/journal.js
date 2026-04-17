document.addEventListener('DOMContentLoaded', () => {
  VMI18n.apply();
  VMAuth.ensureLockUI();
  document.getElementById('journalDateLabel').textContent = VMUI.formatDate();

  loadJournal();
  bindJournal();
});

function getCurrentJournal(){
  const state = VMStorage.read();
  return state.journal[VMShared.todayKey()] || {
    waterL: 0,
    sleepH: 0,
    meals: [],
    weightKg: state.profile.weightKg || '',
    moodColor: 'yellow',
    note: ''
  };
}

function loadJournal(){
  const entry = getCurrentJournal();
  document.getElementById('waterInput').value = entry.waterL || '';
  document.getElementById('sleepInput').value = entry.sleepH || '';
  document.getElementById('dailyWeightInput').value = entry.weightKg || '';
  document.getElementById('dailyMoodInput').value = entry.moodColor || 'yellow';
  document.getElementById('journalNoteInput').value = entry.note || '';
  renderMeals(entry.meals || []);
}

function bindJournal(){
  document.getElementById('addMealBtn')?.addEventListener('click', () => {
    const name = document.getElementById('mealNameInput').value.trim();
    const calories = document.getElementById('mealCaloriesInput').value.trim();
    if(!name || !calories){
      VMUI.toast('Ajoute un nom et des calories.');
      return;
    }
    const entry = getCurrentJournal();
    entry.meals.push({ name, calories: Number(calories) });
    saveEntry(entry, false);
    document.getElementById('mealNameInput').value = '';
    document.getElementById('mealCaloriesInput').value = '';
  });

  document.getElementById('saveJournalBtn')?.addEventListener('click', () => {
    const entry = getCurrentJournal();
    entry.waterL = Number(document.getElementById('waterInput').value || 0);
    entry.sleepH = Number(document.getElementById('sleepInput').value || 0);
    entry.weightKg = document.getElementById('dailyWeightInput').value.trim();
    entry.moodColor = document.getElementById('dailyMoodInput').value;
    entry.note = document.getElementById('journalNoteInput').value.trim();
    saveEntry(entry, true);
    location.href = 'index.html';
  });
}

function saveEntry(entry, toast = true){
  VMStorage.update((state) => {
    state.journal[VMShared.todayKey()] = entry;
    if(entry.weightKg){
      state.profile.weightKg = entry.weightKg;
    }
    return state;
  });
  renderMeals(entry.meals || []);
  if(toast) VMUI.toast(VMI18n.t('toast.saved'));
}

function renderMeals(meals){
  const list = document.getElementById('mealList');
  const total = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
  document.getElementById('totalCaloriesDay').textContent = `${total} kcal`;
  document.getElementById('mealCount').textContent = meals.length;
  if(!meals.length){
    list.innerHTML = `<div class="mini-item"><span>Aucun repas enregistré pour aujourd’hui.</span></div>`;
    return;
  }
  list.innerHTML = meals.map((meal, index) => `
    <div class="mini-item">
      <div>
        <strong>${meal.name}</strong>
        <div class="muted">${meal.calories} kcal</div>
      </div>
      <button class="btn ghost remove-meal-btn" data-index="${index}">✕</button>
    </div>
  `).join('');

  list.querySelectorAll('.remove-meal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const entry = getCurrentJournal();
      entry.meals.splice(Number(btn.dataset.index), 1);
      saveEntry(entry, false);
    });
  });
}