"use server"

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContact(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const dates = String(formData.get("dates") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fromEmail = process.env.NO_REPLY_EMAIL ?? "info@fleursetabeilles.fr";
  const toEmail = "jasperdeklijn@gmail.com"; // or info@fleursetabeilles.fr
  const subject = `Contact form — ${firstName} ${lastName}${email ? ` (${email})` : ""}`;

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Desired dates:</strong> ${escapeHtml(dates)}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    console.log("Sending contact form email...");
    const result = await resend.emails.send({
      from: `Fleurs & Abeilles <${fromEmail}>`,
      to: [toEmail],
      subject,
      html,
    });
console.log("Contact form email sent:", result);
    return { success: true, result };
  } catch (error) {
    console.error("sendContact error:", error);
    return { success: false, error };
  }
}