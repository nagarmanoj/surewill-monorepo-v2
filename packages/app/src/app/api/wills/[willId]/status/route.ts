import { NextResponse } from "next/server";
import { RequestWithAuth, withAuth } from "~/libs/auth";
import { db } from "~/libs/prisma";

export const dynamic = "force-dynamic";

const getHandler = async (
  _: RequestWithAuth,
  {
    params,
  }: {
    params: {
      willId: string;
    };
  }
) => {
  try {
    const will = await db.will.findFirst({
      where: {
        id: params.willId,
      },
    });
    return NextResponse.json(
      {
        status: will?.status,
        readyForDownload: !!will?.firstGeneratedAt,
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

export const GET = withAuth(getHandler);
