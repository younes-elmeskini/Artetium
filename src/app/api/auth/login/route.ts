import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

type JwtPayload = { userId: string; email: string };

function generateToken(user: { id: string; email: string }) {
  return jwt.sign(
    { userId: user.id, email: user.email } as JwtPayload,
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "24h" }
  );
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = generateToken(user);
  if (!token) {
    return Response.json({ message: "Identifiants invalides" }, { status: 401 });
  }
  return Response.json({ message: "Login successful" }, { status: 200, headers: {
    "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
  } });
}