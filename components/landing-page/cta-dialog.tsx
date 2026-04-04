"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ui/contact-modal-transform-cta";

export function TransformCtaDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="purple" size="lg" onClick={() => setOpen(true)}>
        Let&apos;s Talk
      </Button>
      <ContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Let's Talk"
      />
    </>
  );
}
