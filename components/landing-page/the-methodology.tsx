import { MethogologyRevealOnScroll } from "./methodology-reveal-on-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  faCircleCheck,
  fa1,
  fa2,
  fa3,
  fa4,
} from "@fortawesome/free-solid-svg-icons";

export default function TheMethodologySection() {
  return (
    <>
      {/* <section>
    
    
      </section> */}
      <section className="w-full bg-[#023059] min-h-screen overflow-hidden">
        <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
          <div className="flex items-center justify-center w-full">
            <div className="">
              <h2 className="text-white text-[5.5rem]  leading-[0.95] font-black font-[var(--font-sora)] shadow-text pb-5">
                The
                <br />
                <span className="text-[5.5rem]  leading-[0.95] font-black font-[var(--font-sora)] shadow-text pb-5 text-[#8C2703]">
                  Methodology
                </span>
              </h2>
              <p className="text-white text-xl font-normal shadow-text">
                A streamlined four-phase approach to embedding AI into your
                business—fast, secure, and built to scale.
              </p>
              <ul className="text-white text-xl font-normal shadow-text py-2">
                <li className="inline-block">
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="w-4 h-4  text-[#8C2703] inline"
                    />
                    &nbsp;&nbsp;Seamless Integration
                  </span>
                </li>
                <li>
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="w-4 h-4  text-[#8C2703] inline"
                    />
                    &nbsp;&nbsp;Zero Downtime
                  </span>
                </li>
                <li>
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="w-4 h-4  text-[#8C2703] inline"
                    />
                    &nbsp;&nbsp;Continuous Scaling
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-center flex-col">
            <MethogologyRevealOnScroll direction="up" delay={0}>
              <Card className="w-100 bg-[#023059]">
                <CardHeader className="space-y-0 gap-0 my-0 py-0">
                  <CardTitle className="">
                    <div className="grid grid-cols-[20%_80%]">
                      <FontAwesomeIcon
                        icon={fa1}
                        className="w-16 h-16  text-[#8C2703] inline"
                      />
                      <div>
                        <h3 className="text-white font-bold text-xl shadow-text pt-1">
                          Operations & Automation
                        </h3>
                        <span className="text-white text-medium shadow-text">
                          Streamline workflows by automating repetitive tasks
                          like data entry, invoicing, and document management.
                          Optimize supply chains, predict issues before they
                          happen, and keep your business running efficiently.
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </MethogologyRevealOnScroll>
            <MethogologyRevealOnScroll  direction="up" delay={0.15}>
              <Card className="w-100 bg-[#023059]">
                <CardHeader className="space-y-0 gap-0 my-0 py-0">
                  <CardTitle className="">
                    <div className="grid grid-cols-[20%_80%]">
                      <FontAwesomeIcon
                        icon={fa2}
                        className="w-16 h-16  text-[#8C2703] inline"
                      />
                      <div>
                        <h3 className="text-white font-bold text-xl shadow-text pt-1">
                          Operations & Automation
                        </h3>
                        <span className="text-white text-medium shadow-text">
                          Streamline workflows by automating repetitive tasks
                          like data entry, invoicing, and document management.
                          Optimize supply chains, predict issues before they
                          happen, and keep your business running efficiently.
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </MethogologyRevealOnScroll>
            <MethogologyRevealOnScroll  direction="up" delay={0.3}>
              <Card className="w-100 bg-[#023059]">
                <CardHeader className="space-y-0 gap-0 my-0 py-0">
                  <CardTitle className="">
                    <div className="grid grid-cols-[20%_80%]">
                      <FontAwesomeIcon
                        icon={fa3}
                        className="w-16 h-16  text-[#8C2703] inline"
                      />
                      <div>
                        <h3 className="text-white font-bold text-xl shadow-text pt-1">
                          Operations & Automation
                        </h3>
                        <span className="text-white text-medium shadow-text">
                          Streamline workflows by automating repetitive tasks
                          like data entry, invoicing, and document management.
                          Optimize supply chains, predict issues before they
                          happen, and keep your business running efficiently.
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </MethogologyRevealOnScroll>
            <MethogologyRevealOnScroll  direction="up" delay={0.45}>
              <Card className="w-100 bg-[#023059]">
                <CardHeader className="space-y-0 gap-0 my-0 py-0">
                  <CardTitle className="">
                    <div className="grid grid-cols-[20%_80%]">
                      <FontAwesomeIcon
                        icon={fa4}
                        className="w-16 h-16  text-[#8C2703] inline"
                      />
                      <div>
                        <h3 className="text-white font-bold text-xl shadow-text pt-1">
                          Operations & Automation
                        </h3>
                        <span className="text-white text-medium shadow-text">
                          Streamline workflows by automating repetitive tasks
                          like data entry, invoicing, and document management.
                          Optimize supply chains, predict issues before they
                          happen, and keep your business running efficiently.
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            </MethogologyRevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

{
  /* <section className="w-full bg-[#024059] min-h-screen h-screen">
        <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen">
            
            <div className="flex items-center justify-center">
              <h2 className="text-white text-7xl font-extrabold font-[var(--font-sora)] shadow-text">
                The
                <br />
                <span className="shadow-text text-7xl font-extrabold font-[var(--font-sora)] text-[#8C2703] mb-2">
                  Methodology
                </span>
              </h2>
              <p>
                A streamlined four-phase approach to embedding AI into your
                business—fast, secure, and built to scale.
              </p>
              <ul>
                <li>
                  <p>Seamless Integration</p>
                </li>
                <li>
                  <p>Zero Downtime</p>
                </li>
                <li>
                  <p>Continuous Scaling</p>
                </li>
              </ul>
            
          </div>
                  </div>
      </section> */
}
{
  /* <p className="text-slate-300 text-lg mt-6 max-w-md mx-auto">
                A streamlined four-phase approach to embedding AI into your
                business—fast, secure, and built to scale.
              </p>
              <ul>
                <li>
                  <p>Seamless Integration</p>
                </li>
                <li>
                  <p>Zero Downtime</p>
                </li>
                <li>
                  <p>Continuous Scaling</p>
                </li>
              </ul>
            </MethogologyRevealOnScroll>
          </div>
          <div className="w-full flex justify-center mt-8 lg:mt-0"> */
}
{
  /* <div>
              <div className="grid grid-cols-2 gap-4 w-full mx-auto">
                <div className="col-span-2 p-5 md:p-8 lg:p-10 bg-[#03020d] border border-white/10 flex flex-col justify-center rounded-sm shadow-box">
                  <p className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-1 md:mb-2">
                    40%
                  </p>
                  <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Cost Reduction
                  </p>
                </div>
                <div className="p-4 md:p-6 lg:p-8 bg-[#03020d] border border-white/10 flex flex-col justify-center rounded-sm shadow-box">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2">
                    3x
                  </p>
                  <p className="text-[8px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Productivity
                  </p>
                </div>
                <div className="p-4 md:p-6 lg:p-8 bg-[#8C2703] flex flex-col justify-center text-white rounded-sm shadow-box">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-black mb-1 md:mb-2">
                    24/7
                  </p>
                  <p className="text-[8px] md:text-xs font-bold text-orange-200 uppercase tracking-widest">
                    Automated
                  </p>
                </div>
              </div>
            </div> */
}
