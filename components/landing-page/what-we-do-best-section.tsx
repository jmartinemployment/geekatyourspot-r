import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faCog,
  faChartLine,
  faCode,
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

export default function WhatWeDoBestSection() {
  const stats: BestIcon[] = [
    {
      id: 1,
      value: "AI Integration",
      label:
        "Integrate Claude, ChatGPT, and custom AI models into your workflows. Automate customer service, content generation, and data analysis.",
      icon: faRobot,
      color: "bg-[#e91e62]",
    },
    {
      id: 2,
      value: "Custom Development",
      label:
        "Tailored software built around your business processes — not the other way around.",
      icon: faCog,
      color: "bg-[#6a4ed6]",
    },
    {
      id: 3,
      value: "SEO & Analytics",
      label:
        "Data-driven SEO strategies and custom analytics dashboards. Transform raw data into actionable insights for better decisions.",
      icon: faChartLine,
      color: "bg-[#4cb04f]",
    },
    {
      id: 4,
      value: "Web Applications",
      label:
        "Professional websites and web apps using Angular, React, and WordPress. Responsive designs that work flawlessly across all devices.",
      icon: faCode,
      color: "bg-[#2194f3]",
    },
  ];

  return (
    <section className="w-full bg-[#1d3273] px-8 h-screen flex flex-col justify-center">
      <h2 className="text-center text-white text-5xl font-bold shadow-text mb-2">
        What We Do Best
      </h2>
      <p className="text-white text-2xl text-center font-bold shadow-text mb-5">
        Focused expertise in four key areas that drive small business growth
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat) => (
          <Card key={stat.id} className="bg-[#3f51b5] border-0 text-white shadow-box">
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
              <CardTitle className="text-white text-lg text-center">
                <h3 className="text-lg font-bold shadow-text">{stat.value}</h3>
              </CardTitle>
              <CardDescription className="text-white/80 shadow-text font-bold">
                {stat.label}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
