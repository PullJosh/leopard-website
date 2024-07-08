import { Footer } from "../../components/Footer";
import Nav, { NavLink, NavLinks, NavSpace } from "../../components/Nav";
import TopBorder from "../../components/TopBorder";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBorder />
      <Nav title="Leopard">
        {/* <NavLinks>
          <NavLink href="/learn">Learn</NavLink>
        </NavLinks> */}
        <NavSpace />
      </Nav>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
