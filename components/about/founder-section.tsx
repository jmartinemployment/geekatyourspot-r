import Image from "next/image";
import about from "@/data/about.json";

export default function FounderSection(): React.JSX.Element {
  const { founder } = about;
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-black font-[var(--font-sora)] font-black text-4xl md:text-5xl leading-tight mb-12">
          Thirty Years of Enterprise Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={founder.photo}
              width={160}
              height={160}
              alt={`${founder.name}, ${founder.role} of Geek at Your Spot`}
              className="rounded-full object-cover w-40 h-40"
            />
            <div className="text-center">
              <p className="text-black font-bold text-lg">{founder.name}</p>
              <p className="text-black/50 text-sm">{founder.role}</p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-5">
            {founder.bio.map((para, i) => (
              <p key={i} className="text-black/80 text-lg leading-relaxed">
                {para}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {founder.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#023059] text-white text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
