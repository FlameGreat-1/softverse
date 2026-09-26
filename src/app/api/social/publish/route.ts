import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const expectedSecret = process.env.QSTASH_WEBHOOK_SECRET || process.env.NEXTAUTH_SECRET;
    
    if (token !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized Webhook" }, { status: 401 });
    }

    const body = await req.json();
    const { scheduledPostId } = body;
    const upstashRetried = parseInt(req.headers.get("upstash-retried") || "0", 10);

    if (!scheduledPostId) {
      return NextResponse.json({ error: "Missing scheduledPostId" }, { status: 400 });
    }

    // 1. Fetch the scheduled post to get metadata
    const scheduledPost = await prisma.scheduledPost.findUnique({
      where: { id: scheduledPostId },
      include: { post: true }
    });

    if (!scheduledPost) {
      return NextResponse.json({ message: "Task not found" }, { status: 200 });
    }

    // Enterprise Concurrency Control: Atomically claim the task
    // If two identical webhooks hit this route at the exact same millisecond, only ONE will succeed in updating PENDING to PROCESSING.
    const claim = await prisma.scheduledPost.updateMany({
      where: { id: scheduledPostId, status: "PENDING" },
      data: { status: "PROCESSING" }
    });

    if (claim.count === 0) {
      // Task was already claimed by another worker, or was cancelled/completed
      return NextResponse.json({ message: "Task already claimed or processed" }, { status: 200 });
    }

    if (scheduledPost.platforms.length === 0) {
      // Nothing to do
      await prisma.scheduledPost.update({ where: { id: scheduledPostId }, data: { status: "SUCCESS" } });
      return NextResponse.json({ message: "No platforms remaining" }, { status: 200 });
    }

    // 2. Fetch all required OAuth credentials securely from DB and Decrypt
    const settings = await prisma.systemSetting.findMany();
    const config = settings.reduce((acc: any, curr: any) => { 
      acc[curr.key] = decrypt(curr.value); 
      return acc; 
    }, {});

    let errors: string[] = [];
    let successfulPlatforms: string[] = [];

    // 3. Execute Social API Calls
    const caption = scheduledPost.socialCaption || scheduledPost.post.title;
    const postUrl = `https://www.flamegreat.tech/blog/${scheduledPost.post.slug}`;
    const message = `${caption}\n\nRead more: ${postUrl}`;

    for (const platform of scheduledPost.platforms) {
      try {
        if (platform === "TWITTER") {
          if (!config.TWITTER_API_KEY || !config.TWITTER_ACCESS_TOKEN) throw new Error("Twitter API keys missing");
          const response = await fetch("https://api.twitter.com/2/tweets", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${config.TWITTER_ACCESS_TOKEN}`, 
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: message })
          });
          if (!response.ok) throw new Error(`Twitter Error: ${response.statusText}`);
          successfulPlatforms.push("TWITTER");
        } 
        else if (platform === "LINKEDIN") {
          if (!config.LINKEDIN_ACCESS_TOKEN) throw new Error("LinkedIn Token missing");
          const meRes = await fetch("https://api.linkedin.com/v2/me", {
            headers: { "Authorization": `Bearer ${config.LINKEDIN_ACCESS_TOKEN}` }
          });
          if (!meRes.ok) throw new Error("Invalid LinkedIn Token");
          const meData = await meRes.json();
          const authorUrn = `urn:li:person:${meData.id}`;

          const liRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${config.LINKEDIN_ACCESS_TOKEN}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              author: authorUrn,
              lifecycleState: "PUBLISHED",
              specificContent: {
                "com.linkedin.ugc.ShareContent": {
                  shareCommentary: { text: message },
                  shareMediaCategory: "NONE"
                }
              },
              visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
            })
          });
          if (!liRes.ok) throw new Error(`LinkedIn Error: ${liRes.statusText}`);
          successfulPlatforms.push("LINKEDIN");
        }
        else if (platform === "FACEBOOK") {
          if (!config.FACEBOOK_PAGE_ACCESS_TOKEN) throw new Error("Facebook Page Token missing");
          const fbRes = await fetch(`https://graph.facebook.com/v18.0/me/feed`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: message,
              link: postUrl,
              access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN
            })
          });
          if (!fbRes.ok) throw new Error(`Facebook Error: ${fbRes.statusText}`);
          successfulPlatforms.push("FACEBOOK");
        }
      } catch (err: any) {
        errors.push(`[${platform}] ${err.message}`);
      }
    }

    // Enterprise Idempotency: Remove successful platforms from the DB array so retries don't duplicate posts
    const remainingPlatforms = scheduledPost.platforms.filter((p: any) => !successfulPlatforms.includes(p));

    // 4. Update the Database with the final status and handle Retries
    if (errors.length > 0) {
      if (upstashRetried < 3) {
        // Release the lock back to PENDING so the next QStash retry can claim it
        await prisma.scheduledPost.update({
          where: { id: scheduledPostId },
          data: { status: "PENDING", platforms: remainingPlatforms, errorMessage: `Partial Failure: ${errors.join(" | ")}` }
        });
        return NextResponse.json({ error: "Failures detected, asking QStash to retry", details: errors }, { status: 500 });
      } else {
        await prisma.scheduledPost.update({
          where: { id: scheduledPostId },
          data: { platforms: remainingPlatforms, status: "FAILED", errorMessage: errors.join(" | ") }
        });
        return NextResponse.json({ error: "Max retries reached, marked as FAILED" }, { status: 200 }); 
      }
    } else {
      await prisma.scheduledPost.update({
        where: { id: scheduledPostId },
        data: { platforms: remainingPlatforms, status: "SUCCESS", errorMessage: null }
      });
      return NextResponse.json({ message: "Successfully published to all platforms" }, { status: 200 });
    }

  } catch (error: any) {
    console.error("Social Publisher Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
