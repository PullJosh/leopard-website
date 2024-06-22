import classNames from "classnames";

interface CenterProps {
  children: React.ReactNode;
  className?: string;
}

export default function Center({ children, className }: CenterProps) {
  return (
    <div className={classNames("mx-auto max-w-4xl px-8", className)}>
      {children}
    </div>
  );
}
