import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroDialog } from "@/app/home/HeroDialog";

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
      <section className="home-hero d-none md:block w-full h-screen bg-[#03020d] min-h-screen">
        <div className="grid grid-cols-2 content-center gap-4 items-center h-screen px-5">
          <div>
            <h1 className="text-white">
              {" "}
              Your competitors are using AI.
              <br />
              <span className="text-[#6a4ed6]">Are you?</span>
            </h1>
            <p className="text-white py-4">
              While you&apos;re still doing things the old way, your competitors
              are automating workflows, generating leads 24/7, and making
              data-driven decisions. Small businesses that embrace AI now will
              dominate their markets. Those that don&apos;t will struggle to
              keep up.
            </p>
            <HeroDialog />
          </div>
          <div className="flex items-center h-screen">
            <Image
              src="/images/geek@yourSpot-1.jpeg"
              preload={true}
              width={1070}
              height={601}
              quality={100}
              alt="Geek At Your Spot - AI-powered business transformation for small businesses"
            />
          </div>
        </div>
      </section>
    </>
  );
}
