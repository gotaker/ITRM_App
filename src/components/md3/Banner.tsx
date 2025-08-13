import React from 'react'
export default function Banner({title,children}:{title:string; children?:React.ReactNode}){
  return <div className="md3-banner"><div><strong>{title}</strong></div><div>{children}</div></div>
}
