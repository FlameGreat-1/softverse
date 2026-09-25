import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, content, excerpt, coverImage, published, tags, scheduleSocial, socialPlatforms, scheduledFor, socialCaption } = body;

    // Enterprise ACID Transaction: Wrap DB writes and network dispatch in a single atomic transaction
    const post = await prisma.$transaction(async (tx) => {
      const newPost = await tx.post.create({
        data: {
          title,
          slug,
          content,
          excerpt,
          coverImage,
          tags: tags || [],
          published: published ?? false,
          authorId: (session.user as any).id,
        },
      });

      if (scheduleSocial && socialPlatforms && socialPlatforms.length > 0 && scheduledFor) {
        const scheduleTime = new Date(scheduledFor).getTime();
        
        // Strict Validation: Cannot schedule in the past
        if (scheduleTime <= Date.now()) {
          throw new Error("VALIDATION_ERROR: Scheduled time must be in the future");
        }

        const scheduledPost = await tx.scheduledPost.create({
          data: {
            postId: newPost.id,
            platforms: socialPlatforms,
            scheduledFor: new Date(scheduledFor),
            socialCaption: socialCaption || excerpt || title,
          }
        });

        // Fetch System Settings securely within transaction
        const settings = await tx.systemSetting.findMany({
          where: { key: { in: ['QSTASH_TOKEN', 'QSTASH_URL'] } }
        });
        const settingsMap = settings.reduce((acc: any, curr) => { acc[curr.key] = curr.value; return acc; }, {});
        
        if (settingsMap.QSTASH_TOKEN && settingsMap.QSTASH_URL) {
          const delaySeconds = Math.floor((scheduleTime - Date.now()) / 1000);
          const webhookSecret = process.env.QSTASH_WEBHOOK_SECRET || process.env.NEXTAUTH_SECRET;

          const qstashRes = await fetch(settingsMap.QSTASH_URL + `https://www.flamegreat.tech/api/social/publish`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${settingsMap.QSTASH_TOKEN}`,
              'Content-Type': 'application/json',
              'Upstash-Delay': `${delaySeconds}s`,
              'Upstash-Forward-Authorization': `Bearer ${webhookSecret}`
            },
            body: JSON.stringify({ scheduledPostId: scheduledPost.id })
          });

          if (!qstashRes.ok) {
            console.error("QStash failed to accept the job:", await qstashRes.text());
            // Throwing an error here triggers an automatic database ROLLBACK of newPost and scheduledPost
            throw new Error("BROKER_ERROR: Failed to register schedule with message broker");
          }
        }
      }
      return newPost;
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.message && error.message.includes("VALIDATION_ERROR")) {
       return NextResponse.json({ error: error.message.replace("VALIDATION_ERROR: ", "") }, { status: 400 });
    }
    if (error.message && error.message.includes("BROKER_ERROR")) {
       return NextResponse.json({ error: "Message broker network failure. Database changes rolled back." }, { status: 503 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug already exists. Please choose a unique URL." }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published");

    const posts = await prisma.post.findMany({
      where: published ? { published: published === "true" } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
