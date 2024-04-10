import { NextResponse } from "next/server";
import { RequestWithAuth, withAuth } from "~/libs/auth";
import { sendSnsNotification } from "~/libs/sns";
import { ensureWillOwner } from "~/libs/auth";

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
    const isWillOwner = await ensureWillOwner(request.user.id, params.willId);
    if (!isWillOwner) {
      return NextResponse.json(
        { success: false, error: "Not Authorized." },
        { status: 401 }
      );
    }
    await sendSnsNotification(params.willId);
    return NextResponse.json(
      {},
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
