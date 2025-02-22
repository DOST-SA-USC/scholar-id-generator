import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/user(.*)"]);
const ignoreRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req) && !ignoreRoute(req)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  } else if (userId && !isProtectedRoute(req) && !ignoreRoute(req)) {
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    // "/(api|trpc)(.*)",
  ],
};
