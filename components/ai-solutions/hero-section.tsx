import Image from "next/image";
export default function HeroSection() {
  return (
    <>
      {/* <section className="home-hero w-full block md:hidden px-5">
        <div className="w-full bg-[#03020d] min-h-full">
          <h1 className="hero-headline">
            Your competitors are using AI.
            <br />
            <span className="hero-accent block">Are you?</span>
          </h1>
          <Image
            width="560"
            height="286"
            className="max-w-full h-auto mx-auto px-0 text-center"
            src="/images/geek@yourSpot-1.jpeg"
            alt="AI-powered business transformation - Geek At Your Spot helps small businesses compete with intelligent automation"
          />
          <p className="hero-subtext mt-4">
            While you&apos;re still doing things the old way, your competitors
            are automating workflows, generating leads 24/7, and making
            data-driven decisions. Small businesses that embrace AI now will
            dominate their markets. Those that don&apos;t will struggle to keep
            up.
          </p>
          <Button id="home-hero-cta-mobile" className="btn-cta text-lg mt-4">
            Get Your Free AI Assessment
          </Button>
        </div>
      </section> */}
      <section className="w-full grid grid-cols-12 gap-4 min-h-screen h-auto justify-center  bg-[#023059]">
        <div className="col-span-6 min-w-full min-h-screen justify-center flex flex-column">
          <Image
            src="/images/services.jpg"
            preload={true}
            width={1184}
            height={672}
            quality={100}
            alt="Geek At Your Spot - AI-created action figure of founder me, representing my hands-on, personalized approach to helping small businesses succeed with technology."
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Critical for performance
          />
        </div>
        <div className="col-span-6 min-w-full min-h-screen items-center flex flex-column">
          <div className="container">
            <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
              Build a Business That Runs
              <span className="text-[#8C2703]"> Without </span>You
            </h1>
            <br />
            <p className="text-white shadow-text text-xl">
              Architect AI systems that create, market, sell, and support, so
              your business operates 24/7 across content, customer experience,
              and internal operations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
