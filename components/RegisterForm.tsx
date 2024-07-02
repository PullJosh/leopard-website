import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateBirthdayMonth,
  getAge,
} from "../lib/validateUserInfo";
import { useSession } from "../components/SessionProvider";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormField } from "./FormField";

interface RegisterFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  birthday: string;
  setBirthday: Dispatch<SetStateAction<string>>;
}

export function RegisterForm({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  birthday,
  setBirthday,
}: RegisterFormProps) {
  const [error, setError] = useState<string | null>(null);

  const age = useMemo(
    () => (validateBirthdayMonth(birthday) ? getAge(new Date(birthday)) : 0),
    [birthday],
  );

  const formIsValid = useMemo(() => {
    if (validateEmail(email).length > 0) return false;
    if (validateUsername(username).length > 0) return false;
    if (validatePassword(password).length > 0) return false;
    if (age < 13) return false;
    return true;
  }, [age, email, password, username]);

  const { setUser } = useSession();

  return (
    <form
      className="flex flex-col space-y-4"
      action="/api/register"
      onSubmit={(event) => {
        event.preventDefault();
        // setCommunityGuidelinesOpen(true);

        const form = event.currentTarget;
        const body = { email, username, password, birthday };

        fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then(async (res) => {
            const json = await res.json();
            if (res.status === 200) {
              setUser(json.user);
              setEmail("");
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
        type="email"
        label="Email"
        name="email"
        required={true}
        value={email}
        setValue={setEmail}
        placeholder="Email"
        validate={validateEmail}
        helpText="Your email is used to verify your account and reset your password."
      />

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

      <FormField
        type="month"
        label="Birthday Month"
        name="birthday"
        required={true}
        value={birthday}
        setValue={setBirthday}
        placeholder="YYYY-MM"
        validate={validateBirthdayMonth}
        helpText="Your birthday is used to verify your age. It will never be shared with anyone."
      />

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
