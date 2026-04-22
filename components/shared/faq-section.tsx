import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
}

export default function FaqSection({
  title = "Common Questions",
  subtitle,
  faqs,
}: FaqSectionProps): React.JSX.Element {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section className="w-full bg-[#023059] py-20 px-4">
      <JsonLd schema={faqSchema} />
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-white font-[var(--font-sora)] font-black text-4xl md:text-5xl leading-tight mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/70 text-lg mb-12">{subtitle}</p>
        )}
        <Accordion className="border-white/20 bg-white/5">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-white/20 data-open:bg-white/10"
            >
              <AccordionTrigger className="text-white hover:no-underline hover:text-white/80 text-base font-medium py-5 px-5 [&_*]:text-white/60">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/80 px-5 pb-5 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
