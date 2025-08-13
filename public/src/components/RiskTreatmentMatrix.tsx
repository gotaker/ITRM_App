import React, { useMemo } from 'react'
type Props = { greenMax?:number; amberMax?:number; bend?:number; cells?:4|5; onCellClick?:(p:number,i:number,s:number)=>void }
const GAP=10, colorBy=(s:number,g:number,a:number)=> s<=g?'#10b981': s<=a?'#eab308':'#ef4444'
export default function RiskTreatmentMatrix({greenMax=3,amberMax=11,bend=0,cells=4,onCellClick}:Props){
  const W=cells===5?620:560, H=W, cell=useMemo(()=> (W-GAP*(cells-1))/cells,[W,cells])
  const grid=useMemo(()=>{ const rows:any[]=[]; for(let r=0;r<cells;r++) for(let c=0;c<cells;c++){ const p=c+1,i=cells-r,s=p*i,x=c*(cell+GAP),y=r*(cell+GAP); rows.push({x,y,s,p,i,fill:colorBy(s,greenMax,amberMax)}) } return rows },[greenMax,amberMax,cells,cell])
  const appetite=useMemo(()=>{ const S={x:0,y:0},E={x:W,y:H},C={x:(W/2)+(bend*60), y:(H/2)-(bend*60)}; return `M ${S.x},${S.y} Q ${C.x},${C.y} ${E.x},${E.y}` },[bend,cells])
  return (<svg viewBox={`0 0 ${W} ${H}`} width="100%">
    {grid.map((c,idx)=>(<g key={idx} transform={`translate(${c.x},${c.y})`}>
      <rect width={cell} height={cell} rx="10" fill={c.fill} cursor={onCellClick?'pointer':'default'} onClick={()=>onCellClick&&onCellClick(c.p,c.i,c.s)}/>
      <text x={8} y={18} fontSize="12" fill="#fff">{`P${c.p}xI${c.i}`}</text>
      <text x={cell/2} y={cell/2+5} textAnchor="middle" fontSize="16" fontWeight={700} fill="#fff">{c.s}</text>
    </g>))}
    <path d={appetite} fill="none" stroke="#ffffff" strokeWidth="6" strokeDasharray="14 10"/>
    <path d={appetite} fill="none" stroke="#374151" strokeWidth="3" strokeDasharray="14 10" strokeLinecap="round"/>
  </svg>)
}
