import { ContactSchemaEn, ContactSchemaPl } from "../ContactForm";

const validEn = {
	name: "John Doe",
	email: "john@example.com",
	message: "This is a valid message for the contact form.",
};

const validPl = {
	name: "Jan Kowalski",
	email: "jan@example.com",
	message: "To jest prawidłowa wiadomość do formularza.",
};

describe("ContactSchemaEn", () => {
	it("accepts fully valid data", async () => {
		await expect(ContactSchemaEn.isValid(validEn)).resolves.toBe(true);
	});

	it("rejects a missing name", async () => {
		await expect(
			ContactSchemaEn.validateAt("name", { ...validEn, name: "" })
		).rejects.toThrow("Your name is required!");
	});

	it("rejects a missing email", async () => {
		await expect(
			ContactSchemaEn.validateAt("email", { ...validEn, email: "" })
		).rejects.toThrow("Email address is required!");
	});

	it("rejects a malformed email address", async () => {
		await expect(
			ContactSchemaEn.validateAt("email", { ...validEn, email: "not-an-email" })
		).rejects.toThrow("Email address is invalid!");
	});

	it("rejects a message that is too short", async () => {
		await expect(
			ContactSchemaEn.validateAt("message", { ...validEn, message: "Short" })
		).rejects.toThrow("Message is too short!");
	});

	it("rejects a missing message", async () => {
		await expect(
			ContactSchemaEn.validateAt("message", { ...validEn, message: undefined })
		).rejects.toThrow("Message is required!");
	});
});

describe("ContactSchemaPl", () => {
	it("accepts fully valid data", async () => {
		await expect(ContactSchemaPl.isValid(validPl)).resolves.toBe(true);
	});

	it("rejects a missing name with a Polish error message", async () => {
		await expect(
			ContactSchemaPl.validateAt("name", { ...validPl, name: "" })
		).rejects.toThrow("Podaj swoje imię");
	});

	it("rejects a malformed email with a Polish error message", async () => {
		await expect(
			ContactSchemaPl.validateAt("email", { ...validPl, email: "not-an-email" })
		).rejects.toThrow("Adres email jest niepoprawny");
	});

	it("rejects a message that is too short with a Polish error message", async () => {
		await expect(
			ContactSchemaPl.validateAt("message", { ...validPl, message: "Krótko" })
		).rejects.toThrow("Wiadomość jest za krótka");
	});

	it("rejects a missing email with a Polish error message", async () => {
		await expect(
			ContactSchemaPl.validateAt("email", { ...validPl, email: "" })
		).rejects.toThrow("Wpisz swój adres email");
	});
});
