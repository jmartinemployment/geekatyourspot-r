import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Typewriter from "./typewriter";
export default function HeroSection() {
  return (
    <>
      <section className="min-h-screen bg-[rgb(2,48,89)] lg:hidden">
        <div className="container min-h-screen">
          <div className="grid grid-cols-1 min-h-screen place-items-center">
            <div className="col-span-full">
              <h1 className="text-white text-[12vw] sm:text-6xl md:text-7xl leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
                Redefine Your Business
                <br />
                <Typewriter
                  words={["Efficiency", "Automation", "Revenue", "Growth"]}
                />
              </h1>
              <p className="text-white shadow-text text-lg pt-3">
                Design, build, and deploy AI systems. Streamline your workflows,
                reduce errors, and scale without the headcount.
              </p>
              <Link
                href="#consultationAppointmentxs"
                className="btn btn-primary w-fit">
                Get Your Free AI Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#023059] hidden lg:block">
        <div className="container min-h-screen">
          <div className="grid grid-cols-2 content-center gap-4 place-items-center min-h-screen">
            <div>
              <h1 className="text-white text-[12vw] lg:text-7xl xl:text-[6.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
                Redefine Your Business
              </h1>
              <br />
              <Typewriter
                words={["Efficiency", "Automation", "Revenue", "Growth"]}
              />

              <p className="text-white shadow-text text-xl pt-5">
                Design, build, and deploy AI systems. Streamline your workflows,
                reduce errors, and scale without the headcount.
              </p>
              <Link
                href="#consultationAppointmentlg"
                className="btn btn-primary w-fit lg-block 2xl:hidden"
              >
                Get Your Free AI Assessment
              </Link>
              <Link
                href="#consultationAppointment2xl"
                className="btn btn-primary w-fit hidden 2xl:block"
              >
                Get Your Free AI Assessment
              </Link>
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
        </div>
      </section>
    </>
  );
}
