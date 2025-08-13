(function(){
  console.log("[debug-probe] index.html loaded");
  window.addEventListener('error', e => console.error('[window.onerror]', e.error || e.message || e));
  window.addEventListener('unhandledrejection', e => console.error('[unhandledrejection]', e.reason));
})();
