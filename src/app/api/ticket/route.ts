// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   // body থেকে data handle করা
//   return NextResponse.json({ message: "Ticket created" });
// }

import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/lib/models/Ticket";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.json();
  const { name, email, subject, message, category } = body;

  const ticket = await Ticket.create({
    name,
    email,
    subject,
    message,
    category: category || "general",
  });

  // nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Ticket Received: ${subject}`,
    text: `Hi ${name},\n\nWe have received your ticket.\n\n- Support Team`,
  });

  return NextResponse.json({ success: true, ticket }, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectMongo();

  const tickets = await Ticket.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, tickets });
}
