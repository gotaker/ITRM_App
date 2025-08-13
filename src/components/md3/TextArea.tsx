import React from 'react'
type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label:string; helperText?:string; errorText?:string }
export default function TextArea({label, helperText, errorText, ...rest}:Props){
  return <label className="md3-field">
    <span className="md3-label">{label}</span>
    <textarea className="md3-textarea" {...rest}/>
    {errorText ? <span className="md3-error-text">{errorText}</span> : helperText ? <span className="md3-helper">{helperText}</span> : null}
  </label>
}
