import { NextResponse } from "next/server";
import { RequestWithAuth, withAuth } from "~/libs/auth";
import { db } from "~/libs/prisma";
import { z } from "zod";

const bodySchema = z.object({
  now: z.string(),
});

export const dynamic = "force-dynamic";

const postHandler = async (
  request: RequestWithAuth,
  {
    params,
  }: {
    params: {
      willId: string;
    };
  }
) => {
  try {
    const json = await request.json();
    const will = await db.will.findFirst({
      where: {
        id: params.willId,
      },
    });
    const { now } = bodySchema.parse(json);
    const hasRegenerated =
      will?.lastGeneratedAt && new Date(will.lastGeneratedAt) > new Date(now);
    return NextResponse.json(
      {
        lastGeneratedAt: will?.lastGeneratedAt,
        hasRegenerated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
};

export const POST = withAuth(postHandler);
