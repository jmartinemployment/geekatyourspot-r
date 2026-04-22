const placeholders = [
  {
    industry: "Professional Services",
    problem: "Owner spending 12+ hours per week on client intake, proposal writing, and follow-up emails.",
    solution: "AI-powered intake form with automated proposal generation and follow-up sequence.",
    result: "Time saved per week",
    metric: "11 hrs",
    status: "coming-soon" as const,
  },
  {
    industry: "Healthcare Practice",
    problem: "Front desk handling 40–60 repetitive patient inquiry calls per day — scheduling, directions, insurance questions.",
    solution: "AI chatbot deployed on website and Google Business Profile handling tier-1 inquiries 24/7.",
    result: "Call volume reduction",
    metric: "68%",
    status: "coming-soon" as const,
  },
  {
    industry: "Real Estate Agency",
    problem: "Leads going cold — agents not following up within 24 hours due to volume.",
    solution: "Automated lead qualification and nurture sequence triggered within 90 seconds of inquiry.",
    result: "Lead-to-appointment rate",
    metric: "3.2×",
    status: "coming-soon" as const,
  },
];

export default function CaseStudiesSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#0A080D] py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12">
          <span className="inline-block text-white/40 text-sm font-semibold tracking-widest uppercase mb-3">
            Client Results
          </span>
          <h2 className="text-white font-[var(--font-sora)] font-black text-4xl md:text-5xl leading-tight mb-4">
            Case Studies
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            Real implementations. Real numbers. Detailed case studies are being prepared — check back soon, or book a call to discuss results relevant to your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((cs, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-7 flex flex-col gap-5"
            >
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
                  {cs.industry}
                </span>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-white/40 font-semibold">Problem: </span>
                  {cs.problem}
                </p>
              </div>

              <div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-white/40 font-semibold">Solution: </span>
                  {cs.solution}
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-white/10">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
                  {cs.result}
                </p>
                <div className="flex items-end gap-3">
                  <span className="text-white font-black text-4xl font-[var(--font-sora)]">
                    {cs.metric}
                  </span>
                  <span className="text-white/30 text-sm mb-1 italic">detail coming soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-white/30 text-sm text-center">
          Have a result you would like to share?{" "}
          <a href="/contact" className="text-white/50 underline hover:text-white/80 transition-colors">
            Get in touch.
          </a>
        </p>
      </div>
    </section>
  );
}
