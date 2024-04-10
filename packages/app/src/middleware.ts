import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { routes } from "./config/routes";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signUpUrl = new URL(routes.auth.signUp, req.url);
      return NextResponse.redirect(signUpUrl);
    }
  },
  ignoredRoutes: ["/api/webhooks/(.*)", "/api/crons/(.*)"],
  publicRoutes: ["/api/generate/(.*)"],
});

export const config = {
  matcher: ["/", "/(api)(.*)", "/((?!.*\\..*|_next|documents/*|not-found).*)"],
};
