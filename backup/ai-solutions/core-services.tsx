import Image from "next/image";
import { Footprints } from "lucide-react";
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
    <section className="w-full grid grid-cols-12 gap-4 bg-white min-h-screen h-auto justify-center overflow-hidden">
      <div className="col-span-12 w-full mx-auto text-center">
        <h2 className="text-black text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text text-center">
          AI
          <br />
          <span className="text-zinc-700">Solutions</span>
        </h2>
        <p className="text-black text-2xl text-center shadow-text mb-5">
          Power your growth with bespoke AI, advanced automation, and strategic
          systems designed to scale your business.
        </p>
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          AI Integration
        </h3>
        <p className="text-black shadow-text text-xl">
          Is the process of embedding artificial intelligence tools, like
          Zapier, ChatGPT, or Claude into your organization&apos;s systems and
          workflows and applications to automate tasks, streamline
          decision-making, and unlock new capabilities.
        </p>
        <ul className="list-disc text-lg text-black shadow-text pt-1 container">
          <li>
            Time savings at scale. AI can knock out repetitive tasks in seconds.
            When you bake those automations into your workflows, you&apos;re
            multiplying your team&apos;s capacity without adding headcount.
          </li>
          <li>
            Faster, smarter decision-making can analyze large amounts of data
            faster than any human, surfacing insights that would otherwise take
            hours (or get missed altogether). Integrated AI can help your team
            move from gut decisions to data-backed action.
          </li>
          <li>
            Improved consistency and quality. People get tired, distracted, and
            busy. AI doesn&apos;t. When integrated into your workflows, AI can
            help maintain consistent tone in communications, flag errors before
            they go out, or ensure every customer gets a high-quality
            experience, no matter who&apos;s on shift.
          </li>
        </ul>
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#0A080D] justify-center items-center">
        <Image
          src="/images/ai-integration.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="Geek At Your Spot - AI-created action figure of founder me, representing my hands-on, personalized approach to helping small businesses succeed with technology."
          className="h-auto w-auto"
        />
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#023059] justify-center items-center">
        <Image
          src="/images/cog.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="Geek At Your Spot - AI-created action figure of founder me, representing my hands-on, personalized approach to helping small businesses succeed with technology."
          className="h-auto w-auto"
        />
      </div>
      <div className="col-span-6 min-w-full min-h-screen container pe-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          Process Automation
        </h3>
        <p className="text-black shadow-text text-xl">
          Process automation is the use of technology. Software, robots, or AI
          to execute recurring, rule-based business tasks and workflows without
          human intervention. It streamlines operations to increase
          productivity, lower costs, improve consistency, and reduce errors.
          Common examples include employee onboarding, invoice processing, and
          automated reporting.
        </p>
        <ul className="list-disc text-lg text-black shadow-text pt-1 container">
          <li>
            Business Process Automation (BPA): A broad approach to automating
            entire end-to-end business processes (like employee onboarding or
            procurement) across multiple departments.
          </li>
          <li>
            Robotic Process Automation (RPA): Uses software &quot;bots&quot; to
            mimic human actions, such as logging into applications,
            copying/pasting data, and filling out forms.
          </li>
          <li>
            Intelligent Process Automation (IPA): Combines RPA with Artificial
            Intelligence (AI) and machine learning to handle complex tasks
            requiring decision-making or processing unstructured data like
            emails.
          </li>
          <li>
            Workflow Automation: Focuses on automating the sequence of tasks
            (handoffs, approvals, and notifications) within a specific workflow
            to ensure work moves correctly from one stage to the next.
          </li>
          <li>
            IT Process Automation (ITPA): Specifically targets IT-related tasks
            such as system updates, data backups, and user account management.
          </li>
        </ul>
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          AI Chatbots
        </h3>
        <p className="text-black shadow-text text-xl">
          Is an AI digital assistant that uses AI to understand and respond to
          inquiries in real time, simulating human conversation with an end
          user. Unlike traditional chatbots, which rely on preprogrammed rules
          and responses, AI chatbots use natural language processing (NLP) and
          machine learning (ML) to understand and respond to user questions on
          demand.
        </p>
        <p className="text-black shadow-text text-xl">
          These capabilities let the bot engage in more natural and relevant
          conversations, learn from user input over time, and develop ways of
          handling issues more accurately and efficiently. They can answer
          questions, provide product recommendations, and facilitate
          transactions. AI chatbots can also collect information and quickly
          suggest solutions. They are even designed to react much like a human
          would.
        </p>
        <ul className="list-disc text-lg text-black shadow-text pt-1 container">
          <li>
            Transactional AI chatbots: These task-specific bots help with
            straightforward tasks like checking order status and updating
            shipping information. They streamline routine transactions, freeing
            up human service representatives for more complex cases.
          </li>
          <li>
            Conversational AI chatbots: These bots use conversational AI to
            engage with people in a natural, human-like way, which is why
            you&apos;ll commonly find them in customer service.
          </li>
          <li>
            Workflow automation AI chatbots: These bots automatically handle
            repetitive tasks within a business workflow. It interacts with users
            through conversation to gather information, make decisions, and
            trigger actions within other systems.
          </li>
          <li>
            Informational AI chatbots: As the name suggests, informational bots
            provide knowledge-based support, answering FAQs and offering
            relevant resources to help users find answers quickly. They also
            assist teams in ramping up self-service support.
          </li>
          <li>
            Adaptive learning AI chatbots: These bots continuously improve,
            adjusting responses and strategies based on the feedback they
            receive, enhancing their performance over time.
          </li>
        </ul>
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#012840] justify-center items-center">
        <Image
          src="/images/table-of-contents.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="AI-Chatbot"
          className="h-auto w-auto"
        />
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#733E1F] justify-center items-center">
        <Image
          src="/images/ai-chat-bot.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="AI-Chatbot"
          className="h-auto w-auto"
        />
      </div>
      <div className="col-span-6 min-w-full min-h-screen container pe-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          AI Content & Marketing
        </h3>
        <p className="text-black shadow-text text-xl">
          Content marketing is a strategic approach that uses educational,
          engaging, or inspiring content to attract and retain an audience.
          Unlike traditional advertising, it focuses on delivering value before
          asking for a sale — building loyalty across every stage of the
          customer journey. improves brand visibility by delivering valuable,
          relevant information where your audience is already spending time.
          When brands demonstrate empathy and expertise — especially by
          addressing known pain points — customers are more likely to engage
          with product-specific content like demos, reviews, or case studies.
        </p>
        <ul className="list-disc text-lg text-black shadow-text pt-1 container">
          <li>
            Define your audience. Start by understanding who you&apos;re trying
            to reach. Develop customer personas based on roles, behaviors,
            industry, demographics, and preferences. These personas help you
            tailor content to meet the needs and interests of specific customer
            segments — and identify where and how to engage them.
          </li>
          <li>
            AI and Digital Trends Generative and agentic AI are transforming the
            customer journey faster than organizations can adapt. This
            year&apos;s AI and Digital Trends report highlights the promise and
            pressure of this shift, the critical gaps holding brands back, and
            what it takes to deliver experiences that move as fast as the
            technology shaping them.
          </li>
          <li>
            AI Is Reshaping Customer Experience The ongoing rush of developments
            in artificial intelligence (AI) is reshaping how brands and
            customers interact across every step of the journey from product
            discovery to purchase. As people increasingly experiment with
            AI-powered tools and services in their everyday lives, organizations
            are racing to understand how generative and agentic AI can
            meaningfully improve experiences and strengthen business
            performance. And in a market this fluid, organizations are grappling
            with questions about where to invest, how quickly to scale, and what
            now defines a competitive customer experience (CX).
          </li>
          <li className="text-lg">
            Generative AI Is Delivering Early Wins Across most customer
            experience workflows, from marketing content creation to customer
            support, personalization, and back-office operations,
            experimentation with generative AI is widespread, with roughly
            one-quarter to one-third of organizations running limited pilots in
            these areas. The vast majority of organizations report improvements
            driven by generative AI in areas including content ideation and
            production, employee productivity and efficiency, and even
            marketing-driven revenue growth.
          </li>
        </ul>
      </div>
      <div className="col-span-6 min-w-full min-h-screen container ps-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          AI Strategy Consulting
        </h3>
        <p className="text-black shadow-text text-xl">
          Is a specialized advisory service that helps organizations identify,
          prioritize, and implement artificial intelligence technologies to
          achieve specific business goals, such as improving efficiency or
          boosting ROI. Consultants evaluate AI readiness, create tailored
          implementation roadmaps, and manage data strategy, governance, and
          organizational change, bridging the gap between technical AI potential
          and practical business value.
        </p>
        <ul className="list-disc text-lg text-black shadow-text pt-1 container">
          <li>
            AI Readiness Assessment: Evaluating current IT infrastructure, data
            quality, workforce skills, and organizational culture to identify
            gaps before adoption.
          </li>
          <li>
            Vision & Use Case Prioritization: Identifying high-impact areas
            where AI can create values, such as automating repetitive tasks or
            enhancing customer experience, and selecting the top priorities
            based on feasibility and ROI.
          </li>
          <li>
            Data Strategy Development: Building a robust framework for
            collecting, cleaning, and governing data, which serves as the "fuel"
            for any effective AI system.
          </li>
          <li>
            Ethical & Risk Governance: Establishing policies to address data
            privacy, algorithmic bias, and compliance with emerging regulations
            like GDPR.
          </li>
          <li>
            Change Management & Training: Preparing the workforce for cultural
            and operational shifts through upskilling and clear communication to
            drive long-term adoption.
          </li>
        </ul>
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#8C2703] justify-center items-center">
        <Image
          src="/images/target.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="AI-Chatbot"
          className="h-auto w-auto"
        />
      </div>
      <div className="flex col-span-6 min-w-full min-h-screen bg-[#012840] justify-center items-center">
        <Image
          src="/images/ai-chat-bot.svg"
          preload={true}
          width={512}
          height={512}
          quality={100}
          alt="AI-Chatbot"
          className="h-auto w-auto"
        />
      </div>
      <div className="col-span-6 min-w-full min-h-screen container pe-5 justify-center flex flex-col">
        <h3 className="text-black text-3xl font-bold shadow-text">
          AI Security & Compliance
        </h3>
        <p className="text-black shadow-text text-xl">
          Are two interconnected disciplines focused on protecting artificial
          intelligence systems and ensuring they operate within legal and
          ethical boundaries. It involves protecting artificial intelligence
          systems from cyberthreats (security) and ensuring they adhere to
          legal, ethical, and regulatory standards (compliance). It secures AI
          models and data from poisoning, theft, and misuse while ensuring
          models remain transparent, fair, and aligned with frameworks like the
          EU AI Act and GDPR.
        </p>
        <ul className="list-disc text-lg text-black shadow-text pt-5 pt-1 container">
          <li>
            Data Security: Protecting the massive datasets used to train models
            from unauthorized access or theft.
          </li>
          <li>
            Model Integrity: Safeguarding models against data poisoning
            (injecting malicious data to skew results) and adversarial attacks
            (manipulating inputs to cause errors).
          </li>
          <li>
            Infrastructure Security: Securing the cloud environments, APIs, and
            pipelines that transport and execute AI workloads.
          </li>
          <li>
            AI Security Posture Management (AI-SPM): Tools that discover all
            active AI models (including &quot;shadow AI&quot; used without
            permission) and identify misconfigurations or vulnerabilities.
          </li>
          <li>
            EU AI Act: The first comprehensive global regulation, which
            categorizes AI systems by risk level and bans
            &quot;unacceptable&quot; risks like social scoring.
          </li>
          <li>
            GDPR / CCPA: Privacy laws that govern how personal data can be used
            to train or be processed by AI.
          </li>
          <li>
            Audit Trails: Maintaining detailed logs of how a model was trained,
            tested, and updated to provide evidence for regulators during
            audits.
          </li>
        </ul>
      </div>
    </section>
  );
}
