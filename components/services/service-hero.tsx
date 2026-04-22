import Image from "next/image";

interface ServiceHeroProps {
  headline: string;
  tagline: string;
  image: string;
  imageBg: string;
  imageAlt: string;
}

export default function ServiceHero({
  headline,
  tagline,
  image,
  imageBg,
  imageAlt,
}: ServiceHeroProps): React.JSX.Element {
  return (
    <section className="home-hero w-full min-h-screen bg-[#023059]">
      <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
        <div>
          <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            {headline}
          </h1>
          <p className="text-white shadow-text text-xl pt-5">{tagline}</p>
          <a
            href="/contact"
            className="inline-block mt-8 px-8 py-4 bg-white text-[#023059] font-bold text-lg rounded-lg hover:bg-white/90 transition-colors"
          >
            Book a Free Strategy Call
          </a>
        </div>
        <div
          className="flex items-center justify-center min-h-screen"
          style={{ backgroundColor: imageBg }}
        >
          <Image
            src={image}
            width={450}
            height={450}
            quality={100}
            alt={imageAlt}
            className="h-auto w-auto max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
