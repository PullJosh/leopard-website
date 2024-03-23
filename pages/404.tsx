import Nav, {
  NavLoggedOutUserInfo,
  NavSpace,
  NavUserInfo,
} from "../components/Nav";
import Title from "../components/Title";
import TopBorder from "../components/TopBorder";
import { useSession } from "./_app";

export default function NotFoundPage() {
  const { user } = useSession();

  return (
    <>
      <Title>404 - Not Found</Title>
      <TopBorder />
      <div className="border-b border-gray-300">
        <Nav>
          <NavSpace />

          {user === null ? (
            <NavLoggedOutUserInfo />
          ) : (
            <NavUserInfo username={user.username} />
          )}
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
