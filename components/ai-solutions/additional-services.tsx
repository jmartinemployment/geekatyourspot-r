import Image from "next/image";
import { Footprints } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
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

export default function AdditionalServicesSection() {
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
      value: "AI Process Automation",
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
      value: "AI Data Analytics",
      label:
        "Turn your data into actionable insights with advanced analytics and real-time business intelligence.",
      icon: faChartLine,
      color: "bg-[#ff9800]",
    },
    {
      id: 5,
      value: "AI Strategy Consulting",
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
    <section className="w-full grid grid-cols-12 gap-4 bg-white min-h-screen h-auto justify-center overflow-hidden">
      <div className="col-span-12 w-full mx-auto text-center px-5 my-5">
        <h2 className="text-black text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text text-center">
          Supporting Systems
          <br />
          <span className="text-zinc-700">Infrastructure</span>
        </h2>
        <p className="text-black text-xl text-center shadow-text">
          AI is only as powerful as the systems behind it. We design, build, and
          integrate the core technologies your business depends on—ensuring
          everything works together to support automation, scalability, and
          long-term growth.
        </p>
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          Digital Presence
        </h3>
        <p className="text-black shadow-text text-xl">
          Is the total, accessible footprint of a brand or individual online,
          encompassing websites, social media profiles, reviews, and search
          listings. It is critical for visibility and reputation, as over 97% of
          consumers search online for local businesses, making it essential to
          have a consistent, professional, and mobile-friendly image across all
          channels
        </p>
        <div className="container">
          <ul className="list-disc text-lg text-black shadow-text pt-1">
            <li>
              Mobile-responsive design that works perfectly on all devices
            </li>
            <li>
              Fast loading speeds that improve user experience and SEO rankings
            </li>
            <li>
              Conversion-optimized layouts that guide visitors to take action
            </li>
            <li>Easy content management with WordPress or custom CMS</li>
            <li>Secure hosting and SSL certificates included</li>
          </ul>
        </div>
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#0A080D] justify-center items-center">
        <Image
          src="/images/footprints.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="Digital footprint"
          className="h-auto w-auto"
        />
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#023059] justify-center items-center">
        <Image
          src="/images/footprints.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="Dig"
          className="h-auto w-auto"
        />
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          Growth & Revenue Systems
        </h3>
        <p className="text-black shadow-text text-xl">
          Often referred to as Revenue Growth Management (RGM) or a Revenue
          Operating System is a data-driven, strategic framework used by
          companies to maximize profitable growth. Instead of relying on
          guesswork, these systems use advanced analytics, AI, and integrated
          data to optimize pricing, promotions, product mix, and trade spend
          across all sales channels.
        </p>
        <div className="container">
          <ul className="list-disc text-lg text-black shadow-text pt-1">
            <li>
              Pricing Strategy: Determining the optimal price points that
              balance brand equity, market share, and margin goals.
            </li>
            <li>
              Price Pack Architecture (PPA): Structuring product sizes, formats,
              and packaging to meet different customer needs and
              willingness-to-pay.
            </li>
            <li>
              Promotion Management: Analyzing and optimizing trade spend and
              promotional activities to ensure they generate positive ROI rather
              than just volume.
            </li>
            <li>
              Assortment Optimization: Managing the product lineup to ensure the
              right products are in the right channels to match shopper demand.
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          Infrastructure & Automation
        </h3>
        <p className="text-black shadow-text text-xl">
          Infrastructure & Automation refers to using software and tools to
          provision, configure, and manage IT resources (servers, networks,
          storage) with minimal human intervention. It replaces manual tasks
          with automated workflows, utilizing Infrastructure as Code to ensure
          consistent, scalable, and secure environments, commonly using tools
          like Terraform, Ansible, and Kubernetes.
        </p>
        <p className="text-black shadow-text text-xl">
          Historically, IT teams had to manually set up hardware and configure
          operating systems, a process that was slow and prone to human error.
          Automation replaces these manual tasks with repeatable, code-driven
          workflows, allowing teams to deploy entire environments in minutes
          rather than days.
        </p>
        <div className="container">
          <ul className="list-disc text-lg text-black shadow-text pt-1">
            <li>
              Infrastructure as Code (IaC): Terraform and AWS CloudFormation are
              used to define and provision infrastructure.
            </li>
            <li>
              Configuration Management: Ansible, Puppet, and Chef automate
              software installation and system settings.
            </li>
            <li>
              Conversion-optimized layouts that guide visitors to take action
            </li>
            <li>
              Container Orchestration: Kubernetes manages the deployment and
              scaling of containerized applications at scale.
            </li>
            <li>
              Enhanced Security: Embeds security policies and compliance checks
              directly into the automated workflows.
            </li>
            <li>
              Container Orchestration: Kubernetes manages the deployment and
              scaling of containerized applications at scale.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#733E1F] justify-center items-center">
        <Image
          src="/images/footprints.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="Digital footprint"
          className="h-auto w-auto"
        />
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#733E1F] justify-center items-center">
        <Image
          src="/images/footprints.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="Dig"
          className="h-auto w-auto"
        />
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          Security & Operations
        </h3>
        <p className="text-black shadow-text text-xl">
          (SecOps) is the integration of IT security and operations teams,
          combining tools, processes, and people to improve collaboration,
          reduce risks, and speed up incident response. It bridges the gap
          between IT operations (focused on performance/speed) and security
          (focused on protection/compliance) to prevent, detect, and respond to
          cyber threats proactively.
        </p>
        <p className="text-black shadow-text text-xl">
          Historically, these two functions were siloed: IT operations focused
          on speed and system availability, while security focused on risk
          mitigation and compliance. SecOps removes these barriers by making
          security a shared responsibility throughout the entire IT
          lifecycle.{" "}
        </p>
        <div className="container">
          <ul className="list-disc text-lg text-black shadow-text pt-1">
            <li>
              People: Skilled professionals such as security analysts, threat
              hunters, and incident responders.
            </li>
            <li>
              Process: Standardized workflows for monitoring, detecting, and
              responding to incidents, often based on frameworks like NIST.
            </li>
            <li>
              Promotion Management: Analyzing and optimizing trade spend and
              promotional activities to ensure they generate positive ROI rather
              than just volume.
            </li>
            <li>
              Technology: Specialized tools like SIEM (log management), EDR
              (endpoint protection), and SOAR (automation) to identify and
              neutralize threats.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
