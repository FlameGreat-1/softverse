import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { encrypt, decrypt } from "@/lib/encryption";

// Gets all settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.systemSetting.findMany();
    // Enterprise Security: Never return raw decrypted tokens to the frontend DOM. 
    // Return a masked placeholder if the value exists.
    const settingsObj = settings.reduce((acc: any, curr) => {
      const decrypted = decrypt(curr.value);
      if (curr.key === "QSTASH_URL") {
        acc[curr.key] = decrypted;
      } else {
        acc[curr.key] = decrypted ? "********" : "";
      }
      return acc;
    }, {});

    return NextResponse.json(settingsObj, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// Bulk update settings
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Wrap settings update in an ACID transaction
    // Enterprise Security: Only update fields that were actually changed by the user (ignore the masking string)
    const updates = Object.entries(body).filter(([_, value]) => value && value !== "********");
    
    if (updates.length > 0) {
      await prisma.$transaction(
        updates.map(([key, value]) => {
          const encryptedValue = encrypt(String(value));
          return prisma.systemSetting.upsert({
            where: { key },
            update: { value: encryptedValue },
            create: { key, value: encryptedValue },
          });
        })
      );
    }

    return NextResponse.json({ message: "Settings saved successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
