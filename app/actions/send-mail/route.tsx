import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = body.firstName || ""
    const lastName = body.lastName || ""
    const senderEmail = body.email || ""
    const dates = body.dates || ""
    const message = body.message || ""

    if (!process.env.STRATO_EMAIL || !process.env.STRATO_PASSWORD) {
      console.error("Missing STRATO_EMAIL or STRATO_PASSWORD environment variables")
      return new Response(JSON.stringify({ error: "Email server not configured." }), { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.strato.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.STRATO_EMAIL,
        pass: process.env.STRATO_PASSWORD
      }
    });

    const textBody = [
      `Naam: ${firstName} ${lastName}`,
      `Email: ${senderEmail}`,
      `Gewenste data: ${dates}`,
      "Bericht:",
      `${message}`
    ].join("\n");

    const mailOptions = {
      from: process.env.STRATO_EMAIL,
      to: process.env.STRATO_EMAIL,
      subject: "Nieuw contactformulier bericht",
      text: textBody,
      replyTo: senderEmail || undefined
    };

    const info = await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), { status: 200 });
  } catch (error: any) {
    console.error("Mail error:", error);
    return new Response(JSON.stringify({ error: error?.message || "Failed to send email." }), { status: 500 });
  }
}
