export default function CloneYourselfSection() {
  return (
    <>
      {/* <section>
    
    
      </section> */}
      <section className="w-full bg-[#024059] min-h-screen">
        <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container overflow-hidden">
          <div>
            <h2 className="text-white text-[5.5rem]  leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
              Clone Yourself
              <br />
              <span className="text-[#8C2703]">Work 24/7</span>
            </h2>
            <p className="text-white text-xl font-normal shadow-text py-5">
              Create a lifelike AI version of yourself that never stops.
              Designed to create content, engage customers, nurture leads, close
              opportunities. A counterpart works nonstop optimizing operations,
              HR, and finance behind the scenes across your entire business.
            </p>
          </div>
          <div className="w-full flex justify-center mt-8 lg:mt-0">
            <div>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
