import React from 'react'
export default function Snackbar({open,message}:{open:boolean; message:string}){
  if(!open) return null
  return <div className="md3-snackbar">{message}</div>
}
