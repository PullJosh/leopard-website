import Link from "next/link";
import prisma from "../../../lib/prisma";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      emails: {
        select: {
          address: true,
        },
      },
      role: true,
      birthdayMonth: true,
      createdAt: true,
    },
  });

  return (
    <div className="prose max-w-max">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
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
              <td>
                <Link href={`/admin/users/${user.id}`}>{user.id}</Link>
              </td>
              <td>
                <Link href={`/users/${user.username}`}>{user.username}</Link>
              </td>
              <td>{user.emails.map((email) => email.address).join(", ")}</td>
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
