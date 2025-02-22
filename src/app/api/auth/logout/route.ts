import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  await supabase.auth.signOut();

  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the cookies
  response.cookies.set("sb-access-token", "", { path: "/", maxAge: -1 });
  response.cookies.set("sb-refresh-token", "", { path: "/", maxAge: -1 });

  return response;
}
