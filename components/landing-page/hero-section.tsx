import Image from "next/image";
import { HeroDialog } from "@/components/landing-page/HeroDialog";
import Typewriter from "./typewriter";
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
      <section className="home-hero d-none md:block w-full min-h-screen bg-[#023059]">
        <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
          <div>
            <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
              Reimagine Your Business
            </h1>
            <br />
            <Typewriter
              words={["Efficiency", "Automation", "Revenue", "Growth"]}
            />

            <p className="text-white shadow-text text-xl pt-5">
              Design, build, and deploy AI systems. Streamline your workflows,
              reduce errors, and scale without the headcount.
            </p>
            <HeroDialog />
          </div>
          <div className="flex items-center justify-center min-h-screen">
            <Image
              src="/images/action-figure.jpeg"
              preload={true}
              width={450}
              height={562}
              quality={100}
              alt="Geek At Your Spot - AI-created action figure of founder me, representing my hands-on, personalized approach to helping small businesses succeed with technology."
              className="h-auto w-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
