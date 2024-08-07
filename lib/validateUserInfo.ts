import { z } from "zod";

export function validateEmail(email: string): string[] {
  let errors: string[] = [];

  if (email.length === 0) {
    errors.push("You must provide an email address");
    return errors;
  }

  if (!z.string().email().safeParse(email).success) {
    errors.push("Invalid email address");
  }

  return errors;
}

export function validateUsername(username: string): string[] {
  let errors: string[] = [];

  if (username.length === 0) {
    errors.push("You must choose a username");
    return errors;
  }

  if (username.length >= 24) {
    errors.push("Username cannot be longer than 24 characters");
  }

  if (!username[0].match(/^[a-zA-Z]$/g)) {
    errors.push("Username must begin with a letter");
  }

  // Careful note: We want to make sure that usernames are never valid email addresses
  // (so that we can use the same input field for both when signing in). Right now
  // usernames cannot contain @ or ., so we're good.
  if (!username.match(/^[a-zA-Z0-9_-]+$/g)) {
    errors.push(
      "Username can only contain letters (A-Z), numbers (0-9), underscores (_), and dashes (-)",
    );
    return errors;
  }

  if (!username.match(/[a-zA-Z0-9]/g)) {
    errors.push("Username must contain at least one letter or number");
  }

  return errors;
}

export function validatePassword(password: string): string[] {
  let errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  return errors;
}

export function validateBirthdayMonth(birthday: string): string[] {
  let errors: string[] = [];

  if (birthday.length === 0) {
    errors.push("You must provide a birthday");
    return errors;
  }

  if (!/\d{4}-\d{2}/.test(birthday)) {
    errors.push("Birthday must include month and year");
  }

  const date = new Date(birthday);
  if (isNaN(date.getTime())) {
    errors.push("Invalid date");
  }

  const age = getAge(date);
  if (age < 0) {
    errors.push("Birthday cannot be in the future");
  } else if (age < 13) {
    errors.push("You must be at least 13 years old to create an account");
  } else if (age > 150) {
    errors.push("Please double-check your birthday");
  }

  return errors;
}

export function getAge(birthday: Date) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function isEmailAddress(emailOrUsername: string): boolean {
  return emailOrUsername.includes("@");
}
