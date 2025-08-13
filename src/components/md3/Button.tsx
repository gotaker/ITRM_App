import React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?:'filled'|'tonal'|'text'; icon?:React.ReactNode }
export default function Button({variant='filled', icon, children, ...rest}:Props){
  return <button className={`md3-btn ${variant==='tonal'?'tonal':variant==='text'?'text':''}`} {...rest}>
    {icon && <span className="md3-icon">{icon}</span>}{children}
  </button>
}
