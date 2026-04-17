window.VMUI = (() => {
  function $(selector, root = document){
    return root.querySelector(selector);
  }
  function $all(selector, root = document){
    return [...root.querySelectorAll(selector)];
  }
  function toast(message){
    const old = document.querySelector('.toast');
    if(old) old.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }
  function formatDate(date = new Date()){
    return date.toLocaleDateString(window.VMI18n.getLanguage() === 'fr' ? 'fr-FR' : 'en-US', {
      weekday:'short', day:'numeric', month:'short'
    });
  }
  function sensitiveText(text, enabled){
    return enabled ? '•••' : text;
  }
  function setBar(el, percent){
    if(el) el.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
  function colorClassByStatus(status){
    return {
      'green-dark':'dot-green-dark',
      'green-light':'dot-green-light',
      'yellow':'dot-yellow',
      'orange':'dot-orange',
      'red':'dot-red'
    }[status] || 'dot-yellow';
  }
  function buildLegend(container){
    if(!container) return;
    const items = [
      ['green-dark', window.VMI18n.t('status.greenDark')],
      ['green-light', window.VMI18n.t('status.greenLight')],
      ['yellow', window.VMI18n.t('status.yellow')],
      ['orange', window.VMI18n.t('status.orange')],
      ['red', window.VMI18n.t('status.red')]
    ];
    container.innerHTML = items.map(([key, label]) => `
      <span class="legend-chip"><span class="legend-dot ${colorClassByStatus(key)}"></span>${label}</span>
    `).join('');
  }
  return { $, $all, toast, formatDate, sensitiveText, setBar, colorClassByStatus, buildLegend };
})();