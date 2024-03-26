import Link from "next/link";
import Nav, { NavSpace } from "../../components/Nav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className="border-b border-gray-300">
        <Nav>
          <Link href="/admin" className="flex items-center">
            <h1 className="text-xl font-semibold hover:underline">Admin</h1>
          </Link>
          <NavSpace />
        </Nav>
      </div>
      <div className="mx-auto max-w-6xl p-8">{children}</div>
    </>
  );
}
