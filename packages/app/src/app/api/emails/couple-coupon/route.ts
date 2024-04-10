import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth, RequestWithAuth } from "~/libs/auth";
import { sendTemplate } from "~/libs/mailchimp";
import { env } from "@/env.mjs";

const sendCoupleCouponSchema = z.object({
  partnerName: z.string(),
  partnerEmail: z.string().trim().email(),
  willOwnerName: z.string(),
  couponCode: z.string().min(1),
});

export type SendCoupleCouponInput = z.infer<typeof sendCoupleCouponSchema>;

const postHandler = async (request: RequestWithAuth) => {
  try {
    const json = await request.json();
    const { partnerName, partnerEmail, willOwnerName, couponCode } =
      sendCoupleCouponSchema.parse(json);
    await sendTemplate({
      templateName: env.EMAIL_TEMPLATE_SLUG_COUPLE_COUPON,
      toEmail: partnerEmail,
      content: [
        {
          name: "coupon",
          content: couponCode,
        },
        {
          name: "partnerName",
          content: partnerName,
        },
        {
          name: "willOwnerName",
          content: willOwnerName,
        },
      ],
    });
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues,
        },
        {
          status: 422,
        }
      );
    }
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const POST = withAuth<{}>(postHandler);
