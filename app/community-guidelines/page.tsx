import classNames from "classnames";
import Link from "next/link";
import Center from "../../components/Center";
import Nav from "../../components/Nav";

import { cookies } from "next/headers";
import { getUser, sessionTokenCookieName } from "../../lib/getUser";

export default async function CommunityGuidelinesPage() {
  const token = cookies().get(sessionTokenCookieName)?.value;
  const user = await getUser(token);

  const age: number | null = user?.birthdayMonth
    ? (Date.now() - user.birthdayMonth.getTime()) / 1000 / 60 / 60 / 24 / 364.25
    : null;

  const ageRange = age ? (age < 16 ? "13+" : age < 18 ? "16+" : "18+") : null;

  return (
    <>
      <div className="sticky top-[8px] z-30 border-b border-gray-300">
        <Nav title="Community Guidelines" titleHref="/community-guidelines" />
      </div>
      <div className="my-8">
        <Center>
          <h1 className="mb-4 text-3xl font-semibold">Community Guidelines</h1>
          <p>
            Everyone wants to have a good experience online. These community
            guidelines describe the kinds of behaviors we expect in our
            community so that we can create a positive environment for
            everybody.
          </p>

          <div className="mt-12 grid grid-cols-[3fr,4fr,3fr] items-stretch">
            <div className="my-4 flex flex-col overflow-hidden rounded-l-xl border border-r-0 border-gray-300 bg-white text-center">
              <h3 className="flex h-12 items-center justify-center bg-gray-200 px-4 font-bold">
                Common Decency
              </h3>
              <div className="flex flex-grow flex-col justify-center space-y-1 px-4 py-4">
                <p>
                  We welcome everyone into our community, regardless of their
                  background or identity, and we respect the privacy and safety
                  of others.
                </p>
              </div>
            </div>
            <div className="z-10 flex flex-col justify-center overflow-hidden rounded-xl border-2 border-indigo-700 bg-white text-center text-lg ring ring-indigo-700/10">
              <h3 className="flex h-16 items-center justify-center bg-indigo-100 px-4 py-3 font-bold text-indigo-900">
                Community Culture
              </h3>
              <div className="flex flex-grow flex-col justify-center space-y-1 px-4 py-4">
                <p>
                  We are a community that embraces learning, supports each
                  other, and disagrees gracefully.
                </p>
                <p>
                  We represent the best of human ingenuity and collaboration.
                </p>
              </div>
            </div>
            <div className="my-4 flex flex-col justify-center overflow-hidden rounded-r-xl border border-l-0 border-gray-300 bg-white text-center">
              <h3 className="flex h-12 items-center justify-center bg-gray-200 px-4 font-bold">
                Age-Appropriate Safety
              </h3>
              <div className="flex flex-grow flex-col justify-center space-y-1 px-4 py-4">
                <p>Everything we share is appropriate for anyone 13+.</p>
                <p>
                  We are careful about sharing our personal information. Younger
                  users are required to take extra precaution.
                </p>
              </div>
            </div>
          </div>

          <SectionHeader>Common Decency</SectionHeader>
          <div className="space-y-4">
            <GuidelinePoint
              title="We welcome everyone into our community, regardless of their
            background or identity."
              positives={[
                "Celebrate others' identities, especially when they are different from your own.",
                "Treat everyone with respect, regardless of their background or identity",
              ]}
              negatives={[
                "Putting others down due to their background or identity",
                "Excluding others due to their background or identity",
              ]}
            />
            <GuidelinePoint
              title="We respect the privacy and safety of others."
              positives={[
                "If you see someone's privacy or safety at risk, alert a moderator",
              ]}
              negatives={[
                "Sharing someone else's private information",
                "Sharing another user's age-inappropriate contact information (even if they gave you permission)",
                "Asking for another user's private information",
              ]}
            />
          </div>

          <SectionHeader>Community Culture</SectionHeader>
          <div className="space-y-4">
            <GuidelinePoint
              title="We embrace learning."
              positives={[
                "Support, encourage, and teach others",
                "Be open to learning from others",
              ]}
              negatives={[
                "Criticizing others for not knowing things",
                "Refusing to listen to others",
              ]}
            />
            <GuidelinePoint
              title="We support each other."
              positives={[
                "Give compliments often",
                "Celebrate others' successes",
                "Be considerate of others' feelings while providing constructive feedback",
              ]}
              negatives={["Putting down other people or their work"]}
            />
            <GuidelinePoint
              title="We disagree gracefully."
              positives={[
                "Maintain your respect and care for everybody, including the people you disagree with",
                "Keep an open mind, and be willing to learn from others",
                "Step away when you feel yourself getting worked up",
              ]}
              negatives={[
                "Criticizing the person you're talking to rather than critiquing their ideas",
                'Purposely making other people\'s ideas sound worse (creating "strawmen")',
              ]}
            />
          </div>

          <SectionHeader>Age-Appropriate Safety</SectionHeader>
          <div className="space-y-4">
            <GuidelinePoint
              title="We share content that is appropriate for all users 13+."
              positives={[
                "Share projects and messages that are kid-friendly, up to PG-13",
                "If you see projects or messages that are not acceptable for users under 13, alert a moderator",
              ]}
              negatives={[
                'Using inappropriate language (such as any word that you might call the "__-word")',
                "Depicting strong violence",
                "References to drug use",
                "Sexual or explicit content",
              ]}
            />
            <GuidelinePoint title="We are cautious about sharing personal information.">
              <p className="text-gray-800">
                For your own safety, you are{" "}
                <strong className="font-semibold">required</strong> to be
                cautious about the personal information you share online. This
                chart shows what you are allowed to share depending on your age.
              </p>
              <div className="my-8 flex justify-center">
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
                  {/* -m-px on table to hide the cell border so that it is covered by the div border */}
                  <table className="-m-px">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-3 py-1 text-center"></th>
                        <th className="border border-gray-300 px-3 py-1 text-center">
                          13+
                          {ageRange === "13+" && (
                            <div className="rounded-full bg-indigo-100 px-2 py-px text-xs font-semibold text-indigo-700">
                              {user!.username}
                            </div>
                          )}
                        </th>
                        <th className="border border-gray-300 px-3 py-1 text-center">
                          16+
                          {ageRange === "16+" && (
                            <div className="rounded-full bg-indigo-100 px-2 py-px text-xs font-semibold text-indigo-700">
                              {user!.username}
                            </div>
                          )}
                        </th>
                        <th className="border border-gray-300 px-3 py-1 text-center">
                          18+
                          {ageRange === "18+" && (
                            <div className="rounded-full bg-indigo-100 px-2 py-px text-xs font-semibold text-indigo-700">
                              {user!.username}
                            </div>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-1">
                          Full Name
                        </td>
                        <BooleanCell checked={true} />
                        <BooleanCell checked={true} />
                        <BooleanCell checked={true} />
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-1">
                          Birthday
                        </td>
                        <BooleanCell checked={true} />
                        <BooleanCell checked={true} />
                        <BooleanCell checked={true} />
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-1">
                          Email
                        </td>
                        <BooleanCell checked={false} />
                        <BooleanCell checked={true} />
                        <BooleanCell checked={true} />
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-1">
                          Phone number
                        </td>
                        <BooleanCell checked={false} />
                        <BooleanCell checked={false} />
                        <BooleanCell checked={true} />
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-1">
                          Face or voice
                        </td>
                        <BooleanCell checked={false} />
                        <BooleanCell checked={true} />
                        <BooleanCell checked={true} />
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-1">
                          Precise location
                        </td>
                        <BooleanCell checked={false} />
                        <BooleanCell checked={false} />
                        <BooleanCell checked={true} />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-800">
                Please keep in mind that even if you are <em>allowed</em> to
                share something, that doesn't necessarily mean it's a good idea.
                Take caution to protect yourself. The moderation team will do
                their best to help assist you with this, but it is ultimately
                your responsibility.
              </p>
            </GuidelinePoint>
          </div>
        </Center>
      </div>
    </>
  );
}

interface SectionHeaderProps {
  children: React.ReactNode;
}

function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h2 className="mb-4 mt-12 text-center text-2xl font-bold">{children}</h2>
  );
}

