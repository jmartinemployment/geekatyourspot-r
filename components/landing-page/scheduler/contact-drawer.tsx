"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBooking } from "@/lib/actions/create-booking";
import type {
  TimeSlot,
  Booking,
} from "@/components/landing-page/scheduler/state/types";

interface ContactDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(email) !== null;
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 10;
}

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactDrawer({
  open,
  onOpenChange,
  selectedDate,
  selectedSlot,
}: Readonly<ContactDrawerProps>): React.JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const canSubmit =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    isValidPhone(phone) &&
    isValidEmail(email);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!canSubmit || !selectedDate || !selectedSlot) return;

    setSubmitState("submitting");

    const booking: Booking = {
      date: selectedDate,
      slot: selectedSlot,
      timezone: "America/New_York",
    };

    const contact = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    const result = await createBooking(booking, contact);
    setSubmitState(result.success ? "success" : "error");
  }

  function handleOpenChange(nextOpen: boolean): void {
    if (!nextOpen) {
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setSubmitState("idle");
    }
    onOpenChange(nextOpen);
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="bg-[#023059]">
          <DrawerTitle className="text-white text-xl font-bold">
            Confirm your Spot
          </DrawerTitle>
          {selectedDate && selectedSlot && (
            <DrawerDescription className="text-white text-sm">
              {formatDate(selectedDate)} at {selectedSlot.startTime} –{" "}
              {selectedSlot.endTime} ET
            </DrawerDescription>
          )}
        </DrawerHeader>

        {submitState === "success" ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 px-4 text-center">
            <p className="text-2xl font-semibold">
              You&rsquo;re on the Calendar.
            </p>
            <p className="text-sm text-black">
              A confirmation with a calendar invite has been sent to{" "}
              <span className="font-medium text-black">{email}</span>.
            </p>
            <DrawerClose asChild>
              <Button variant="outline" className="mt-4">
                Close
              </Button>
            </DrawerClose>
          </div>
        ) : (
          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="flex flex-col gap-5 px-4 py-2 flex-1"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-first-name">First name</Label>
              <Input
                id="contact-first-name"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-last-name">Last name</Label>
              <Input
                id="contact-last-name"
                type="text"
                autoComplete="family-name"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-phone">Phone number</Label>
              <Input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-required="true"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email">Email address</Label>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
              />
            </div>

            {submitState === "error" && (
              <p className="text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
            )}

            <DrawerFooter className="px-0 mt-auto">
              <Button
                type="submit"
                disabled={!canSubmit || submitState === "submitting"}
                size="lg"
              >
                {submitState === "submitting" ? "Booking…" : "Confirm booking"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  );
}
