export function validateEmail(mail: string) {
  const emailRegex: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(emailRegex)) {
    return true;
  } else {
    return false;
  }
}
