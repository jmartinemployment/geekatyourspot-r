import FaqSection from "@/components/shared/faq-section";
import type { FaqItem } from "@/components/shared/faq-section";

const faqs: FaqItem[] = [
  {
    question: "What does this actually cost?",
    answer:
      "A focused project — automating one well-defined workflow — runs $10,000 to $25,000 as a flat fee. Broader strategy and multi-system builds range from $25,000 to $50,000. The free strategy call ends with a written estimate. No hourly billing, no scope surprises, no retainer you have to cancel.",
  },
  {
    question: "How long until I see something working?",
    answer:
      "Simple automations — lead responses, email routing, data sync — go live in one to two weeks. A custom chatbot trained on your business takes four to eight weeks. We build measurable checkpoints into every project so you see wins before it closes, not just a finished product at the end.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Mostly service businesses with repetitive client-facing work: law firms, medical and dental practices, real estate agencies, home services companies, and professional services firms. If your team spends hours on scheduling, follow-ups, data entry, or answering the same questions — that time is recoverable. We also work with retail and e-commerce businesses on inventory and demand workflows.",
  },
  {
    question: "Do my staff need to be technical?",
    answer:
      "No. Everything we build is designed for business owners and their teams, not engineers. You get plain-language documentation, hands-on training, and 30 days of post-launch support so your staff runs it confidently without us.",
  },
  {
    question: "What is the free strategy call, exactly?",
    answer:
      "Thirty minutes. We ask where your team wastes time, where errors happen, and what keeps you up at night. You leave with a written summary of your two or three highest-impact automation opportunities and a realistic ROI estimate. No sales pitch, no obligation.",
  },
  {
    question: "Why not just hire a big IT firm?",
    answer:
      "You would work with a junior consultant following a playbook, not the person with 30 years of experience. There are account managers, offshore delivery teams, and services you do not need bundled into the price. With Geek at Your Spot you work directly with Jeff Martin. That is the whole pitch.",
  },
  {
    question: "Do you work outside South Florida?",
    answer:
      "Our focus is Broward, Palm Beach, and Miami-Dade because on-site discovery produces better results. We take remote engagements for strategy consulting, chatbot builds, and automation projects where in-person presence is not required.",
  },
];

export default function ContactFaqSection(): React.JSX.Element {
  return (
    <FaqSection
      title="Before You Book"
      subtitle="The questions worth answering before we get on a call."
      faqs={faqs}
    />
  );
}
