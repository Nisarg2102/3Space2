import { NextResponse } from "next/server";
import { z } from "zod";
import client from "@/lib/mongodb";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Please provide a valid email"),
  organization: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    await client.connect();
    console.log("MongoDB connection successful!");

    const db = client.db();
    const collection = db.collection("inquiries");
    await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    console.log("Validated inquiry saved to MongoDB:", data);

    try {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: process.env.INQUIRY_RECEIVER_EMAIL || "delivered@resend.dev",
        subject: `New Inquiry: ${data.subject}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Organization:</strong> ${data.organization || "N/A"}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      });
      console.log("Email notification sent successfully.");
    } catch (emailError) {
      console.error("Failed to send email via Resend:", emailError);
      // We don't fail the whole request if email fails, as it's already saved in DB.
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully",
    });
  } catch (error: any) {
    console.error("Error processing inquiry:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Invalid request",
      },
      { status: 400 }
    );
  }
}