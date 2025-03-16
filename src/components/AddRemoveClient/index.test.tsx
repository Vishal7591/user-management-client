import { render, fireEvent, act } from "@testing-library/react";
import { AddRemoveClient } from "./AddRemoveClient";
import { Provider } from "react-redux";
import { store } from "../../store/configureStore";

describe("AddRemoveClient", () => {
  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <AddRemoveClient />
      </Provider>
    );
  });

  it("displays the search input field", () => {
    const { getByPlaceholderText } = render(<AddRemoveClient />);
    const searchInput = getByPlaceholderText("Enter email here...");
    expect(searchInput).toBeInTheDocument();
  });

  it("updates the search input value", () => {
    const { getByPlaceholderText } = render(<AddRemoveClient />);
    const searchInput = getByPlaceholderText(
      "Enter email here..."
    ) as HTMLInputElement;
    act(() => {
      fireEvent.change(searchInput, {
        target: { value: "test@mailinator.com" }
      });
    });
    expect(searchInput.value).toBe("test@mailinator.com");
  });
});
