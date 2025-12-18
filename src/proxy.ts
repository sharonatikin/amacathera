import { NextResponse } from "next/server";

export default function proxy() {

}
// Protect all admin routes except login
export const config = {
  matcher: "/admin/:path*"
};