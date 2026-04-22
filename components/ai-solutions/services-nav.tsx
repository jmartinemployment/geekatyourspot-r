import Link from "next/link";
import services from "@/data/services.json";

const accentMap: Record<string, string> = {
  "ai-integration": "#e91e62",
  "process-automation": "#ff5722",
  "ai-chatbots": "#673ab7",
  "ai-content-marketing": "#ff9800",
  "ai-strategy-consulting": "#4cb04f",
  "security-compliance": "#795548",
};

export default function ServicesNav(): React.JSX.Element {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-black text-4xl md:text-5xl font-black font-[var(--font-sora)] leading-tight mb-4 text-center">
          Our Services
        </h2>
        <p className="text-black/70 text-xl text-center mb-14 max-w-2xl mx-auto">
          Six dedicated practice areas — each with deep expertise, dedicated content, and a clear path to implementation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block rounded-2xl border border-black/10 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mb-4"
                style={{ backgroundColor: accentMap[service.slug] ?? "#023059" }}
              />
              <h3 className="text-black font-bold text-xl mb-2 group-hover:text-[#023059] transition-colors">
                {service.name}
              </h3>
              <p className="text-black/60 text-sm leading-relaxed line-clamp-3">
                {service.intro}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#023059] group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
