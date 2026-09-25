import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { scheduledPosts: { orderBy: { createdAt: 'desc' }, take: 1 } }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, content, excerpt, coverImage, published, tags, scheduleSocial, socialPlatforms, scheduledFor, socialCaption } = body;

    // Enterprise ACID Transaction: Wrap DB writes, cancellations, and network dispatch
    const updatedPost = await prisma.$transaction(async (tx) => {
      const post = await tx.post.update({
        where: { id: params.id },
        data: {
          title,
          slug,
          content,
          excerpt,
          coverImage,
          tags: tags || [],
          published: published ?? false,
        },
      });

      // Cancel any existing pending schedules for this post
      await tx.scheduledPost.updateMany({
        where: { postId: post.id, status: "PENDING" },
        data: { status: "CANCELLED", errorMessage: "Cancelled or rescheduled by user edit" }
      });

      if (scheduleSocial && socialPlatforms && socialPlatforms.length > 0 && scheduledFor) {
        const scheduleTime = new Date(scheduledFor).getTime();
        
        if (scheduleTime <= Date.now()) {
          throw new Error("VALIDATION_ERROR: Scheduled time must be in the future");
        }

        const scheduledPost = await tx.scheduledPost.create({
          data: {
            postId: post.id,
            platforms: socialPlatforms,
            scheduledFor: new Date(scheduledFor),
            socialCaption: socialCaption || excerpt || title,
          }
        });

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
            throw new Error("BROKER_ERROR: Failed to register schedule with message broker");
          }
        }
      }
      return post;
    });

    return NextResponse.json(updatedPost, { status: 200 });
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
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
