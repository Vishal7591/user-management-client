import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Signup } from "../Signup";
import { signUpClient } from "../../slice/signUpSlice";
import "@testing-library/jest-dom";

jest.mock("../../slice/signUpSlice", () => ({
  signUpClient: jest.fn(),
}));

const renderWithProviders = (store: any) => {
  return render(
    <Provider store={store}>
      <Signup />
    </Provider>
  );
};

describe("Signup Component", () => {
  let store: any;

  it("renders all signup input fields and select", () => {
    renderWithProviders(store);

    expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter last name...")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter address...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter phone number...")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter password...")
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "" })).toBeInTheDocument();
  });

  it("disables register button if mandatory fields are empty", () => {
    renderWithProviders(store);

    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeDisabled();
  });

  it("enables register button when mandatory fields are filled", () => {
    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Enter name..."), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter last name..."), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter address..."), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "password123" },
    });

    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).not.toBeDisabled();
  });

  it("changes the role select value", () => {
    renderWithProviders(store);

    const roleSelect = screen.getByRole("combobox", { name: "" });

    fireEvent.change(roleSelect, { target: { value: "Editor" } });
    expect((roleSelect as HTMLSelectElement).value).toBe("Editor");
  });

  it("dispatches signUpClient on form submission", async () => {
    (signUpClient as any).mockImplementation(
      () => () => Promise.resolve({ payload: { name: "John" } })
    );

    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Enter name..."), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter last name..."), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter address..."), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "password123" },
    });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(signUpClient).toHaveBeenCalledWith({
        name: "John",
        lastName: "Doe",
        address: "123 Street",
        phoneNumber: "",
        email: "john@example.com",
        password: "password123",
        role: "Viewer",
      });
    });
  });

  it("shows error message if signup fails", async () => {
    (signUpClient as any).mockImplementation(
      () => () =>
        Promise.resolve({
          payload: { message: ["Email already exists"], statusCode: 409 },
        })
    );

    renderWithProviders(store);

    fireEvent.change(screen.getByPlaceholderText("Enter name..."), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter last name..."), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter address..."), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter email..."), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password..."), {
      target: { value: "password123" },
    });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("navigates back when 'Go Back' button is clicked", () => {
    renderWithProviders(store);

    const goBackButton = screen.getByRole("button", { name: "Go Back" });

    fireEvent.click(goBackButton);

    expect(window.history.length).toBeGreaterThan(0);
  });
});
