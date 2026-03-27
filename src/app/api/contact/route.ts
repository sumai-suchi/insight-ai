import transporter from "@/lib/mailer";
import Contact from "@/lib/models/Contact";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1️⃣ Database connect
    await connectMongo();

    // 2️⃣ Body read করা
    const body = await req.json();

    // 3️⃣ Simple validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // 4️⃣ Contact save করা
    const contact = new Contact(body);
    await contact.save();

    // send Email to Admin
    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`, // sender
      to: process.env.EMAIL_USER, // admin email
      subject: `New Contact Message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
      html: `<p><strong>Name:</strong> ${body.name}</p>
             <p><strong>Email:</strong> ${body.email}</p>
             <p><strong>Message:</strong> ${body.message}</p>`,
    });

    // 5️⃣ Success response
    return NextResponse.json({
      message: "Message received and email sent successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong, please try again." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  await connectMongo();

  const contacts = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, contacts });
}
