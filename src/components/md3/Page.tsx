import React from 'react'
import MD3Theme from './md3/Theme'
export default function Page({title,actions,children}:{title:string; actions?:React.ReactNode; children:React.ReactNode}){
  return <MD3Theme>
    <div className="page">
      <div className="page-header">
        <div className="page-title">{title}</div>
        {actions && <div className="page-actions">{actions}</div>}
      </div>
      {children}
    </div>
  </MD3Theme>
}
