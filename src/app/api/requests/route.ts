import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requests = await prisma.projectRequest.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(requests);
  } catch (error: any) {
    console.error("Failed to fetch project requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
