import AdminSidebar from "@/components/admin/AdminSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      {session && <AdminSidebar />}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
