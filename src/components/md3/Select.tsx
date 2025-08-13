import React from 'react'
type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { label:string; helperText?:string }
export default function Select({label, helperText, children, ...rest}:Props){
  return <label className="md3-field">
    <span className="md3-label">{label}</span>
    <select className="md3-select" {...rest}>{children}</select>
    {helperText && <span className="md3-helper">{helperText}</span>}
  </label>
}
