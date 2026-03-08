import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import useFilter from "../useFilter";

// Test wrapper component — renderHook is only available in @testing-library/react v13+
function TestWrapper({ initialValues }) {
	const [filters, filtersChangeHandler] = useFilter(initialValues);
	return (
		<div>
			<span data-testid="filters">{JSON.stringify(filters)}</span>
			<input
				data-testid="input"
				name="category"
				onChange={filtersChangeHandler}
			/>
		</div>
	);
}

describe("useFilter", () => {
	it("initialises state with the provided values", () => {
		render(
			<TestWrapper initialValues={{ category: "all", tag: "" }} />
		);
		expect(
			JSON.parse(screen.getByTestId("filters").textContent)
		).toEqual({ category: "all", tag: "" });
	});

	it("updates the matching key when filtersChangeHandler is called", () => {
		render(
			<TestWrapper initialValues={{ category: "all", tag: "" }} />
		);
		fireEvent.change(screen.getByTestId("input"), {
			target: { name: "category", value: "react" },
		});
		expect(
			JSON.parse(screen.getByTestId("filters").textContent)
		).toMatchObject({ category: "react" });
	});

	it("leaves other keys unchanged when one key is updated", () => {
		render(
			<TestWrapper initialValues={{ category: "all", tag: "css" }} />
		);
		fireEvent.change(screen.getByTestId("input"), {
			target: { name: "category", value: "react" },
		});
		expect(
			JSON.parse(screen.getByTestId("filters").textContent)
		).toMatchObject({ tag: "css" });
	});
});
