import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth, RequestWithAuth } from "~/libs/auth";
import { schema } from "./types";
import { db } from "~/libs/prisma";

const postHandler = async (request: RequestWithAuth) => {
  try {
    const json = await request.json();
    const { coupon: couponInput } = schema.parse(json);

    let valid = false;
    const coupon = await db.coupon.findFirst({
      where: {
        couponCode: {
          equals: couponInput,
          mode: "insensitive",
        },
      },
    });
    const hasBeenApplied = !!coupon?.appliedAt;
    if (coupon && !hasBeenApplied) {
      valid = true;
    }

    return NextResponse.json(
      {
        valid,
        couponCode: coupon?.couponCode,
        couponId: coupon?.id,
        type: coupon?.type,
      },
      { status: 200 }
    );
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
