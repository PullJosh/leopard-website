import Nav from "../../components/Nav";
import TopBorder from "../../components/TopBorder";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBorder />
      <Nav title="Admin" titleHref="/admin" width="wide" />
      <div className="flex-grow">
        <div className="mx-auto max-w-6xl p-8">{children}</div>
      </div>
    </div>
  );
}
