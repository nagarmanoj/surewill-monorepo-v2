import { NextResponse } from "next/server";
import subDays from "date-fns/subDays";
import mailchimpFactory from "@mailchimp/mailchimp_transactional";
import { db } from "~/libs/prisma";
import { env } from "@/env.mjs";

const mailchimp = mailchimpFactory(env.MANDRILL_API_KEY);

export const dynamic = "force-dynamic";

const getHandler = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const cronKey = searchParams.get("cronKey");
    if (!cronKey || cronKey !== "surewillCronPublicKey") {
      return NextResponse.json({ success: false, data: {} }, { status: 401 });
    }

    // Get all the Wills that were finished but not paid for, 5 days ago or less, and haven't yet received a follow-up email
    const daysAgo = subDays(new Date(), Number(env.FOLLOW_UP_EMAIL_DAYS_AGO));
    const unpaidWills = await db.will.findMany({
      where: {
        createdAt: {
          lt: daysAgo,
        },
        status: "COMPLETE_UNPAID",
        OR: [
          {
            followUpNotPaidEmailSent: {
              isSet: false,
            },
          },
          {
            followUpNotPaidEmailSent: false,
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        email: true,
      },
      take: 50,
    });

    if (!unpaidWills.length) {
      return NextResponse.json({ success: true, data: {} }, { status: 200 });
    }
    const willsWithEmails = unpaidWills.filter((will) => !!will.email);

    await mailchimp.messages.sendTemplate({
      template_name: env.EMAIL_TEMPLATE_FOLLOW_UP_NOT_PAID,
      template_content: [],
      message: {
        merge: true,
        merge_language: "handlebars",
        to: willsWithEmails.map((user) => ({
          email: user.email as string,
        })),
        merge_vars: willsWithEmails.map((user) => ({
          rcpt: user.email as string,
          vars: [
            {
              name: "firstName",
              content: user.firstName,
            },
          ],
        })),
      },
    });

    await db.will.updateMany({
      where: {
        id: {
          in: unpaidWills.map((will) => will.id),
        },
      },
      data: {
        followUpNotPaidEmailSent: true,
      },
    });

    return NextResponse.json(
      { success: true, data: { emailsSent: unpaidWills.length } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const GET = getHandler;
