(async function bootstrap(){
  const boot = document.getElementById('boot')
  function showErr(e){
    const el = document.getElementById('root')
    if(el){
      el.innerHTML = '<div style="padding:16;color:#b91c1c"><h2>Boot error</h2><pre style="white-space:pre-wrap">'+String(e?.stack||e)+'</pre></div>'
    } else {
      console.error('[boot] error', e)
    }
  }
  try{
    const [{ StrictMode, createElement }, { createRoot }, { createBrowserRouter, RouterProvider }, AppMod] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('react-router-dom'),
      import('./shell/App')
    ])
    const Home = () => createElement('div', {style:{padding:16}}, [
      createElement('h1', {key:'h'}, 'Enterprise Risk — It works ✅'),
      createElement('p', {key:'p'}, 'If this appears but your pages do not, wire your routes under <Outlet/> in shell/App.tsx.')
    ])
    const router = createBrowserRouter([{ path: '/', element: createElement(AppMod.default), children: [{ index: true, element: createElement(Home) }]}])
    const rootEl = document.getElementById('root')
    if(!rootEl) throw new Error('Root element #root not found')
    if(boot) boot.remove()
    createRoot(rootEl).render(createElement(StrictMode, {}, createElement(RouterProvider, { router })))
    console.log('[white-screen-killer v3] React mounted ok')
  }catch(e){ showErr(e) }
})();
