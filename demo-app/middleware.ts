import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { guardUserToken, USER_TOKEN } from "./lib/token";

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
      token: req.cookies.get(USER_TOKEN),
      onGuarded: (token) => {
        const response = NextResponse.next();

        response.cookies.set(USER_TOKEN, token, {
          httpOnly: true,
          maxAge: 2592000 * 12,
        });

        return response;
      },
      onPassThrough: () => NextResponse.next(),
    });

    return result;
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
