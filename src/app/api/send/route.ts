import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";
const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  focus: z.string().max(120).optional().default(""),
  message: z.string().min(10, "Message is too short!"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 },
      );
    }
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
      return Response.json({ resendError }, { status: 500 });
    }
    return Response.json(resendData);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
