import classNames from "classnames";
import { Footer } from "../../components/Footer";
import Nav from "../../components/Nav";
import TopBorder from "../../components/TopBorder";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBorder />
      <Nav title="Leopard" />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
