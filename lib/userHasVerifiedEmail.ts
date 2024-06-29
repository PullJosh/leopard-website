import type { User } from "./getUser";

export function userHasVerifiedEmail(user: User): boolean {
  return user.emails.some((email) => email.verified);
}
