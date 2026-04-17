document.addEventListener('DOMContentLoaded', () => {
  VMI18n.apply();
  VMAuth.ensureLockUI();
  renderVictories();
  document.getElementById('addVictoryBtn')?.addEventListener('click', () => {
    const input = document.getElementById('victoryInput');
    const text = input.value.trim();
    if(!text){
      VMUI.toast('Ajoute une petite victoire.');
      return;
    }
    VMShared.addVictory(text);
    input.value = '';
    renderVictories();
  });
});

function renderVictories(){
  const list = document.getElementById('victoryList');
  const victories = VMStorage.read().victories || [];
  if(!victories.length){
    list.innerHTML = `<div class="mini-item"><span>Ton coffre est encore vide. Commence avec un tout petit pas.</span></div>`;
    return;
  }
  list.innerHTML = victories.map((entry, index) => `
    <div class="mini-item">
      <div>
        <strong>${entry.text}</strong>
        <div class="muted">${entry.date}</div>
      </div>
      <button class="btn ghost remove-victory-btn" data-index="${index}">✕</button>
    </div>
  `).join('');
  list.querySelectorAll('.remove-victory-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      VMStorage.update((state) => {
        state.victories.splice(Number(btn.dataset.index), 1);
        return state;
      });
      renderVictories();
    });
  });
}