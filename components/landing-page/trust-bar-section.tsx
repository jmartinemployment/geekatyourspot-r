import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendarCheck, faRocket, faBuilding, faHandshake } from "@fortawesome/free-solid-svg-icons";

interface TrustStat {
  id: number;
  value: string;
  label: string;
  icon: IconDefinition;
}

export default function TrustBarSection() {
  const stats: TrustStat[] = [
    {
      id: 1,
      value: "30+",
      label: "Years Experience",
      icon: faCalendarCheck,
    },
    {
      id: 2,
      value: "500+",
      label: "Projects Delivered",
      icon: faRocket,
    },
    {
      id: 3,
      value: "Fortune 500",
      label: "to Main Street",
      icon: faBuilding,
    },
    {
      id: 4,
      value: "100%",
      label: "Client Focused",
      icon: faHandshake,
    },
  ];
  return (
    <>
      {/* <section className="home-hero d-none md:none w-full h-screen bg-white min-h-screen">
        <div className="grid grid-cols-4 content-center gap-4 items-center h-screen px-5">
            <h2>Trust Bar</h2>
            <ul>
                {stats.map((stat: TrustStat) => (
                <div key={stat.id}>
                    <i className={stat.icon + ' stat-icon'}></i>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                </div>
             ))}
            </ul>
        </div>
    </section> */}

      <section className="d-none md:block w-full h-screen bg-white min-h-screen">
        <div className="grid grid-cols-4 content-center gap-4 items-center h-screen px-5">
          {stats.map((stat: TrustStat) => {
            return (
                <div key={stat.id} className="flex flex-col items-center text-center text-[#6a4ed6]">
                    <FontAwesomeIcon icon={stat.icon} className="w-16 h-16" />
                    <div className="">
                        <h2 className="text-4xl font-bold text-black">{stat.value}</h2>
                    </div>
                    <div className="stat-label text-2xl font-bold text-gray-600">{stat.label}</div>
                </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
