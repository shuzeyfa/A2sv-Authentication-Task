import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Optional: inspect token
  },
  {
    callbacks: {
      // Only allow if user has a token
      authorized: ({ token }) => !!token,
    },
    // Optional: you can set signIn redirect
    pages: {
      signIn: "/signin", // redirect here if not authorized
    },
  }
);

export const config = {
  matcher: ["/dashboard"], // protect this route
};
