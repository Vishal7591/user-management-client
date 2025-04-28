import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Login } from "../Login";
import { loginClient } from "../../slice/loginSlice";
import "@testing-library/jest-dom";

jest.mock("../../slice/loginSlice", () => ({
  loginClient: jest.fn(),
}));

const renderWithProviders = (store: any) => {
  return render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

describe("Login Component", () => {
  let store: any;

  it("renders email and password input fields", () => {
    renderWithProviders(store);

    expect(screen.getByPlaceholderText("Enter email...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter password...")
    ).toBeInTheDocument();
  });

  it("disables login button when email or password is empty", () => {
    renderWithProviders(store);

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();
  });

  it("enables login button when email and password are filled", () => {
    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "password123" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).not.toBeDisabled();
  });

  it("dispatches login action on login button click", async () => {
    (loginClient as any).mockImplementation(
      () => () => Promise.resolve({ payload: { user: {} } })
    );

    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "password123" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginClient).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows error message if credentials are wrong", async () => {
    (loginClient as any).mockImplementation(
      () => () =>
        Promise.resolve({
          payload: { message: "Invalid credentials" },
        })
    );

    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "wrongpass" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("navigates to signup page on Signup button click", () => {
    renderWithProviders(store);

    const signupButton = screen.getByRole("button", { name: "Signup" });
    fireEvent.click(signupButton);

    expect(window.location.pathname).toBe("/signup");
  });
});
