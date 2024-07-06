import Center from "../components/Center";
import { Footer } from "../components/Footer";
import Nav from "../components/Nav";
import TopBorder from "../components/TopBorder";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBorder />
      <Nav title="Leopard" />
      <div className="flex-grow">
        <div className="my-8">
          <Center>
            <div className="prose">
              <h1>404 - Not Found</h1>
              <p>The page you were looking for could not be found.</p>
            </div>
          </Center>
        </div>
      </div>
      <Footer />
    </div>
  );
}
