import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newSubscriber = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    console.log("newSubscriber", newSubscriber);
    if (newSubscriber.status === "subscribed") {
      console.log("💌  Subscribed user to Mailchimp:", newSubscriber);

      return NextResponse.json(
        {
          message: "Subscribed user to Mailchimp",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to subscribe user to Mailchimp",
      },
      {
        status: 400,
      }
    );
  } catch (error: any) {
    console.log("error", error);
    if (error?.response?.body?.title === "Member Exists") {
      return NextResponse.json(
        {
          error: "This email is already subscribed",
        },
        { status: 409 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || error.toString() },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
