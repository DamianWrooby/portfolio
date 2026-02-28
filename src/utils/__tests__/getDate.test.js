import getDate from "../getDate";

describe("getDate", () => {
	// Use a fixed date for deterministic assertions
	// new Date(2024, 0, 15) = January 15, 2024
	const date = new Date(2024, 0, 15);

	const EN_DAYS = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	const PL_DAYS = [
		"niedziela",
		"poniedziałek",
		"wtorek",
		"środa",
		"czwartek",
		"piątek",
		"sobota",
	];

	it("returns the correct date number", () => {
		expect(getDate(date, "en").date).toBe(15);
	});

	it("returns the correct year", () => {
		expect(getDate(date, "en").year).toBe(2024);
	});

	it("returns the correct month name in English", () => {
		expect(getDate(date, "en").month).toBe("january");
	});

	it("returns the correct month name in Polish", () => {
		expect(getDate(date, "pl").month).toBe("styczeń");
	});

	it("returns the correct day of the week in English", () => {
		expect(getDate(date, "en").day).toBe(EN_DAYS[date.getDay()]);
	});

	it("returns the correct day of the week in Polish", () => {
		expect(getDate(date, "pl").day).toBe(PL_DAYS[date.getDay()]);
	});

	it("returns all four expected keys", () => {
		const result = getDate(date, "en");
		expect(result).toHaveProperty("day");
		expect(result).toHaveProperty("date");
		expect(result).toHaveProperty("month");
		expect(result).toHaveProperty("year");
	});
});
