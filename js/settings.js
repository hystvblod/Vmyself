document.addEventListener('DOMContentLoaded', () => {
  VMI18n.apply();
  VMAuth.ensureLockUI();
  fillLanguages();
  loadSettings();
  bindSettings();
});

function fillLanguages(){
  const select = document.getElementById('languageSelect');
  select.innerHTML = VMI18n.languages.map((lang) => `
    <option value="${lang.code}">${lang.label}</option>
  `).join('');
}

function loadSettings(){
  const state = VMStorage.read();
  document.getElementById('toggleSensitive').checked = !!state.settings.hideSensitive;
  document.getElementById('toggleLock').checked = !!state.settings.lockOnOpen;
  document.getElementById('languageSelect').value = state.settings.language || 'fr';
}

function bindSettings(){
  document.getElementById('toggleSensitive')?.addEventListener('change', (e) => {
    VMStorage.update((state) => {
      state.settings.hideSensitive = e.target.checked;
      return state;
    });
    VMUI.toast(VMI18n.t('toast.saved'));
  });

  document.getElementById('toggleLock')?.addEventListener('change', (e) => {
    VMStorage.update((state) => {
      state.settings.lockOnOpen = e.target.checked;
      return state;
    });
    VMUI.toast(VMI18n.t('toast.saved'));
  });

  document.getElementById('languageSelect')?.addEventListener('change', (e) => {
    VMStorage.update((state) => {
      state.settings.language = e.target.value;
      return state;
    });
    location.reload();
  });

  document.getElementById('exportDataBtn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(VMStorage.read(), null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vmyself-export.json';
    a.click();
    URL.revokeObjectURL(url);
    VMUI.toast(VMI18n.t('toast.exported'));
  });

  document.getElementById('resetDataBtn')?.addEventListener('click', () => {
    if(!confirm('Réinitialiser toutes les données locales ?')) return;
    VMStorage.reset();
    VMUI.toast(VMI18n.t('toast.reset'));
    setTimeout(() => location.href = 'index.html', 400);
  });
}