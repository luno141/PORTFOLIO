"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { config } from "@/data/config";
const engagementOptions = [
  "Internship",
  "Startup role",
  "Technical collaboration",
  "Prototype build",
];
const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [focus, setFocus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitState, setSubmitState] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitState("idle");
    setFeedbackMessage("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          focus,
          message,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSubmitState("success");
      setFeedbackMessage(
        "Message sent. I will get back to you as soon as possible.",
      );
      setFullName("");
      setEmail("");
      setFocus("");
      setMessage("");
    } catch (err) {
      setSubmitState("error");
      setFeedbackMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email me directly.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="min-w-7xl mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <div className="mb-5 space-y-3">
        <div className="space-y-1">
          <Label>What are you reaching out about?</Label>
          <p className="text-sm text-muted-foreground">
            Optional, but it helps me reply with the right context.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {engagementOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setFocus((current) => (current === option ? "" : option))
              }
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                focus === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background/60 text-muted-foreground hover:bg-muted/40",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            placeholder="Your Name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message</Label>
        <Textarea
          placeholder="Tell me what you are building, what you need help with, and any timeline or context that matters."
          id="content"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Best for internships, startup roles, collaborations, and technically
          serious product builds.
        </p>
      </div>

      {submitState !== "idle" && (
        <div
          aria-live="polite"
          className={cn(
            "mb-4 rounded-2xl border px-4 py-3 text-sm",
            submitState === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
              : "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-200",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="font-medium">
                {submitState === "success"
                  ? "Message received"
                  : "Submission failed"}
              </p>
              <p>{feedbackMessage}</p>
              {submitState === "success" && (
                <p>
                  Prefer email?{" "}
                  <a
                    href={`mailto:${config.email}`}
                    className="underline underline-offset-4"
                  >
                    {config.email}
                  </a>
                </p>
              )}
            </div>
            {submitState === "success" ? (
              <Check className="h-4 w-4 mt-0.5" />
            ) : null}
          </div>
        </div>
      )}

      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Inquiry <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};
export default ContactForm;
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
