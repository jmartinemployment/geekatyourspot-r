"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ui/contact-modal";

export function HeroDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className='bg-[#8C2703] mt-5 shadow-box shadow-text'
        size="lg"
        onClick={() => setOpen(true)}
      >
        Get Your Free AI Assessment
      </Button>
      <ContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Get Your Free AI Assessment"
      />
    </>
  );
}
