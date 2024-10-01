import { screen, fireEvent, render } from "@testing-library/react";
import Dropdown from "./Dropdown";

const mockOnSelect = jest.fn();

const defaultProps = {
  options: ["frog", "bird", "ant"],
  placeholder: "Select an option",
  onSelect: mockOnSelect,
};

describe("Dropdown", () => {
  test("renders placeholder button", () => {
    render(<Dropdown {...defaultProps} />);

    expect(screen.getByText(`${defaultProps.placeholder}`)).toBeInTheDocument();
  });

  test("opens dropdown on click", () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(`${defaultProps.placeholder}`));

    defaultProps.options.map((option) =>
      expect(screen.getByText(option)).toBeInTheDocument()
    );
  });

  test("opens dropdown on spacebar press", () => {
    render(<Dropdown {...defaultProps} />);

    const dropdownButton = screen.getByText(`${defaultProps.placeholder}`);

    fireEvent.keyDown(dropdownButton, { key: " " });

    defaultProps.options.map((option) =>
      expect(screen.getByText(option)).toBeInTheDocument()
    );
  });

  test("opens dropdown on enter press", () => {
    render(<Dropdown {...defaultProps} />);

    const dropdownButton = screen.getByText(`${defaultProps.placeholder}`);

    fireEvent.keyDown(dropdownButton, { key: "Enter" });

    defaultProps.options.map((option) =>
      expect(screen.getByText(option)).toBeInTheDocument()
    );
  });

  test("calls onSelect with correct option with clicked", () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(`${defaultProps.placeholder}`));

    const option = defaultProps.options[0];

    fireEvent.click(screen.getByText(option));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);

    expect(mockOnSelect).toHaveBeenCalledWith(option);
  });

  test("calls onSelect with corect option on enter press", () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(`${defaultProps.placeholder}`));

    const option = defaultProps.options[0];

    fireEvent.keyDown(screen.getByText(option), { key: "Enter" });

    expect(mockOnSelect).toHaveBeenCalledTimes(1);

    expect(mockOnSelect).toHaveBeenCalledWith(option);
  });

  test("calls onSelect with correct option on spacebar press", () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(`${defaultProps.placeholder}`));

    const option = defaultProps.options[0];

    fireEvent.keyDown(screen.getByText(option), { key: " " });

    expect(mockOnSelect).toHaveBeenCalledTimes(1);

    expect(mockOnSelect).toHaveBeenCalledWith(option);
  });

  test("displays the selected option on the UI", () => {
    render(<Dropdown {...defaultProps} />);

    fireEvent.click(screen.getByText(`${defaultProps.placeholder}`));

    const option = defaultProps.options[0];

    fireEvent.click(screen.getByText(option));

    expect(screen.getByText(`Selected Option: ${option}`)).toBeInTheDocument();
  });
});
