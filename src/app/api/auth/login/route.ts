import { SESSION, USER_ID } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken, userId } = body;

    const { url } = req;
    const baseUrl = new URL(url);
    const tasksUrl = new URL("/tasks", baseUrl);

    const response = NextResponse.redirect(tasksUrl, 302);

    response.cookies.set(SESSION, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set(USER_ID, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
