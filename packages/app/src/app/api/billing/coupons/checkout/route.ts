import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth, RequestWithAuth } from "~/libs/auth";
import { db } from "~/libs/prisma";
import { sendSnsNotification } from "~/libs/sns";
import { schema } from "./types";
import { WillStatus } from "@prisma/client";

const postHandler = async (request: RequestWithAuth) => {
  try {
    const json = await request.json();
    const { willId, coupleCouponIdApplied } = schema.parse(json);

    const updateCoupon = db.coupon.update({
      where: {
        id: coupleCouponIdApplied,
      },
      data: {
        appliedAt: new Date(),
        appliedToWillId: willId,
      },
    });

    const updateWill = db.will.update({
      where: {
        id: willId,
      },
      data: {
        status: WillStatus.COMPLETE_PAID,
        coupleCouponIdApplied,
      },
    });

    await Promise.all([updateCoupon, updateWill]);
    await sendSnsNotification(willId); // send a notification to trigger the Will creation

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: JSON.stringify(error.issues),
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json(error?.message, {
      status: 400,
    });
  }
};

export const POST = withAuth(postHandler);
