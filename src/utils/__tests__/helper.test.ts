import { validateEmail } from "../helper";

describe("validateEmail", () => {
  it("returns true for a valid email address", () => {
    const validEmails = [
      "test@mailinator.com",
      "user@domain.co",
      "vishal.saxena1234@gmail.com"
    ];

    validEmails.forEach(email => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  it("returns false for an invalid email address", () => {
    const invalidEmails = [
      "test",
      "user@",
      "vishal.saxena1234",
      "mailinator.com",
      "@domain.co"
    ];

    invalidEmails.forEach(email => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});
