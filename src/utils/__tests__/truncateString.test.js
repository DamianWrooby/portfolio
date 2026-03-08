import truncateString from "../truncateString";

describe("truncateString", () => {
	it("returns the string unchanged when shorter than maxLength", () => {
		expect(truncateString("hello", 10)).toBe("hello");
	});

	it("returns the string unchanged when equal to maxLength", () => {
		expect(truncateString("hello", 5)).toBe("hello");
	});

	it("truncates and appends ellipsis when longer than maxLength", () => {
		expect(truncateString("hello world", 5)).toBe("hello…");
	});

	it("returns empty string for empty input", () => {
		expect(truncateString("")).toBe("");
	});

	it("uses 50 as the default maxLength", () => {
		const exactly50 = "a".repeat(50);
		const longStr = "a".repeat(51);
		expect(truncateString(exactly50)).toBe(exactly50);
		expect(truncateString(longStr)).toBe("a".repeat(50) + "…");
	});
});
