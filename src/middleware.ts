import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getLoggedInCookie } from "./lib/cookieManager";
import { DASHBOARD_URL, LOGIN_URL } from "./lib/constants";

const i18nMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // Run i18n middleware first
  const response = i18nMiddleware(req);

  let path = req.nextUrl.pathname;

  const i18nredirect = response.headers.get("location");
  if (i18nredirect && i18nredirect.startsWith("http")) {
    const url = new URL(i18nredirect);
    path = url.pathname;
  }

  const pathSegments = path.split("/").filter(Boolean);
  const locale = pathSegments[0]; // first path segment is locale

  const pathWithoutLocale = "/" + pathSegments.slice(1).join("/");

  //const publicRoutes = ["/"];
  const authRoutes = ["/auth/"];

  //const isPublicRoute = publicRoutes.includes(pathWithoutLocale);
  const isAuthRoute = authRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  // if (isPublicRoute) {
  //   return response;
  // }

  const loggedInCookie = await getLoggedInCookie();

  if (isAuthRoute) {
    if (loggedInCookie) {
      return NextResponse.redirect(
        new URL(`/${locale}${DASHBOARD_URL}`, req.nextUrl)
      );
    }
    return response;
  }

  if (!loggedInCookie) {
    return NextResponse.redirect(
      new URL(`/${locale}${LOGIN_URL}`, req.nextUrl)
    );
  }

  if (pathWithoutLocale === "/") {
    return NextResponse.redirect(
      new URL(`/${locale}${DASHBOARD_URL}`, req.nextUrl)
    );
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
