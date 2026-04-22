import { Suspense } from "react";
import type { Metadata } from "next";
import { SchedulerShell } from "@/components/landing-page/scheduler/scheduler-shell";

export const metadata: Metadata = {
  title: "Book a Free AI Strategy Call | Geek at Your Spot",
  description:
    "Schedule a free strategy call with a South Florida AI consultant. We help small businesses in Broward, Palm Beach, and Miami-Dade implement AI and automation.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <Suspense>
      <SchedulerShell />
    </Suspense>
  );
}
