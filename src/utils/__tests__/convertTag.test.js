const { convertToPath, convertToOriginal } = require("../convertTag");

describe("convertToPath", () => {
	it("converts a tag to lowercase", () => {
		expect(convertToPath("React")).toBe("react");
	});

	it("replaces the first space with a hyphen", () => {
		expect(convertToPath("node js")).toBe("node-js");
	});

	it("replaces the first dot with an underscore", () => {
		expect(convertToPath("Next.js")).toBe("next_js");
	});

	it("applies lowercase, then space→hyphen, then dot→underscore", () => {
		expect(convertToPath("C.NET")).toBe("c_net");
	});
});

describe("convertToOriginal", () => {
	it("replaces the first hyphen with a space", () => {
		expect(convertToOriginal("node-js")).toBe("node js");
	});

	it("replaces the first underscore with a dot", () => {
		expect(convertToOriginal("c_net")).toBe("c.net");
	});

	it("returns the string unchanged when no hyphen or underscore", () => {
		expect(convertToOriginal("react")).toBe("react");
	});
});
