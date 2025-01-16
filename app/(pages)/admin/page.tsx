import Link from "next/link";
import { ChevronRight } from "lucide-react";

const RouteCard = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 hover:cursor-pointer">
      <Link
        href={href}
        className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 group"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {text.split(" ")[1]}
            </h2>
            <p className="text-gray-600">{text}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
        </div>
      </Link>
    </div>
  );
};

export default async function AdminPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <RouteCard href="/admin/list/issues" text="View Issues" />
      <RouteCard href="/admin/analytics" text="View Analytics" />
    </main>
  );
}
