import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { validatePassword, validateUsername } from "../lib/validateUserInfo";
import { useSession } from "../pages/_app";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormField } from "./FormField";
import { Checkbox } from "./CheckBox";

interface RegisterFormProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export function RegisterForm({
  username,
  setUsername,
  password,
  setPassword,
}: RegisterFormProps) {
  const [over13, setOver13] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formIsValid = useMemo(() => {
    if (validateUsername(username).length > 0) return false;
    if (validatePassword(password).length > 0) return false;
    if (!over13) return false;
    return true;
  }, [over13, password, username]);

  const { setUser } = useSession();

  return (
    <form
      className="flex flex-col space-y-4"
      action="/api/register"
      onSubmit={(event) => {
        event.preventDefault();
        // setCommunityGuidelinesOpen(true);

        const form = event.currentTarget;
        const body = { username, password, over13 };

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
        validate={validateUsername}
        helpText="Your username may be different than on Scratch"
      />

      <FormField
        type="password"
        label="Password"
        name="password"
        required={true}
        value={password}
        setValue={setPassword}
        placeholder="Password"
        validate={validatePassword}
        helpText="Minimum 8 characters"
      />

      <div>
        <label className="group flex cursor-pointer items-center">
          <Checkbox
            name="over-13"
            checked={over13}
            onChange={(event) => setOver13(event.target.checked)}
            required={true}
          />
          <span>I am over 13 years old</span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:bg-indigo-300"
          disabled={!formIsValid}
        >
          Register
        </button>
      </div>
    </form>
  );
}
