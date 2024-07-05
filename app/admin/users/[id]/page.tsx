import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import Link from "next/link";
import { getPreviewURL } from "../../../../lib/previewURLs";

interface AdminProjectPageProps {
  params: {
    id: string;
  };
}

export default async function AdminUserPage({
  params: { id },
}: AdminProjectPageProps) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      role: true,
      birthdayMonth: true,
      passwordHash: true,
      createdAt: true,
      emails: {
        select: {
          id: true,
          address: true,
          verified: true,
          verifiedAt: true,
          verificationToken: true,
          verificationSentAt: true,
        },
      },
      projects: {
        select: {
          id: true,
          title: true,
          scratchProjectId: true,
          createdAt: true,
          updatedAt: true,
          shared: true,
        },
      },
      sessions: {
        select: {
          id: true,
          token: true,
          expires: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="prose max-w-full">
      <h1>{user.username}</h1>
      <p>
        <Link href={`/users/${user.username}`}>View public profile</Link>
      </p>
      <ul>
        <li>
          <strong>ID:</strong> {user.id}
        </li>
        <li>
          <strong>Role:</strong> {user.role}
        </li>
        <li>
          <strong>Birthday Month:</strong>{" "}
          {user.birthdayMonth?.toLocaleDateString()}
        </li>
        <li>
          <strong>Created At:</strong> {user.createdAt.toLocaleDateString()}
        </li>
        <li>
          <strong>Password Hash:</strong> {user.passwordHash}
        </li>
      </ul>

      <h2>Emails</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Verified</th>
            <th>Verified At</th>
            <th>Verification Token</th>
            <th>Verification Sent At</th>
          </tr>
        </thead>
        <tbody>
          {user.emails.map((email) => (
            <tr key={email.id}>
              <td>{email.id}</td>
              <td>{email.address}</td>
              <td>{email.verified ? "Yes" : "No"}</td>
              <td>
                {email.verifiedAt
                  ? email.verifiedAt.toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{email.verificationToken}</td>
              <td>
                {email.verificationSentAt
                  ? email.verificationSentAt.toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Scratch Project ID</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Shared</th>
          </tr>
        </thead>
        <tbody>
          {user.projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href={`/admin/projects/${project.id}`}>{project.id}</Link>
              </td>
              <td>{project.title}</td>
              <td>{project.scratchProjectId}</td>
              <td>{project.createdAt.toLocaleDateString()}</td>
              <td>{project.updatedAt.toLocaleDateString()}</td>
              <td>{project.shared ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Sessions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Token</th>
            <th>Expires</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {user.sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>{session.token}</td>
              <td>
                {session.expires.toLocaleDateString()}{" "}
                {session.expires.toLocaleTimeString()}
              </td>
              <td>
                {session.createdAt.toLocaleDateString()}{" "}
                {session.createdAt.toLocaleTimeString()}
              </td>
              <td>
                {session.updatedAt.toLocaleDateString()}{" "}
                {session.updatedAt.toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
