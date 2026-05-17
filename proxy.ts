import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.headers.has("next-action")) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}
