import Image from "next/image";
import Link from "next/link";
import about from "@/data/about.json";

export default function AboutHeroSection(): React.JSX.Element {
  return (
    <section className="home-hero w-full min-h-screen bg-[#023059]">
      <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
        <div>
          <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            {about.hero.title}
          </h1>
          <p className="text-white shadow-text text-xl pt-5">{about.hero.subtitle}</p>
          <Link
            href="/contact"
            className="inline-block mt-8 px-8 py-4 bg-white text-[#023059] font-bold text-lg rounded-lg hover:bg-white/90 transition-colors"
          >
            Book a Free Strategy Call
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-screen bg-[#0A080D]">
          <Image
            src={about.hero.image}
            width={450}
            height={562}
            quality={100}
            priority
            alt="Jeff Martin, AI consultant and founder of Geek at Your Spot, Delray Beach Florida"
            className="h-auto w-auto"
          />
        </div>
      </div>
    </section>
  );
}
