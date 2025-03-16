import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with the provided value", () => {
    const value = "Hello, World!";
    render(<Input value={value} />);
    const inputElement = screen.getByDisplayValue(value);
    expect(inputElement).toBeInTheDocument();
  });

  it("applies the provided className", () => {
    const className = "inputfield";
    render(<Input className={className} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass(className);
  });

  it("renders with the provided placeholder", () => {
    const placeholder = "Enter your name";
    render(<Input placeholder={placeholder} />);
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange function when the input value changes", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const inputElement = screen.getByRole("textbox");
    const value = "New value";
    fireEvent.change(inputElement, { target: { value } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("passes other props to the input element", () => {
    const name = "email" as const;
    const placeholder = "Enter your email";
    render(<Input name={name} placeholder={placeholder} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("name", name);
    expect(inputElement).toHaveAttribute("placeholder", placeholder);
  });
});
