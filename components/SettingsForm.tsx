"use client";

import { useState } from "react";
import { sendEmailVerification } from "../actions/sendEmailVerification";
import { validateUsername } from "../lib/validateUserInfo";
import { FormField } from "./FormField";
import { useToasts } from "./Toasts";

interface SettingsFormProps {
  defaultValues: {
    username: string;
    emails: {
      id: string;
      address: string;
      verified: boolean;
      verificationSentAt: Date | null;
    }[];
  };
}

const DateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const TimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeStyle: "medium",
});

export function SettingsForm({ defaultValues }: SettingsFormProps) {
  const [username, setUsername] = useState(defaultValues.username);
  const [emails, setEmails] = useState(defaultValues.emails);

  const { addToast } = useToasts();

  return (
    <form>
      <div className="flex space-x-4">
        <div>
          <div className="mb-1 block text-sm font-medium text-gray-800">
            Icon
          </div>
          <img
            className="h-11 w-11 rounded"
            src="/default-profile-picture.svg"
            alt={`Profile picture of ${defaultValues.username}`}
          />
        </div>
        <div>
          <FormField
            name="username"
            type="text"
            label="Username"
            value={username}
            setValue={setUsername}
            required={true}
            validate={validateUsername}
            disabled={true}
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-1 text-sm font-semibold text-gray-800">
          Email Addresses
        </h3>
        <div>
          {emails.map((email) => (
            <div key={email.id}>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  className="w-64 rounded border border-gray-400 px-2 py-1"
                  defaultValue={email.address}
                  disabled={true}
                />
                {email.verified ? (
                  <span className="flex h-6 items-center space-x-1 rounded-full bg-green-200 px-2 py-px">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      className="size-4 fill-green-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-green-600">Verified</span>
                  </span>
                ) : (
                  <span className="flex h-6 items-center space-x-1 rounded-full bg-yellow-200 px-2 py-px ring-1 ring-yellow-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      className="size-4 fill-yellow-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="text-sm text-yellow-700">
                      Not Verified
                    </span>
                  </span>
                )}
              </div>
              {!email.verified && (
                <div className="mt-1 text-sm">
                  <span className="text-gray-600">
                    {email.verificationSentAt ? (
                      <>
                        Verification email sent on{" "}
                        {DateFormatter.format(email.verificationSentAt)} at{" "}
                        {TimeFormatter.format(email.verificationSentAt)}.
                      </>
                    ) : (
                      <>
                        This email address has never received a verification
                        link.
                      </>
                    )}
                  </span>{" "}
                  <button
                    className="text-indigo-700 hover:underline"
                    onClick={(event) => {
                      event.preventDefault();

                      sendEmailVerification(email.id)
                        .then((result) => {
                          console.log(result);

                          addToast({
                            children: "Verification email sent",
                            duration: 5000,
                            style: "default",
                          });

                          setEmails((emails) =>
                            emails.map((email) =>
                              email.id === result.id ? result : email,
                            ),
                          );
                        })
                        .catch((err) => {
                          addToast({
                            children:
                              err instanceof Error
                                ? err.message
                                : "Failed to send verification email",
                            duration: 5000,
                            style: "error",
                          });
                        });
                    }}
                  >
                    {email.verificationSentAt ? "Resend" : "Send"} verification
                    link
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
