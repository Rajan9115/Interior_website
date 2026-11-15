import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail =
  process.env.CONTACT_NOTIFICATION_EMAIL ||
  process.env.CONTACT_EMAIL_RECIPIENT ||
  "mamainteriorhyd@gmail.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, phone, service, location, description, honeypot } = body;

    // Anti-bot honeypot check: Bots fill hidden fields; humans do not
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Enquiry submitted successfully.",
      });
    }

    // Input validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const rawPhone = typeof phone === "string" ? phone.trim() : "";
    const digitsOnly = rawPhone.replace(/\D/g, "");
    const trimmedService = typeof service === "string" ? service.trim() : "Fit-Out Enquiry";
    const trimmedLocation = typeof location === "string" ? location.trim() : "";
    const trimmedDesc = typeof description === "string" ? description.trim() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!digitsOnly || digitsOnly.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!trimmedDesc || trimmedDesc.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide at least 10 characters describing your project." },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          message: "Email service is temporarily unavailable. Please connect via WhatsApp.",
        },
        { status: 503 }
      );
    }

    const escapedName = escapeHtml(trimmedName);
    const escapedPhone = escapeHtml(rawPhone);
    const escapedService = escapeHtml(trimmedService);
    const escapedLocation = trimmedLocation ? escapeHtml(trimmedLocation) : "Not specified";
    const escapedDesc = escapeHtml(trimmedDesc);

    const emailResult = await resend.emails.send({
      from: "MAMA INTERIOR Leads <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: recipientEmail,
      subject: `New Lead: ${escapedService} - ${escapedName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Project Enquiry</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #172B40;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E5E0D7; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
    
    <!-- Header Banner -->
    <div style="background-color: #172B40; padding: 24px; text-align: left; border-bottom: 3px solid #E98291;">
      <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">
        MAMA INTERIOR
      </h1>
      <p style="margin: 4px 0 0; color: #5685C5; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
        Website Lead Notification
      </p>
    </div>

    <!-- Body Content -->
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 16px 0; color: #243B53; font-size: 17px; font-weight: 600;">
        New Estimate Request Received
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #687381; font-weight: 600; width: 140px;">Client Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #172B40; font-weight: bold;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #687381; font-weight: 600;">Phone / WhatsApp</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4;">
            <a href="tel:${digitsOnly}" style="color: #21865B; font-weight: bold; text-decoration: none;">${escapedPhone}</a>
            &nbsp;•&nbsp;
            <a href="https://wa.me/91${digitsOnly.slice(-10)}" style="color: #21865B; text-decoration: underline; font-size: 12px;">Open WhatsApp</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #687381; font-weight: 600;">Service Required</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #172B40; font-weight: 600;">${escapedService}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #687381; font-weight: 600;">Location / Area</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1ECE4; color: #172B40;">${escapedLocation}</td>
        </tr>
      </table>

      <!-- Project Scope Box -->
      <div style="margin-top: 20px;">
        <p style="margin: 0 0 8px 0; color: #687381; font-size: 13px; font-weight: 600;">
          Client Project Scope & Description:
        </p>
        <div style="background-color: #F7F5F0; border-left: 3px solid #5685C5; padding: 14px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #172B40; white-space: pre-wrap;">${escapedDesc}</div>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E0D7; font-size: 12px; color: #687381;">
        Received via MAMA INTERIOR Online Estimate Portal. Quick response recommended within 2 to 4 hours.
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (emailResult.error) {
      console.error("[Resend API Error]:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error.message || "Failed to dispatch email via Resend.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
      id: emailResult.data?.id,
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

