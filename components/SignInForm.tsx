import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useSession } from "../components/SessionProvider";
import { FormField } from "./FormField";
import { FormErrorMessage } from "./FormErrorMessage";

interface SignInFormProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export function SignInForm({
  username,
  setUsername,
  password,
  setPassword,
}: SignInFormProps) {
  const [error, setError] = useState<string | null>(null);

  const formIsValid = useMemo(() => {
    if (!username) return false;
    if (!password) return false;
    return true;
  }, [password, username]);

  const { setUser } = useSession();

  return (
    <form
      className="flex flex-col space-y-4"
      action="/api/sign-in"
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const body = { username, password };

        fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.status === 200) {
              setUser(json.user);
              setUsername("");
              setPassword("");
            } else {
              setError(json.message);
            }
          })
          .catch((err) => {
            console.error(err);
            setError("An uknown error occured");
          });
      }}
    >
      {error && <FormErrorMessage>{error}</FormErrorMessage>}

      <FormField
        type="text"
        label="Username"
        name="username"
        required={true}
        value={username}
        setValue={setUsername}
        placeholder="Username"
      />

      <FormField
        type="password"
        label="Password"
        name="password"
        required={true}
        value={password}
        setValue={setPassword}
        placeholder="Password"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:bg-indigo-300"
          disabled={!formIsValid}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
