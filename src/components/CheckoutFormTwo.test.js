import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutFormTwo from "./CheckoutFormTwo";

describe("CheckoutFormTwo", () => {
  test("renders form fields and submit button", () => {
    render(<CheckoutFormTwo />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Credit Card Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Credit Card Number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows error message on invalid submit", () => {
    render(<CheckoutFormTwo />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/Invalid Payment Data/i)).toBeInTheDocument();
  });

  test("submits form with valid data", () => {
    render(<CheckoutFormTwo />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "JohnDoe@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Credit Card Type/i), {
      target: { value: "Visa" },
    });
    fireEvent.change(screen.getByLabelText(/Credit Card Number/i), {
      target: { value: "1234123412341234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      screen.queryByText(/Invalid payment data. Please try again./i)
    ).not.toBeInTheDocument();
  });
});
