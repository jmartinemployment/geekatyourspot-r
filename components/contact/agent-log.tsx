"use client";

import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AgentLog({ events }: { events: string[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  return (
    <div className="bg-black/80 rounded-lg p-6 h-full flex flex-col font-[var(--font-geist-mono)] shadow-inner border border-white/5">
      <div className="flex items-center gap-2 mb-4 text-zinc-500 border-b border-white/10 pb-4">
        <Terminal size={18} />
        <span className="text-sm uppercase tracking-widest font-bold">System Log</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        {events.map((event, i) => (
          <div 
            key={i} 
            className={`${
              event.includes("✓") 
                ? "text-emerald-400 font-semibold" 
                : event.includes("→") 
                  ? "text-[#8C2703]" 
                  : "text-zinc-400"
            }`}
          >
            {event}
          </div>
        ))}
        {events.length > 0 && events.length < 7 && (
          <div className="w-2 h-4 bg-emerald-400 animate-pulse inline-block ml-1" />
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
