import React from 'react'

type State = { hasError: boolean; message?: string }
export default class ErrorBoundary extends React.Component<{children:React.ReactNode}, State>{
  state: State = { hasError:false }
  static getDerivedStateFromError(err:any){ return { hasError:true, message: String(err?.message || err) } }
  componentDidCatch(err:any, info:any){ console.error('[ErrorBoundary]', err, info) }
  render(){
    if(this.state.hasError){
      return <div style={{padding:16}}>
        <h2>Something went wrong</h2>
        <pre style={{whiteSpace:'pre-wrap', background:'#fff7ed', padding:12, borderRadius:8}}>{this.state.message}</pre>
      </div>
    }
    return this.props.children
  }
}
