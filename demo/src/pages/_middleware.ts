import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { guardUserToken, USER_TOKEN } from "lib/token";

const shouldExclude = (pathname: string) => {
  return (
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") // exclude all files in the public folder
  );
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (shouldExclude(pathname)) return NextResponse.next();

  try {
    const result = await guardUserToken({
      token: req.cookies[USER_TOKEN],
      onGuarded: (token) => {
        const response = NextResponse.next();

        response.cookie(USER_TOKEN, token, { httpOnly: true });

        return response;
      },
      onPassThrough: () => NextResponse.next(),
    });

    return result;
  } catch (e) {
    console.log(e);

    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
