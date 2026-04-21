import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function AboutTeaserSection() {
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
      <section className="md:block w-full bg-[#024059] min-h-screen">
        <div className="grid grid-cols-2 content-center gap-4 items-center">
          <div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/action-figure.jpeg"
                preload={true}
                width={450}
                height={562}
                quality={100}
                alt="Geek At Your Spot - AI-created action figure of founder me, representing my hands-on, personalized approach to helping small businesses succeed with technology."
                className="h-auto"
              />
            </div>
          </div>
          <div className="flex items-center min-h-screen px-5">
            <div>
              <h2 className="text-5xl font-bold text-white shadow-text">
                <span className="shadow-text text-5xl text-center font-bold text-[#8C2703] mb-2">
                  From Timex Sinclair to AI
                  <br />
                </span>
                Coding Through Every Revolution
              </h2>
              <p className="text-white text-2xl font-bold shadow-text mt-4 mb-4">
                Three decades of staying ahead of technology curves. From the
                earliest home computers to today&apos;s AI revolution, I&apos;ve
                been building solutions that help businesses thrive. &nbsp;Now I
                bring that experience to small businesses ready to compete with
                the big players.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-4xl bg-[#8C2703] font-bold text-primary-foreground hover:bg-primary/80 h-9 px-3 text-sm shadow-text"
              >
                Learn My Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
