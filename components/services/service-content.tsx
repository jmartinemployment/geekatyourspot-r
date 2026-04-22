interface Bullet {
  heading: string;
  body: string;
}

interface ServiceContentProps {
  name: string;
  intro: string;
  bullets: Bullet[];
}

export default function ServiceContent({
  name,
  intro,
  bullets,
}: ServiceContentProps): React.JSX.Element {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-black text-4xl md:text-5xl font-black font-[var(--font-sora)] leading-tight mb-8">
          What is {name}?
        </h2>
        <p className="text-black text-xl mb-12 leading-relaxed">{intro}</p>
        <ul className="space-y-8">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex gap-4">
              <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-[#023059] translate-y-3" />
              <div>
                <strong className="block text-black text-lg font-bold mb-1">
                  {bullet.heading}
                </strong>
                <p className="text-black/80 text-base leading-relaxed">{bullet.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
