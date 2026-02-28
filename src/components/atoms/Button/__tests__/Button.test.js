import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../theme/mainTheme";
import Button from "../Button";

const renderWithTheme = ui =>
	render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("Button", () => {
	it("renders the label text", () => {
		renderWithTheme(<Button label="Click me" />);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("renders as a <button> element by default", () => {
		renderWithTheme(<Button label="Click me" />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("renders as an <a> element when renderAs='a'", () => {
		renderWithTheme(
			<Button label="Visit" renderAs="a" link="https://example.com" />
		);
		const el = screen.getByRole("link");
		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("href", "https://example.com");
		expect(el).toHaveAttribute("target", "_blank");
	});

	it("sets rel='noopener noreferrer' on link buttons", () => {
		renderWithTheme(
			<Button label="Visit" renderAs="a" link="https://example.com" />
		);
		expect(screen.getByRole("link")).toHaveAttribute(
			"rel",
			"noopener noreferrer"
		);
	});

	it("calls clickHandler when clicked", () => {
		const handler = jest.fn();
		renderWithTheme(<Button label="Click me" clickHandler={handler} />);
		fireEvent.click(screen.getByRole("button"));
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("renders 4 decorative span children", () => {
		const { container } = renderWithTheme(<Button label="Click me" />);
		expect(container.querySelectorAll("span")).toHaveLength(4);
	});
});
