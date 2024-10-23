import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathname = req.url;

  // Define paths that require authentication
  const restrictedPaths = ["/auth", "/auth/", "/auth/signin", "/auth/signup"];

  // Check if the user is authenticated
  try {
    // const user = await getCurrentUser();
    // if (user.signInDetails !== undefined) {
    //   if (restrictedPaths.some((path) => pathname.startsWith(path))) {
    //     return NextResponse.redirect(new URL("/", req.url)); // Redirect to home or desired page
    //   }
    // }
  } catch (error) {
    // User is not authenticated
    // if (!restrictedPaths.some((path) => pathname.startsWith(path))) {
    //   return NextResponse.redirect(new URL("/auth/signin", req.url)); // Redirect to sign-in page
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"], // Protects all routes under /auth
};
