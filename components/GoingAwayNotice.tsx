import classNames from "classnames";

export function GoingAwayNotice({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "space-y-3 rounded-lg border border-yellow-500 bg-yellow-200 p-4",
        className,
      )}
    >
      <h3 className="font-bold">The Leopard Editor is Going Away</h3>
      <p>
        Leopard will continue to exist, and you will still be able to convert
        projects to JavaScript.
      </p>
      <p>
        The editor built into the website will be removed soon because I no
        longer have access to free AWS credits needed to run it. (Running it at
        full cost would be about $80/month, which I can't justify paying.)
      </p>
    </div>
  );
}
