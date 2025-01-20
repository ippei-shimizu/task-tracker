import { SESSION, USER_ID } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken, userId } = body;

    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set(SESSION, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set(USER_ID, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
