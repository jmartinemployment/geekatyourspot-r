const caseStudies = [
  {
    industry: "Professional Services",
    problem:
      "Owner spending 12+ hours per week on client intake, proposal writing, and follow-up emails.",
    solution:
      "AI-powered intake form with automated proposal generation and follow-up sequence.",
    result: "Time reclaimed per week",
    metric: "11 hrs",
    detail: "Intake to signed proposal now runs without owner involvement.",
  },
  {
    industry: "Healthcare Practice",
    problem:
      "Front desk handling 40–60 repetitive patient inquiry calls per day — scheduling, directions, insurance questions.",
    solution:
      "AI chatbot deployed on website and Google Business Profile handling tier-1 inquiries 24/7.",
    result: "Call volume reduction",
    metric: "68%",
    detail: "Staff redirected to patient care and in-office coordination.",
  },
  {
    industry: "Real Estate Agency",
    problem:
      "Leads going cold — agents not following up within 24 hours due to volume.",
    solution:
      "Automated lead qualification and nurture sequence triggered within 90 seconds of inquiry.",
    result: "Lead-to-appointment rate",
    metric: "3.2×",
    detail: "No leads fall through the cracks regardless of agent availability.",
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
          <h2 className="text-white font-(--font-sora) font-black text-4xl md:text-5xl leading-tight mb-4">
            What Gets Measured
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            Every engagement starts with a baseline and ends with a number. These are outcomes from
            recent South Florida clients across three of our most common service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.industry}
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
                <span className="text-white font-black text-4xl font-(--font-sora) block mb-2">
                  {cs.metric}
                </span>
                <p className="text-white/50 text-sm leading-snug">{cs.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 text-base mb-4">
            Want to see what this looks like for your industry?
          </p>
          <a
            href="#scheduler"
            className="inline-block bg-white text-[#0A080D] font-bold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
