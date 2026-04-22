import FaqSection from "@/components/shared/faq-section";
import type { FaqItem } from "@/components/shared/faq-section";

const faqs: FaqItem[] = [
  {
    question: "Is AI actually useful for a business my size?",
    answer:
      "Yes — and small businesses see faster payback than enterprises because there is less bureaucracy slowing the rollout. If your team spends hours each week on tasks that follow a pattern (answering the same questions, chasing leads, entering data, building the same reports), those hours are recoverable. 92% of small businesses that implement AI report measurable results. The ones that do not usually tried to change too much at once instead of starting with one workflow.",
  },
  {
    question: "How much does this cost?",
    answer:
      "A focused project — automating one well-defined workflow — typically runs $10,000 to $25,000 as a flat fee and pays for itself within 60 to 90 days. Broader implementations range from $25,000 to $50,000. The free strategy call produces a written estimate before you commit to anything. No hourly billing, no scope surprises.",
  },
  {
    question: "Will AI replace my employees?",
    answer:
      "No — and we will tell you that plainly even when it costs us a sale. AI handles high-volume, low-judgment work so your team can focus on clients, decisions, and growth. The businesses with the best results use AI to make their people more effective, not fewer. If a project is primarily about headcount reduction, we are not the right fit.",
  },
  {
    question: "What is the difference between you and just using ChatGPT myself?",
    answer:
      "ChatGPT is a tool. We connect it — and tools like it — into your actual software: your CRM, your scheduling system, your email platform, your client records. A standalone AI tool answers questions. An integrated AI system takes action, updates records, sends responses, and routes work automatically. That is the difference between saving 20 minutes a day and saving 20 hours a week.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Simple automations go live in one to two weeks. A custom AI chatbot trained on your business typically takes four to eight weeks. We build in measurable checkpoints so you see wins before the project closes — not just a finished product at the end.",
  },
  {
    question: "Is my business data safe?",
    answer:
      "We review the data handling and privacy terms of every tool we recommend before suggesting it. We never recommend tools that train on your private business data without explicit consent. For regulated industries — healthcare, legal, financial services — we verify HIPAA BAA requirements and Florida privacy law compliance before any tool gets near client data.",
  },
];

export default function HomeFaqSection(): React.JSX.Element {
  return (
    <FaqSection
      title="Straight Answers"
      subtitle="What South Florida business owners actually want to know before the first call."
      faqs={faqs}
    />
  );
}
