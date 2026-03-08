import sortBy from "../sortBy";

describe("sortBy", () => {
	it("sorts an array of objects by a string key ascending", () => {
		const input = [{ name: "Zebra" }, { name: "Apple" }, { name: "Mango" }];
		const result = sortBy(input, "name");
		expect(result.map(x => x.name)).toEqual(["Apple", "Mango", "Zebra"]);
	});

	it("sorts an array of objects by a numeric key ascending", () => {
		const input = [{ order: 3 }, { order: 1 }, { order: 2 }];
		const result = sortBy(input, "order");
		expect(result.map(x => x.order)).toEqual([1, 2, 3]);
	});

	it("does not mutate the original array", () => {
		const input = [{ name: "Zebra" }, { name: "Apple" }];
		const snapshot = input.map(x => ({ ...x }));
		sortBy(input, "name");
		expect(input).toEqual(snapshot);
	});

	it("returns an empty array for empty input", () => {
		expect(sortBy([], "name")).toEqual([]);
	});

	it("handles equal values without error", () => {
		const input = [{ val: 1 }, { val: 1 }];
		expect(() => sortBy(input, "val")).not.toThrow();
	});
});
