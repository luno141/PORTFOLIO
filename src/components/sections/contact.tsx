"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <SectionHeader
        id="contact"
        className="relative mb-14"
        title={
          <>
            LET&apos;S WORK <br />
            TOGETHER
          </>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.05fr_0.95fr] z-[9999] mx-4">
        <Card className="min-w-7xl rounded-xl bg-background/80 dark:bg-black/70 backdrop-blur-sm mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">Contact Form</CardTitle>
            <CardDescription>
              Please contact me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-foreground underline underline-offset-4 cursor-can-hover rounded-lg"
              >
                {config.email}
              </a>
              . Use the form below if you want to discuss a role, collaboration,
              or technically ambitious product build.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-6 pt-10 md:pt-20">
          <Card className="rounded-xl bg-background/80 dark:bg-black/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Before you send</CardTitle>
              <CardDescription>
                A strong message makes it easier for me to reply with useful
                context instead of back-and-forth clarification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {[
                "Tell me what you are building or what role you are hiring for.",
                "Include the timeline, scope, and what kind of help you need.",
                "Mention whether this is an internship, startup role, or collaboration.",
              ].map((item) => (
                <div
                  key={item}
                  className="surface-tile rounded-2xl border border-border bg-background/55 px-4 py-3"
                >
                  {item}
                </div>
              ))}
              <p className="pt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {config.availability.responseTime}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
