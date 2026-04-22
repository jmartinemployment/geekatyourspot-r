import about from "@/data/about.json";

export default function MissionSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#023059] py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-white font-[var(--font-sora)] font-black text-4xl md:text-5xl leading-tight mb-12">
          {about.mission.heading}
        </h2>
        <div className="space-y-6">
          {about.mission.paragraphs.map((para, i) => (
            <p key={i} className="text-white/80 text-xl leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
