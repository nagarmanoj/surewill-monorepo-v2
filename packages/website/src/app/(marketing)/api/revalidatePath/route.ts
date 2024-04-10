import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("path", body?.path);
  if (body?.path) revalidatePath(body?.path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
