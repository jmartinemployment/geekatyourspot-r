import FaqSection from "@/components/shared/faq-section";
import type { FaqItem } from "@/components/shared/faq-section";

const faqs: FaqItem[] = [
  {
    question: "Where does AI actually help a small business?",
    answer:
      "The highest-impact areas are customer service (chatbots that handle inquiries and book appointments around the clock), lead intake and follow-up (automatic responses and CRM updates the moment someone fills out a form), and marketing content (emails, social posts, and ad copy generated and scheduled automatically). The common thread is volume — the more times your team does the same thing each week, the bigger the return from automating it.",
  },
  {
    question: "Which service do most businesses start with?",
    answer:
      "Process automation and AI chatbots are the most common entry points because the ROI is fastest and most visible. Automation handles the internal work your team repeats endlessly. A chatbot handles the external work — the same questions, the same booking requests — without your team lifting a finger. Most clients expand to additional services after seeing the first one working.",
  },
  {
    question: "Do I need to replace my current software?",
    answer:
      "No. We build on top of what you already use — your CRM, email platform, scheduling system, accounting software. The goal is to make your existing tools work together automatically, not to rip them out and start over. A data readiness check is part of every engagement to confirm your current setup can support what we build.",
  },
  {
    question: "What is the difference between AI integration and process automation?",
    answer:
      "Process automation eliminates manual steps in a workflow — moving data, sending notifications, routing tasks — using rules and triggers. AI integration adds intelligence on top of that: understanding natural language, making decisions based on context, generating content, or predicting outcomes. Most real-world projects use both. We scope each engagement to use only what the problem actually requires.",
  },
  {
    question: "How do I know which service is right for my business?",
    answer:
      "That is what the free strategy call is for. We look at where your team's time is going, what your current tools are, and what outcomes you need. Most businesses think they need a chatbot when what they actually need is process automation, or vice versa. We tell you what will move the needle fastest, not what is most interesting to build.",
  },
  {
    question: "What could go wrong?",
    answer:
      "The two most common failure modes are automating a broken process (the AI makes the mess faster) and uploading sensitive client data to a tool without checking the privacy terms. Both are avoidable with proper scoping upfront. We run a readiness assessment before any build work begins specifically to catch these before they become problems.",
  },
  {
    question: "Do you serve all of South Florida?",
    answer:
      "Yes — Broward, Palm Beach, and Miami-Dade Counties. On-site work is available throughout the tri-county area. Strategy, chatbot builds, and automation projects are also available remotely.",
  },
];

export default function AiSolutionsFaqSection(): React.JSX.Element {
  return (
    <FaqSection
      title="How It Actually Works"
      subtitle="Real questions about AI services from South Florida business owners."
      faqs={faqs}
    />
  );
}
