"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/actions/send-contact-email";

type ContactModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>;

type SubmitState = "idle" | "success" | "error";

const inputClass = `
  w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
  focus:outline-none focus:ring-2 focus:ring-[#006aff] focus:border-transparent
  disabled:bg-gray-50 disabled:text-gray-500
`.trim();

export function ContactModal({ isOpen, onClose, title }: ContactModalProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { _honey: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    const result = await sendContactEmail(data);

    if (result.success) {
      setSubmitState("success");
      setTimeout(() => {
        onClose();
        reset();
        setSubmitState("idle");
      }, 2500);
    } else {
      setSubmitState("error");
      setErrorMessage(result.error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-[#1d3273]">
          <DialogTitle className="text-xl text-white shadow-text font-bold">
            {title ?? "Get In Touch"}
          </DialogTitle>
        </DialogHeader>

        {submitState === "success" && (
          <div className="flex flex-col items-center gap-3 py-12 px-6 text-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold">Message sent!</p>
            <p className="text-sm text-[#0a0b26]">
              We&apos;ll be in touch shortly.
            </p>
          </div>
        )}

        {submitState !== "success" && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset className="px-6 py-5 space-y-4" disabled={isSubmitting}>
              {/* Honeypot — hidden from real users, catches bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_honey">Leave this blank</label>
                <input
                  id="_honey"
                  type="text"
                  tabIndex={-1}
                  {...register("_honey")}
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                  {...register("name")}
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  {...register("email")}
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass}
                    {...register("phone")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                    {...register("company")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  {...register("message")}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </fieldset>

            {submitState === "error" && errorMessage && (
              <div
                role="alert"
                className="mx-6 mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-3 px-6 pb-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[#1d3273] px-5 py-2 text-sm font-bold text-white shadow-text shadow-box
                           hover:bg-[#3f51b5] disabled:opacity-60 disabled:cursor-not-allowed
                           transition-colors flex items-center gap-2"
              >
                {isSubmitting && (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                )}
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
