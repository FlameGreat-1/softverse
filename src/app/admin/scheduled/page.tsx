import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Clock, AlertCircle, CheckCircle, Clock3 } from "lucide-react";

export default async function ScheduledPostsPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/admin/login");
  }

  const scheduledTasks = await prisma.scheduledPost.findMany({
    include: { post: true },
    orderBy: { scheduledFor: 'desc' }
  });

  return (
    <div className="p-8 lg:p-12 text-white">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Calendar className="text-my-primary" /> Scheduled Blasts
          </h1>
          <p className="text-gray-400 text-sm">Monitor and manage your automated social media content distribution.</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden">
        {scheduledTasks.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400">No scheduled posts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Blog Post</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Platforms</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Scheduled Time</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scheduledTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {task.post.coverImage && (
                          <img src={task.post.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div>
                          <p className="font-medium text-sm text-gray-200">{task.post.title}</p>
                          <Link href={`/admin/edit/${task.post.id}`} className="text-xs text-blue-400 hover:underline">Edit Post</Link>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {task.platforms.map((platform) => (
                          <span key={platform} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock size={14} />
                        {new Date(task.scheduledFor).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      {task.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                          <Clock3 size={12} /> Pending
                        </span>
                      )}
                      {task.status === "SUCCESS" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          <CheckCircle size={12} /> Published
                        </span>
                      )}
                      {task.status === "FAILED" && (
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 w-max">
                            <AlertCircle size={12} /> Failed
                          </span>
                          <span className="text-[10px] text-red-400 max-w-[200px] truncate" title={task.errorMessage || ""}>
                            {task.errorMessage}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
