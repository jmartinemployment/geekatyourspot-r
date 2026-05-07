import Image from "next/image";

import Link from "next/link";
export default function CaseStudiesHeroSection(): React.JSX.Element {
  return (
    <section className="home-hero w-full min-h-screen bg-[#023059]">
      <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
        <div>
          <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            Artificial Intelligence<br />
             <span className="text-[#8C2703]">Case Studies</span>
          </h1>
          <p className="text-white shadow-text text-xl pt-5">
            How Organizations Turn AI into Measurable ROI
          </p>
          <Link
            href="#consultationAppointmentlg"
            className="btn btn-primary w-fit lg-block 2xl:hidden"
          >
            Book a Free Strategy Call
          </Link>
          <Link
            href="#consultationAppointment2xl"
            className="btn btn-primary w-fit hidden 2xl:block"
          >
            Book a Free Strategy Call
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-screen">
              <Image
                src="/images/robot-cartoon.jpg"
                preload={true}
                width={450}
                height={562}
                quality={100}
                alt="Geek At Your Spot - AI-created action robot cartoon to introduce Artificial Intelligence Case Studies.."
                className="h-auto w-auto"
              />
        </div>
      </div>
    </section>
  );
}
