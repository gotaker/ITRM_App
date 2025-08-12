import React, { useMemo } from 'react'

type Props = {
  greenMax?: number
  amberMax?: number
  anchorP?: number
  anchorI?: number
  bend?: number
  showLegend?: boolean
}
const W = 560, H = 560, G = 10, CELLS = 4
const cell = (W - G * (CELLS - 1)) / CELLS

const colorByScore = (s: number, g: number, a: number) =>
  s <= g ? '#10b981' : s <= a ? '#eab308' : '#ef4444'

export default function RiskTreatmentMatrix({
  greenMax = 3, amberMax = 11, anchorP = 3, anchorI = 3, bend = 0, showLegend = true
}: Props){
  const grid = useMemo(() => {
    const rows: { x: number; y: number; s: number; p: number; i: number; fill: string }[] = []
    for (let r=0;r<4;r++) for (let c=0;c<4;c++){
      const p = c+1, i = 4-r, s = p*i
      const x = c*(cell+G), y = r*(cell+G)
      rows.push({x,y,s,p,i,fill: colorByScore(s, greenMax, amberMax)})
    }
    return rows
  }, [greenMax, amberMax])

  const center = (p:number, i:number) => {
    const c = p-1, r = 4-i
    const x = c*(cell+G) + cell/2
    const y = r*(cell+G) + cell/2
    return {x,y}
  }

  const appetitePath = useMemo(() => {
    const S = { x: 0, y: 0 }, E = { x: W, y: H }
    const T = center(anchorP, anchorI)
    const C = { x: 2*T.x - 0.5*(S.x + E.x), y: 2*T.y - 0.5*(S.y + E.y) }
    const nx = (E.y - S.y), ny = -(E.x - S.x)
    const mag = Math.hypot(nx, ny) || 1
    C.x += (nx/mag) * (bend ?? 0) * 60
    C.y += (ny/mag) * (bend ?? 0) * 60
    return `M ${S.x},${S.y} Q ${C.x},${C.y} ${E.x},${E.y}`
  }, [anchorP, anchorI, bend])

  return (
    <svg viewBox={`0 0 ${W+200} ${H+40}`} width="100%" role="img" aria-label="4 by 4 probability by impact matrix">
      <g transform="translate(0,0)">
        <rect x={-20} y={-30} width={W+40} height={H+60} rx="16" fill="#fff" stroke="#d7dbe4"/>
        {grid.map((c, idx) => (
          <g key={idx} transform={`translate(${c.x},${c.y})`}>
            <rect width={cell} height={cell} rx="10" fill={c.fill}/>
            <text x={8} y={18} fontSize="12" fill="#fff">{`P${c.p}xI${c.i}`}</text>
            <text x={cell/2} y={cell/2+5} textAnchor="middle" fontSize="16" fontWeight={700} fill="#fff">{c.s}</text>
          </g>
        ))}
        <text x={-10} y={-8} fontSize="12" fill="#1f2937">Impact</text>
        <text x={W/2-34} y={H+24} fontSize="12" fill="#1f2937">Probability</text>
        <path d={appetitePath} fill="none" stroke="#ffffff" strokeWidth="6" strokeDasharray="14 10"/>
        <path d={appetitePath} fill="none" stroke="#374151" strokeWidth="3" strokeDasharray="14 10" strokeLinecap="round"/>
        <circle r="4.5" cx="0" cy="0" fill="#374151" stroke="#fff" strokeWidth="1.5"/>
        <circle r="4.5" cx={W} cy={H} fill="#374151" stroke="#fff" strokeWidth="1.5"/>
      </g>
      {showLegend && (
        <g transform={`translate(${W+24}, ${H/2-70})`}>
          <rect width="160" height="110" rx="10" fill="#fff" stroke="#d7dbe4"/>
          <rect x="14" y="12" width="24" height="16" fill="#10b981"/><text x="46" y="24" fontSize="12">Green &lt; 4</text>
          <rect x="14" y="40" width="24" height="16" fill="#eab308"/><text x="46" y="52" fontSize="12">Amber 4–11</text>
          <rect x="14" y="68" width="24" height="16" fill="#ef4444"/><text x="46" y="80" fontSize="12">Red &gt; 11</text>
          <text x="14" y="100" fontSize="11" fill="#64748b">Score bands</text>
        </g>
      )}
    </svg>
  )
}
