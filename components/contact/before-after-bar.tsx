'use client'

import { useEffect, useRef, useState } from 'react'

const METRICS = [
  { label: 'Hours on manual data entry', before: 12, after: 1, unit: 'hrs/wk' },
  { label: 'Lead response time', before: 24, after: 2, unit: 'hrs avg' },
  { label: 'Follow-up conversion rate', before: 8, after: 27, unit: '%' },
]

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth((value / max) * 100) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, max])

  return (
    <div ref={ref} className="h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export default function BeforeAfterBar() {
  const max = Math.max(...METRICS.flatMap(m => [m.before, m.after]))
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
        Typical results after 90 days
      </p>
      <div className="space-y-5">
        {METRICS.map(({ label, before, after, unit }) => (
          <div key={label}>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>{label}</span>
              <span className="text-orange-400 font-bold">{before} → {after} {unit}</span>
            </div>
            <div className="space-y-1">
              <Bar value={before} max={max} color="bg-slate-600" />
              <Bar value={after} max={max} color="bg-orange-500" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.6rem] text-slate-600">
        Based on client averages. Results vary by business.
      </p>
    </div>
  )
}
