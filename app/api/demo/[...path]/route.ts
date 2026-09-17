import { NextResponse } from "next/server";
import { demoResponse } from "@/lib/demo-api";

export async function GET(request: Request, context: { params: { path: string[] } }) {
  return NextResponse.json(demoResponse(context.params.path.join("/"), { params: Object.fromEntries(new URL(request.url).searchParams) }));
}

export async function POST(request: Request, context: { params: { path: string[] } }) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json(demoResponse(context.params.path.join("/"), { data: body }));
}

export const PUT = POST;
export const PATCH = POST;
export const DELETE = POST;