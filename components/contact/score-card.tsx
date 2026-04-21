"use client";

import { motion } from "motion/react";

interface Recommendation {
  title: string;
  desc: string;
}

interface ScoreData {
  score: number;
  recommendations: Recommendation[];
}

export default function ScoreCard({ data }: { data: ScoreData }) {
  // SVG Circle calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.score / 100) * circumference;

  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold font-[var(--font-sora)] mb-6 text-center">
          Automation Opportunity Score
        </h3>

        {/* Circular Progress */}
        <div className="relative w-40 h-40 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-zinc-800"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[#8C2703]"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-black">{data.score}</span>
            <span className="text-xs text-zinc-400">/ 100</span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="w-full space-y-4">
          <h4 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-2">
            Top Recommendations
          </h4>
          {data.recommendations?.map((rec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (i * 0.2) }}
              className="bg-black/20 p-4 rounded-lg border border-white/5"
            >
              <h5 className="font-bold text-[#8C2703] mb-1">{rec.title}</h5>
              <p className="text-sm text-zinc-300 leading-relaxed">{rec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
