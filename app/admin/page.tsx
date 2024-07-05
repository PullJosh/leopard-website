import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="prose">
      <h1>Admin</h1>
      <ul>
        <li>
          <Link href="/admin/users">Users</Link>
        </li>
        <li>
          <Link href="/admin/projects">Projects</Link>
        </li>
      </ul>

      <h2>Moderation Tools</h2>
      <ul>
        <li>
          <Link href="/admin/projects/assetScan">
            Preview all uploaded assets
          </Link>
        </li>
      </ul>
    </div>
  );
}