interface BooleanCellProps {
  checked: boolean;
}

function BooleanCell({ checked }: BooleanCellProps) {
  return (
    <td
      className={classNames("border border-gray-300", {
        "bg-green-100": checked,
        "bg-red-100": !checked,
      })}
    >
      {checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mx-auto size-6 stroke-green-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mx-auto size-6 stroke-red-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      )}
    </td>
  );
}

interface GuidelinePointProps {
  title: string;
  positives?: string[];
  negatives?: string[];
  children?: React.ReactNode;
  className?: string;
}

function GuidelinePoint({
  title,
  positives,
  negatives,
  children,
  className,
}: GuidelinePointProps) {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-8">
      <h3 className="mb-6 text-center text-xl font-medium text-gray-700">
        {title}
      </h3>
      {children ?? (
        <div className={classNames("grid grid-cols-2 gap-8", className)}>
          <div>
            {positives && (
              <>
                <div className="mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="mr-1 size-5 fill-green-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <strong className="font-medium text-green-700">
                    How you can help
                  </strong>
                </div>

                <ul className="list-disc space-y-2 pl-6">
                  {positives.map((str) => (
                    <li key={str}>{str}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            {negatives && (
              <>
                <div className="mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="mr-1 size-5 fill-red-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <strong className="font-medium text-red-800">
                    Not allowed in our community
                  </strong>
                </div>

                <ul className="list-disc space-y-2 pl-6">
                  {negatives.map((str) => (
                    <li key={str}>{str}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface GuidelineSubpointProps {
  id: string;
  type: "positive" | "negative";
  children: React.ReactNode;
}

function GuidelineSubpoint({ id, type, children }: GuidelineSubpointProps) {
  return (
    <div
      id={id}
      className="scroll-m-20 rounded-lg border border-gray-300 bg-white px-4 py-2"
    >
      <div className="my-1 flex items-center justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className={classNames("mr-1 size-5", {
            "fill-green-700": type === "positive",
            "fill-red-800": type === "negative",
          })}
        >
          {type === "positive" ? (
            <path
              fillRule="evenodd"
              d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z"
              clipRule="evenodd"
            />
          )}
        </svg>

        <strong
          className={classNames("text-sm font-medium", {
            "text-green-700": type === "positive",
            "text-red-800": type === "negative",
          })}
        >
          {type === "positive"
            ? "How you can help"
            : "Not allowed in our community"}
        </strong>

        {id && (
          <Link
            href={`#${id}`}
            className="ml-auto text-xs text-gray-500 hover:underline"
          >
            #{id}
          </Link>
        )}
      </div>
      <div className="text-gray-800">
        <p>{children}</p>
      </div>
    </div>
  );
}
