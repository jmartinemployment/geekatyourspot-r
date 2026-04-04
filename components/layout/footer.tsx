"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
];

export default function Footer() {
  return (
    <>
      {/* <footer className="relative overflow-hidden border-t border-white/10 bg-zinc-950">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 lg:mb-32">

    </div>
</footer> */}

      <footer className="w-full bg-[#03020d] h-screen flex flex-col justify-center px-5">
        <div className="grid grid-cols-12 content-center gap-4 px-5 container">
          <div className="col-span-2 ">
            <Link href="/" className="flex items-center py-2">
              <Image
                src="/images/GeekAtYourSpotWhite.svg"
                alt="Geek @ Your Spot"
                width={116}
                height={48}
                priority
              />
            </Link>
            <p className="text-white text-medium shadow-text-white">
              We design and build AI implementation and automation architectures
              for brands that refuse to settle for average.
            </p>
            <div className="flex items-center gap-4">
              <span>
                <a
                  target="_blank"
                  className="shadow-box-white inline-block w-8 h-8 items-center justify-center] transition-all duration-300 cursor-pointer group"
                  href="https://www.facebook.com/GeekAtYourSpot/"
                >
                  <svg
                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                    fill="#ff0000"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </span>
              <span>
                <a
                  target="_blank"
                  className="inline-block w-8 h-8 items-center justify-center transition-all duration-300 cursor-pointer group"
                  href="https://www.linkedin.com/company/geekatyourspot"
                >
                  <svg
                    className="w-7 h-8 group-hover:scale-110 transition-transform"
                    fill="#ff0000"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div className="col-span-2">&nbsp;</div>
          <div className="col-span-3">
            <h2 className="text-white text-medium shadow-text-white font-bold">Services</h2>
            <ul>
              <li className="py-1">
                <Link
                  href="/ai-implementation"
                  className="text-white text-medium shadow-text-white"
                >
                  AI Implementation
                </Link>
              </li>
              <li className="py-1">
                <Link
                  href="/process-automation"
                  className="text-white text-medium shadow-text-white"
                >
                  Process Automation
                </Link>
              </li>
              <li className="py-1">
                <Link href="/data-analytics" className="text-white text-medium shadow-text-white">
                  Data Analytics
                </Link>
              </li>
              <li className="py-1">
                <Link href="/ai-consulting" className="text-white text-medium shadow-text-white">
                  AI Consulting
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-3">
            <h2 className="text-white text-medium shadow-text-white font-bold">Company</h2>
            <ul>
              <li className="py-1">
                <Link href="/about" className="text-white text-medium shadow-text-white">
                  About
                </Link>
              </li>
              <li className="py-1">
                <Link href="/blog" className="text-white text-medium shadow-text-white">
                  Blog
                </Link>
              </li>
              <li className="py-1">
                <Link href="/data-analytics" className="text-white text-medium shadow-text-white">
                  Contact
                </Link>
              </li>
              <li className="py-1">
                <Link href="/ai-consulting" className="text-white text-medium shadow-text-white">
                  Our Process
                </Link>
              </li>
              <li className="py-1">
                <Link href="/ai-consulting" className="text-white text-medium shadow-text-white">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h2 className="text-white text-medium shadow-text-white font-bold">Contact</h2>
            <ul>
              <li className="py-1">
                <a
                  href="mailto:info@geekatyourspot.com"
                  className="text-white text-medium shadow-text-white"
                >
                  <span className="text-white text-medium shadow-text-white font-bold">EMail</span>
                  <br />
                  info@geekatyourspot.com
                </a>
              </li>
              <li className="py-2">
                <a href="tel:+15615263512" className="text-white text-medium shadow-text-white">
                  <span className="font-bold text-white text-medium shadow-text-white">Call Us</span>
                  <br />
                  (561) 526-3512
                </a>
              </li>
              <li className="py-2">
                <a
                  href="https://maps.app.goo.gl/YourLocationLink"
                  className="font-medium text-white text-medium shadow-text-white"
                >
                  <span className="font-bold text-white text-medium shadow-text-white">Headquarters</span>
                  <br />
                  Delray Beach, Fl
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-12">
            <div className="border-t border-white/5 pt-12 flex flex-col items-center justify-center overflow-hidden relative">
              <div className="flex flex-col md:flex-row w-full justify-between items-center gap-6 text-xs md:text-sm text-slate-500 font-medium uppercase tracking-widest px-4 text-center md:text-left">
                <p className="inline-block text-center text-xs">© 2026 Geek at Your Spot.</p><p className="inline-block text-center text-xs" > All rights reserved.</p><p className="inline-block text-center text-xs"><a className="hover:text-white transition-colors" href="/privacy-policy">Privacy Policy</a></p><p className="inline-block text-center text-xs" ><a className="hover:text-white transition-colors" href="/terms-and-conditions">Terms of Service</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// <section className="home-hero d-none md:block w-full h-screen bg-[#03020d] min-h-screen">
//     <div className="grid grid-cols-2 content-center gap-4 items-center h-screen ps-5">
//       <div className="pe-70">
//         <h1 className="text-white text-7xl font-bold font-[var(--font-sora)] shadow-text-purple">
//           Reimagine Your
//           <br />
//           <span className="text-[#6a4ed6] shadow-text-white">Business</span>
//         </h1>
//         <br />
//         <Typewriter
//           words={["Efficiency", "Automation", "Revenue", "Growth"]}
//         />

//         <p className="text-white shadow-text-purple text-xl py-5">
//           Design, build, and deploy AI systems. Streamline your workflows,
//           reduce errors, and scale without the headcount.
//         </p>
//         <HeroDialog />
//       </div>
//       <div className="flex items-center h-screen">
//         <Image
//           src="/images/geek@yourSpot-1.jpeg"
//           preload={true}
//           width={1070}
//           height={601}
//           quality={100}
//           alt="Geek At Your Spot - AI-powered business transformation for small businesses"
//         />
//       </div>
//     </div>
//   </section>
