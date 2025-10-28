import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Sauver utilisateur
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return Response.json({ message: "User registered successfully" });
}