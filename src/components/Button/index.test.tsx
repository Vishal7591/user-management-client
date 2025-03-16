import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import React from "react";

describe("Button", () => {
  it("renders the button component", () => {
    render(<Button>Submit</Button>);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders the button with additional className", () => {
    render(<Button className="button">Submit</Button>);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toHaveClass("button");
  });

  it("renders the disabled button", () => {
    render(<Button disabled>Submit</Button>);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeDisabled();
  });

  it("forwards the ref to the button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Submit</Button>);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});