import { NextResponse } from "next/server";
import { withAuth } from "~/libs/auth";
import { db } from "~/libs/prisma";

const deleteHandler = async (
  _: Request,
  {
    params,
  }: {
    params: {
      willId: string;
    };
  }
) => {
  await db.will.delete({
    where: {
      id: params.willId,
    },
  });
  return NextResponse.json({ success: true, data: {} }, { status: 202 });
};

export const DELETE = withAuth(deleteHandler);
