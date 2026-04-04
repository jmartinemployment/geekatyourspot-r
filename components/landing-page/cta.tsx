import { TransformCtaDialog } from "@/components/landing-page/cta-dialog";

export default function CTASection() {
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
      <section className="w-full min-h-screen bg-[#8C2703]">
        <div className="grid grid-cols-1 content-center items-center h-screen">
          <div>
            <div className="flex items-center justify-center mx-auto h-screen">
              <div>
                <h2 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] text-center">
                  Ready to Reproduce
                  <br />
                  <span className="text-[#371D14]">Yourself</span>?
                </h2>

                <p className="text-white text-2xl font-bold shadow-text text-center mb-6">
                  Let&apos;s discuss how AI and smart technology can give you a
                  competitive edge.
                </p>
                <div className="flex justify-center">
                  <TransformCtaDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
