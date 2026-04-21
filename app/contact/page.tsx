import { Suspense } from "react";
import type { Metadata } from "next";
import { SchedulerShell } from "@/components/landing-page/scheduler/scheduler-shell";

export const metadata: Metadata = {
  title: "Contact Us | Geek at Your Spot",
  description:
    "Get in touch with the Geek at Your Spot team. We help small businesses in South Florida implement AI.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <Suspense>
      <SchedulerShell />
    </Suspense>
  );
}
