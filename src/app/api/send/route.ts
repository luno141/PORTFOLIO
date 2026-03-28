import { config } from "@/data/config";
import { NextResponse } from "next/server";
import { z } from "zod";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  focus: z.string().max(120).optional().default(""),
  message: z.string().min(10, "Message is too short!"),
});

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    { enabled: Boolean(process.env.RESEND_API_KEY) },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return NextResponse.json({ error: zodError?.message }, { status: 400 });
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 },
      );
    }

    const [{ Resend }, { EmailTemplate }] = await Promise.all([
      import("resend"),
      import("@/components/email-template"),
    ]);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
    const toEmail = process.env.RESEND_TO_EMAIL || config.email;
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: zodData.email,
      subject: zodData.focus
        ? `Portfolio inquiry: ${zodData.focus}`
        : "Portfolio inquiry",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        focus: zodData.focus,
        message: zodData.message,
      }),
    });
    if (resendError) {
      return NextResponse.json(
        { error: resendError.message || "Failed to send email" },
        { status: 500 },
      );
    }
    return NextResponse.json(resendData);
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
