import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists!" });
    }

    const hashedPassword = await bcrypt.hash("adminpassword", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Example",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
      }
    });

    return NextResponse.json({
      message: "Admin created successfully!",
      email: "admin@example.com",
      password: "adminpassword"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
