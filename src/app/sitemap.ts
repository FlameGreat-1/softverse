import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const blogPosts = posts.map((post: any) => ({
    url: `https://www.flamegreat.tech/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [
    {
      url: "https://www.flamegreat.tech",
      lastModified: new Date(),
    },
    {
      url: "https://www.flamegreat.tech/blog",
      lastModified: new Date(),
    },
    ...blogPosts,
  ];
}
