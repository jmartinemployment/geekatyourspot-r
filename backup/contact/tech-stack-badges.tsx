const STACK = [
  { name: 'Claude API', note: 'AI reasoning', color: 'text-orange-400 border-orange-400/30 bg-orange-400/10' },
  { name: 'n8n', note: 'Automation', color: 'text-red-400 border-red-400/30 bg-red-400/10' },
  { name: 'Make.com', note: 'Workflows', color: 'text-purple-400 border-purple-400/30 bg-purple-400/10' },
  { name: 'Next.js', note: 'This site', color: 'text-white border-white/20 bg-white/5' },
  { name: 'Supabase', note: 'Database', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
  { name: 'Resend', note: 'Email delivery', color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
  { name: 'MCP', note: 'Agent protocol', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10' },
]

export default function TechStackBadges() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
        The stack we build with
      </p>
      <div className="flex flex-wrap gap-2">
        {STACK.map(({ name, note, color }) => (
          <div key={name} className={`rounded-lg border px-3 py-1.5 ${color}`}>
            <p className="text-xs font-bold">{name}</p>
            <p className="text-[0.6rem] opacity-70">{note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
