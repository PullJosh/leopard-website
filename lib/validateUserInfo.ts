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

  if (!username.match(/^[a-zA-Z0-9_-]+$/g)) {
    errors.push(
      "Username can only contain letters (A-Z), numbers (0-9), underscores (_), and dashes (-)",
    );
    return errors;
  }

  if (username.match(/[_-]{2,}/g)) {
    errors.push(
      "Username cannot contain more than one special character in a row",
    );
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
