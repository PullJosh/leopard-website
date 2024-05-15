import Link from "next/link";
import Nav, { NavSpace } from "../../components/Nav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className="sticky top-[8px] z-30 border-b border-gray-300">
        <Nav title="Admin" titleHref="/admin" />
      </div>
      <div className="mx-auto max-w-6xl p-8">{children}</div>
    </>
  );
}
