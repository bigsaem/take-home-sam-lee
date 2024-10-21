import { render, fireEvent, screen } from "@testing-library/react";
import { SINValidator } from "./SinValidator"; // Adjust the import path
import { validateSIN } from "../lib/validateSIN"; // Mock this to control its behavior

jest.mock("../lib/validateSIN", () => ({
  validateSIN: jest.fn(),
}));

describe("SINValidator Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input and button", () => {
    render(<SINValidator />);

    const input = screen.getByPlaceholderText("Enter SIN (9 digits)");
    const button = screen.getByText("Validate SIN");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    render(<SINValidator />);

    const input = screen.getByPlaceholderText("Enter SIN (9 digits)");
    fireEvent.change(input, { target: { value: "123456789" } });

    expect(input).toHaveValue("123456789");
  });

  it("should set validation state to null on input change", () => {
    render(<SINValidator />);

    const input = screen.getByPlaceholderText("Enter SIN (9 digits)");
    fireEvent.change(input, { target: { value: "123" } });

    const button = screen.getByText("Validate SIN");
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "123456789" } });

    expect(screen.queryByText("Valid SIN")).not.toBeInTheDocument();
    expect(screen.queryByText("Invalid SIN")).not.toBeInTheDocument();
  });

  it('should show "Valid SIN" when SIN is valid', () => {
    (validateSIN as jest.Mock).mockReturnValue(true);

    render(<SINValidator />);

    const input = screen.getByPlaceholderText("Enter SIN (9 digits)");
    fireEvent.change(input, { target: { value: "046454286" } });

    const button = screen.getByText("Validate SIN");
    fireEvent.click(button);

    expect(screen.getByText("Valid SIN")).toBeInTheDocument();
    expect(screen.queryByText("Invalid SIN")).not.toBeInTheDocument();
  });

  it('should show "Invalid SIN" when SIN is invalid', () => {
    (validateSIN as jest.Mock).mockReturnValue(false);

    render(<SINValidator />);

    const input = screen.getByPlaceholderText("Enter SIN (9 digits)");
    fireEvent.change(input, { target: { value: "123456789" } });

    const button = screen.getByText("Validate SIN");
    fireEvent.click(button);

    expect(screen.getByText("Invalid SIN")).toBeInTheDocument();
    expect(screen.queryByText("Valid SIN")).not.toBeInTheDocument();
  });

  it("should not show any validation message when isValid is null", () => {
    render(<SINValidator />);

    const input = screen.getByPlaceholderText("Enter SIN (9 digits)");
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.queryByText("Valid SIN")).not.toBeInTheDocument();
    expect(screen.queryByText("Invalid SIN")).not.toBeInTheDocument();
  });
});
