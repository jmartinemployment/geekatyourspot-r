import type { Department } from "@/lib/types/departments";
import Link from "next/link";
import { getDepartmentContent } from "@/services/department.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faFunnelDollar,
  faBellConcierge,
  faTag,
  faUsersBetweenLines,
  faShieldHalved,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

const departmentColors: Record<string, string> = {
  accounting: "bg-[#6A4C93]",
  "customer-service": "bg-[#1982C4]",
  "human-resources": "bg-[#8AC926]",
  marketing: "bg-[#FFCA3A]",
  operations: "bg-[#FF00BD]",
  sales: "bg-[#EC5800]",
};
const departmentTextColors: Record<string, string> = {
  accounting: "text-[#6A4C93]",
  "customer-service": "text-[#1982C4]",
  "human-resources": "text-[#8AC926]",
  marketing: "text-[#FFCA3A]",
  operations: "text-[#FF00BD]",
  sales: "text-[#EC5800]",
};
const departmentIcons: Record<string, IconDefinition> = {
  accounting: faCalculator,
  "customer-service": faBellConcierge,
  "human-resources": faUsersBetweenLines,
  marketing: faFunnelDollar,
  operations: faRobot,
  sales: faShieldHalved,
};
export async function UseCasesSection(): Promise<React.JSX.Element> {
  const departments = await getDepartmentContent();

  return (
    <section className="w-full bg-[#0A080D] min-h-screen py-5 hidden lg:block">
      <div className="grid grid-cols-1 container mb-5">
        <div className="col-span-full">
          <h2 className="text-white lg:text-7xl xl:text-[6.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            Artificial Intelligence Use&nbsp;<span className="text-[#8C2703] shadow-text">Cases</span>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 container">
        <div className="col-span-6 flex flex-col items-center justify-center py-5 bg-[#1F51FF]">
          <FontAwesomeIcon
            icon={faCalculator}
            width={256}
            height={256}
            className="text-white mb-4"
          />
          <p className="text-white font-bold xl:text-6xl shadow-text">
            Accounting
          </p>
        </div>
        <div className="col-span-6 bg-[#CBCBCB] px-5 py-5">
          <div>
            <h3 className="text-3xl font-bold shadow-text">Accounting</h3>
            <h4 className="text-lg font-bold shadow-text">
              Automated Bookkeeping & Data Entry
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI eliminates manual input by automatically reading, categorizing,
              and coding invoices, receipts, and bank transactions.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Expense Management & Invoicing
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Systems automatically match invoices to purchase orders and
              receipts, flagging discrepancies or anomalies that need
              investigation.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Tax Preparation & Advisory
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI tools analyze large datasets to identify deductions, credits,
              and ensure compliance with ever-changing tax laws, while
              predictive insights help with tax planning.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Auditing & Risk Management
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Rather than sampling, AI allows for 100% of transactions to be
              reviewed in real-time, detecting anomalies and potential fraud far
              faster than manual processes.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Financial Forecasting & Reporting
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI analyzes historical data to generate accurate cash flow
              projections and provides insights for budgeting and strategic
              decision-making.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Emergence of Agentic AI
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Future accounting systems will use AI agents to autonomously plan
              and execute complex end-to-end workflows, such as full
              reconciliations.
            </p>
          </div>
        </div>
        <div className="col-span-6 bg-[#CBCBCB] px-5 py-5">
          <div>
            <h3 className="text-3xl font-bold shadow-text">Customer Service</h3>
            <h4 className="text-lg font-bold shadow-text">
              Direct Customer Support & Automation
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              These bots provide instant, personalized answers to common
              inquiries and guide users through complex troubleshooting.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Agent Assist Tools
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI analyzes live conversations to suggest responses, pull up
              relevant knowledge base articles, or summarize previous
              interactions for human agents, speeding up resolutions.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Sentiment Analysis & Proactive Support
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI tools detect frustration in customer messages to immediately
              escalate cases or predict issues before they happen.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Multilingual Support
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              R AI tools instantly translate customer inquiries, enabling
              support teams to assist users in different languages.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Automated Ticket Tagging & Routing
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Systems automatically read incoming emails or chats and route them
              to the correct department based on intent and urgency.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Enhanced Customer Satisfaction (CSAT)
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              By providing instant, 24/7 answers, companies often see improved
              CSAT scores, with one example showing a 10% increase.
            </p>
          </div>
        </div>
        <div className="col-span-6 flex flex-col items-center justify-center py-5 bg-[#FF0000]">
          <FontAwesomeIcon
            icon={faBellConcierge}
            width={256}
            height={256}
            className="text-white mb-4"
          />
          <p className="text-white font-bold xl:text-6xl shadow-text">
            Customer Service
          </p>
        </div>
        <div className="col-span-6 flex flex-col items-center justify-center py-5 bg-[#104040]">
          <FontAwesomeIcon
            icon={faUsersBetweenLines}
            width={256}
            height={256}
            className="text-white mb-4"
          />
          <p className="text-white font-bold xl:text-6xl shadow-text">
            Human Resources
          </p>
        </div>
        <div className="col-span-6 bg-[#CBCBCB] px-5 py-5">
          <div>
            <h3 className="text-3xl font-bold shadow-text">Human Resources</h3>
            <h4 className="text-lg font-bold shadow-text">
              Recruitment & Talent Acquisition
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI screens thousands of resumes in seconds, matching candidates to
              roles based on skills and potential rather than just keywords.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Employee Self-Service
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Conversational HR Agents, Chatbots now resolve 70–90% of routine
              queries—such as PTO balances or policy interpretations—in under 20
              seconds.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Career Development
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Platforms can analyze individual skill gaps and career goals to
              recommend curated training programs.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Operations Management
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Agentic Payroll & Compliance autonomous agents can now sync
              changes (e.g., name or location updates) across payroll, tax, and
              benefits records simultaneously.
            </p>
          </div>
        </div>
        <div className="col-span-6 bg-[#CBCBCB] px-5 py-5">
          <div>
            <h3 className="text-3xl font-bold shadow-text">Marketing</h3>
            <h4 className="text-lg font-bold shadow-text">
              Content Operations
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AAI dynamically generates thousands of content
              variations—including blog posts, social captions, and localized
              copy—tailored to specific audience segments in seconds. AI now
              handles intent-based keyword research and real-time content
              scoring, cutting technical audit times from hours to minutes.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Precision Advertising & Media Buying
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI identifies high-value leads with the highest conversion
              probability, allowing teams to focus ad spend purely on prospects
              with real buying intent.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Market Intelligence & Analytics
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI analyzes brand mentions across social media and forums (e.g.,
              Sprout Social AI) to detect emerging trends or potential PR crises
              instantly. Tools use AI to automatically map competitor
              strategies, keyword gaps, and user personas.
            </p>
            <h4 className="text-lg font-bold shadow-text">Customer Journeys</h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Website homepages and email subject lines adapt in real-time based
              on a visitor&apos;s past behavior, leading to 3X higher response
              rates. E-commerce engines (like those used by Adidas) use AI to
              suggest products based on browsing patterns, often driving 10–30%
              of total revenue.
            </p>
          </div>
        </div>
        <div className="col-span-6 flex flex-col items-center justify-center py-5 bg-[#FFBF00]">
          <FontAwesomeIcon
            icon={faFunnelDollar}
            width={256}
            height={256}
            className="text-white mb-4"
          />
          <p className="text-white font-bold xl:text-6xl shadow-text">
            Marketing
          </p>
        </div>

        <div className="col-span-6 flex flex-col items-center justify-center py-5 bg-[#EC5800]">
          <FontAwesomeIcon
            icon={faRobot}
            width={256}
            height={256}
            className="text-white mb-4"
          />
          <p className="text-white font-bold xl:text-6xl shadow-text">
            Operations
          </p>
        </div>
        <div className="col-span-6 bg-[#CBCBCB] px-5 py-5">
          <div>
            <h3 className="text-3xl font-bold shadow-text">Operations</h3>
            <h4 className="text-lg font-bold shadow-text">
              Supply Chain & Logistics Optimization
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Autonomous Procurement sourcing vendors, compare pricing in
              real-time, and execute purchase orders when inventory hits a
              specific threshold.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Intelligent Process Automation
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Agentic Document Processing reads, understands, and extracts data
              from complex, &quot;messy&quot; documents international invoices,
              legal contracts, and shipping manifests without human oversight.
              AI agents act as &quot;connective tissue,&quot; moving data
              between old legacy systems and modern cloud apps to ensure the
              entire company has a single source of truth.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Risk Management & Compliance
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI acts as a 24/7 auditor, watching for operational gaps that
              could lead to fines or failures. AI scans for changes in global
              trade laws or safety regulations and automatically updates
              internal operating procedures (SOPs) to stay compliant. AI audits
              every transaction and expense report in real-time to flag unusual
              patterns, preventing &quot;operational leak&quot; (wasted money)
              and internal fraud.
            </p>
          </div>
        </div>
        <div className="col-span-6 bg-[#CBCBCB] px-5 py-5">
          <div>
            <h3 className="text-3xl font-bold shadow-text">Sales</h3>
            <h4 className="text-lg font-bold shadow-text">
              Prospecting & Lead Intelligence
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI has eliminated the &quot;cold&quot; from cold calling by
              providing deep context on every lead. AI analyzes historical data
              to rank prospects based on their likelihood to close, ensuring
              reps spend 80% of their time on the top 20% of opportunities.
              Generative AI (like Lavender or Regie.ai) drafts emails that
              reference a prospect’s recent podcast appearance, a specific
              company pain point, or a shared LinkedIn connection in seconds.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Live Deal Execution (The AI Copilot)
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              During live calls, AI (e.g., Gong or Chorus) provides real-time
              "battle cards" if a competitor is mentioned, flags when the rep is
              talking too much, and suggests the best answers to tough
              objections. AI agents automatically update deal stages, log
              meeting notes, and create follow-up tasks in Salesforce or
              HubSpot, saving reps up to 5 hours of admin work per week.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Sales Management & Forecasting
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              AI acts as a 24/7 auditor, watching for operational gaps that cAI
              analyzes every email and call in a deal&apos;s history to flag
              &quot;at-risk&quot; opportunities (e.g., if a key decision-maker
              has gone silent), allowing managers to intervene early. AI
              provides revenue predictions with 95% accuracy by looking at
              actual buyer behavior rather than just what reps report in the
              CRM.
            </p>
            <h4 className="text-lg font-bold shadow-text">
              Revenue Expansion & Retention
            </h4>
            <p className="text-md text-black shadow-text leading-[0.95]">
              Sales doesn&apos;t end at the signature; AI helps maximize the
              &quot;lifetime value&quot; of a client. AI monitors how a customer
              uses the product and automatically alerts the Account Executive
              when they are ready for an upgrade or a new feature. Predictive
              models flag &quot;quiet&quot; accounts that haven&apos;t logged in
              recently, triggering an automated &quot;check-in&quot; sequence to
              save the account before the renewal date.
            </p>
          </div>
        </div>
        <div className="col-span-6 flex flex-col items-center justify-center py-5 bg-[#330066]">
          <FontAwesomeIcon
            icon={faTag}
            width={256}
            height={256}
            className="text-white mb-4"
          />
          <p className="text-white font-bold xl:text-6xl shadow-text">Sales</p>
        </div>
      </div>
    </section>
  );
}
