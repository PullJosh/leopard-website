import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Center from "../../../components/Center";
import { SettingsForm } from "../../../components/SettingsForm";
import { UnscrapableEmailLink } from "../../../components/UnscrapableEmailLink";
import { getUser, sessionTokenCookieName } from "../../../lib/getUser";

export default async function SettingsPage() {
  const token = cookies().get(sessionTokenCookieName)?.value;
  const user = await getUser(token);

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="my-8">
      <Center>
        <h1 className="mb-4 text-3xl font-semibold">Settings</h1>
        <div className="mb-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-800">
          <strong className="font-semibold">
            Many profile settings are not yet editable.
          </strong>{" "}
          If you need something changed,{" "}
          <UnscrapableEmailLink
            base64EncodedEmail="Sm9zaFB1bGxlbjI3QGdtYWlsLmNvbQ=="
            subject="Leopard settings change request"
            body={`Hi PullJosh,\n\nI'm ${user.username} and I need help changing my Leopard settings. Here's what I need changed:\n\n\n\nThanks,\n${user.username}`}
            className="text-indigo-700 hover:underline"
          >
            contact me
          </UnscrapableEmailLink>{" "}
          and I'll take care of it for you.
        </div>
        <div className="rounded-lg border border-gray-300 bg-white px-4 py-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Profile</h2>
          <SettingsForm
            defaultValues={{
              username: user.username,
              emails: user.emails,
            }}
          />
        </div>
      </Center>
    </div>
  );
}
