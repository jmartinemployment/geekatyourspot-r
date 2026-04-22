import { TransformCtaDialog } from "@/components/landing-page/cta-dialog";

interface ServiceCtaProps {
  serviceName: string;
}

export default function ServiceCta({ serviceName }: ServiceCtaProps): React.JSX.Element {
  return (
    <section className="w-full min-h-[60vh] bg-[#8C2703] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h2 className="text-white text-[4rem] md:text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text mb-6">
          Ready to start?
        </h2>
        <p className="text-white text-xl shadow-text mb-8">
          Book a free 30-minute strategy call. We will identify exactly how{" "}
          {serviceName.toLowerCase()} creates value in your business — at no charge.
        </p>
        <TransformCtaDialog />
      </div>
    </section>
  );
}
