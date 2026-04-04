import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faCog,
  faChartLine,
  faComments,
  faShieldAlt,
  faChess,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface BestIcon {
  id: number;
  value: string;
  label: string;
  icon: IconDefinition;
  color: string;
}

export default function CoreServicesSection() {
  const stats: BestIcon[] = [
    {
      id: 1,
      value: "AI Integration",
      label:
        "Deploy custom AI to eliminate repetitive work, sharpen decision-making, and accelerate business growth.",
      icon: faRobot,
      color: "bg-[#e91e62]",
    },
    {
      id: 2,
      value: "Process Automation",
      label:
        "Intelligent automation that simplifies workflows and cuts down on manual tasks and errors.",
      icon: faSyncAlt,
      color: "bg-[#ff5722]",
    },
    {
      id: 3,
      value: "AI Chatbots",
      label:
        "Deploy AI chatbots to handle inquiries instantly, qualify users, and capture critical details to streamline follow-ups and improve engagement.",
      icon: faComments,
      color: "bg-[#673ab7]",
    },
    {
      id: 4,
      value: "Data Analytics",
      label:
        "Turn your data into actionable insights with advanced analytics and real-time business intelligence.",
      icon: faChartLine,
      color: "bg-[#ff9800]",
    },
    {
      id: 5,
      value: "Strategy Consulting",
      label:
        "Develop and execute an AI strategy that drives measurable results and aligns with your business goals.",
      icon: faChess,
      color: "bg-[#4cb04f]",
    },
    {
      id: 6,
      value: "Security & Compliance",
      label:
        "Build and maintain AI systems that are secure, ethical, and compliant with all relevant standards.",
      icon: faShieldAlt,
      color: "bg-[#795548]",
    },
  ];

  return (
    <section className="w-full bg-[#1d3273] px-8 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container min-h-screen">
      <h2 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text text-center">
        Core Services
      </h2>
      <p className="text-white text-2xl text-center shadow-text mb-5">
        Power your growth with bespoke AI, cutting-edge automation, and
        high-impact strategic consulting.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className="bg-[#3f51b5] border-0 text-white shadow-box"
          >
            <CardHeader>
              <div
                className={`${stat.color} rounded-full shadow-box h-16 w-16 flex items-center justify-center mx-auto mb-2`}
              >
                <FontAwesomeIcon
                  icon={stat.icon}
                  className="w-8 h-8 text-white"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center">
                <h3 className=" text-white/90 text-2xl font-bold shadow-text">
                  {stat.value}
                </h3>
              </CardTitle>
              <CardDescription className="text-white shadow-text font-bold text-lg">
                {stat.label}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>

    </section>
  );
}
