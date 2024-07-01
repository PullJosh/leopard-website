import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("id");

  if (!projectId) {
    return new Response("Missing id", { status: 400 });
  }

  const res = await fetch(
    `https://api.scratch.mit.edu/projects/${projectId}`,
  ).then((res) => res.json());

  return NextResponse.json(res);
}
