import { NextResponse, type NextRequest } from "next/server";

// Russian owns unprefixed URLs; English URLs explicitly start with /en.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/ru" || url.pathname.startsWith("/ru/")) {
    return NextResponse.next();
  }
  if (url.pathname === "/en" || url.pathname.startsWith("/en/")) {
    return NextResponse.next();
  }
  url.pathname = `/ru${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*|opengraph-image).*)"],
};
