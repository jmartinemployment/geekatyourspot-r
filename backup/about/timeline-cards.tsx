import Image from "next/image";
import about from "@/data/about.json";

interface TimelineRowProps {
  cards: typeof about.timeline;
}

export function TimelineRow({ cards }: TimelineRowProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-3 gap-3 py-3">
      {cards.map((card) => (
        <div
          key={card.year}
          className="rounded-lg overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.2)] bg-white"
        >
          <div className="bg-[#091740] flex flex-col items-center justify-center p-2 min-h-[60px] md:min-h-[80px]">
            <Image
              src={card.image}
              width={64}
              height={64}
              alt={card.label}
              className="max-w-[50px] md:max-w-[64px] h-auto object-contain"
              loading="lazy"
              unoptimized={card.image.startsWith("http")}
            />
            <span className="text-[#DD8343] text-[0.65rem] md:text-xs mt-1 text-center leading-tight">
              {card.label}
            </span>
          </div>
          <div className="p-2 md:p-3 text-center">
            <p className="text-[#091740] font-bold text-base md:text-xl mb-1">{card.year}</p>
            <p className="text-black/70 text-[0.7rem] md:text-sm leading-snug">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
