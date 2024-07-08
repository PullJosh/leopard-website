import classNames from "classnames";

interface CenterProps {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "wide";
}

export default function Center({
  children,
  className,
  width = "default",
}: CenterProps) {
  return (
    <div
      className={classNames(
        "mx-auto px-8",
        {
          "max-w-4xl": width === "default",
          "max-w-6xl": width === "wide",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
