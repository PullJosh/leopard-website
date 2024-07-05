import Link from "next/link";
import prisma from "../../../lib/prisma";
import classNames from "classnames";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      emails: {
        select: {
          id: true,
          address: true,
          verified: true,
        },
      },
      role: true,
      birthdayMonth: true,
      createdAt: true,
      _count: {
        select: {
          projects: true,
        },
      },
    },
  });

  const usersCount = users.length;
  const verifiedUsersCount = users.filter((u) =>
    u.emails.some((e) => e.verified),
  ).length;
  const unverifiedUsersCount = usersCount - verifiedUsersCount;

  const usersToday = users.filter(
    (u) => u.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000),
  ).length;

  return (
    <div className="prose max-w-full">
      <h1>Users ({usersCount})</h1>
      <p className="lead">
        {verifiedUsersCount} verified, {unverifiedUsersCount} unverified;{" "}
        {usersToday} registered in last 24 hours
      </p>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email(s)</th>
            <th>Role</th>
            <th>Birthday Month</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="align-middle">
                <Link href={`/users/${user.username}`}>{user.username}</Link>
                <div className="text-xs text-gray-500">{user.id}</div>
              </td>
              <td>
                <ul className="my-0 list-disc">
                  {user.emails.map((email) => (
                    <>
                      <li
                        key={email.id}
                        className={classNames("pl-0 marker:text-xl", {
                          "marker:text-red-600": !email.verified,
                          "marker:text-green-600": email.verified,
                        })}
                      >
                        <span>{email.address}</span>
                      </li>
                    </>
                  ))}
                </ul>
              </td>
              <td>{user.role}</td>
              <td>{user.birthdayMonth?.toLocaleDateString()}</td>
              <td>
                {user.createdAt.toLocaleDateString()}{" "}
                {user.createdAt.toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
