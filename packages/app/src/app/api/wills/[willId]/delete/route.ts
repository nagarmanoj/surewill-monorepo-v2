import { NextResponse } from "next/server";
import { db } from "~/libs/prisma";
import { withAuth, ensureWillOwner, RequestWithAuth } from "~/libs/auth";

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
    const isWillOwner = await ensureWillOwner(request.user.id, params.willId);
    if (!isWillOwner) {
      return NextResponse.json(
        { success: false, error: "Not Authorized." },
        { status: 401 }
      );
    }
    await db.will.update({
      where: {
        id: params.willId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const POST = withAuth(postHandler);
