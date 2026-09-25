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

    const hashedPassword = await bcrypt.hash("$$123abcChuks", 10);

    const admin = await prisma.user.create({
      data: {
        name: "FlameGreat",
        email: "admin@flamegreat.com",
        password: hashedPassword,
        role: "ADMIN",
      }
    });

    return NextResponse.json({
      message: "Admin created successfully!",
      email: "admin@flamegreat.com",
      password: "$$123abcChuks"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
