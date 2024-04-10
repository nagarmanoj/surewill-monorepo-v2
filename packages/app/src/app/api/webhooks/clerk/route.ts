import type { User } from "@clerk/nextjs/api";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { db } from "~/libs/prisma";
import { sendTemplate } from "~/libs/mailchimp";
import { env } from "@/env.mjs";

async function handler(request: Request) {
  try {
    const payload = await request.json();
    const headersList = headers();
    const heads = {
      "svix-id": headersList.get("svix-id"),
      "svix-timestamp": headersList.get("svix-timestamp"),
      "svix-signature": headersList.get("svix-signature"),
    };
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
    let event: Event | null = null;

    try {
      event = wh.verify(
        JSON.stringify(payload),
        heads as IncomingHttpHeaders & WebhookRequiredHeaders
      ) as Event;
    } catch (err) {
      console.error((err as Error).message);
      return NextResponse.json({}, { status: 400 });
    }

    const eventType: EventType = event.type;
    if (eventType === "user.created") {
      const { id, first_name, email_addresses, primary_email_address_id } =
        event.data;
      const emailAddress = email_addresses.find(
        (email) => email.id === primary_email_address_id
      )?.email_address;

      await db.user.upsert({
        where: {
          authUserId: id,
        },
        create: {
          authUserId: id,
        },
        update: {},
      });

      if (emailAddress && first_name) {
        await sendTemplate({
          templateName: env.EMAIL_TEMPLATE_SLUG_REGISTER_USER,
          toEmail: emailAddress,
          content: [
            {
              name: "firstName",
              content: first_name,
            },
          ],
        });
      }
    }
    return new Response(null, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${error?.message}` },
      {
        status: 400,
      }
    );
  }
}

type EventType = "user.created";

type OmitKeys =
  | "emailAddresses"
  | "firstName"
  | "lastName"
  | "primaryEmailAddressId"
  | "primaryPhoneNumberId"
  | "phoneNumbers";

interface UserInterface extends Omit<User, OmitKeys> {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  primary_email_address_id: string;
  first_name: string;
  last_name: string;
  primary_phone_number_id: string;
  phone_numbers: {
    phone_number: string;
    id: string;
  }[];
}

type Event = {
  data: UserInterface;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
