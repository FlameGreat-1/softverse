import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User as UserIcon } from "lucide-react";
import DOMPurify from 'isomorphic-dompurify';
// Important: We render TipTap HTML output directly, so we need a prose wrapper.

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | FLAMO Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `https://www.flamegreat.tech/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author?.name || 'Emmanuel U.'],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-40 pb-20 px-4 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <UserIcon size={16} className="text-my-primary" />
              {post.author?.name || 'Emmanuel U.'}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-my-primary" />
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-[21/9] w-full relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(199,120,221,0.1)] border border-white/5">
            <Image 
              src={post.coverImage} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Rich Text Content */}
        {/* We use Tailwind Typography (@tailwindcss/typography) to style the raw HTML */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-my-primary hover:prose-a:text-white prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(post.content, {
              ADD_TAGS: ['iframe'],
              ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
            }) 
          }}
        />
      </div>
    </article>
  );
}
