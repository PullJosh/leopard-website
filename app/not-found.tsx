import Nav, { NavSpace } from "../components/Nav";

export default function NotFound() {
  return (
    <>
      <div className="border-b border-gray-300">
        <Nav title="Leopard">
          <NavSpace />
        </Nav>
      </div>
      <div className="mt-8">
        <div className="mx-auto max-w-4xl px-8">
          <h1 className="text-4xl font-bold">404 - Not Found</h1>
          <p className="mt-4">
            The page you were looking for could not be found.
          </p>
        </div>
      </div>
    </>
  );
}
