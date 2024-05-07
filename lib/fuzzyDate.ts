export function relativeDateStr(date: Date, now = new Date()): string {
  now = stripTime(new Date());
  date = stripTime(date);

  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < -1) return `${-days} days from now`;
  if (days === -1) return "tomorrow";
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return dateFormatter.format(date);
}

function stripTime(originalDate: Date): Date {
  const date = new Date(originalDate);
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);
  return date;
}
