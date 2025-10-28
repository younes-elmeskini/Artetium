import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    return Response.json({ valid: true, user: payload });
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}