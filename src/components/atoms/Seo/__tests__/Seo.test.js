import { render } from "@testing-library/react";
import React from "react";
import { useStaticQuery } from "gatsby";
import Seo from "../Seo";

jest.mock("gatsby");

const mockQueryData = {
	site: {
		siteMetadata: {
			title: "Test Site",
			description: "A test site description",
			author: "Test Author",
			themeColor: "#16FFFF",
			keywords: ["portfolio", "developer"],
			siteUrl: "https://example.com",
		},
	},
	preview: {
		childImageSharp: {
			fluid: { src: "/static/preview.jpg" },
		},
	},
};

describe("Seo", () => {
	beforeEach(() => {
		useStaticQuery.mockReturnValue(mockQueryData);
	});

	it("renders without crashing", () => {
		expect(() => render(<Seo title="My Page" />)).not.toThrow();
	});

	it("renders with a custom description without crashing", () => {
		expect(() =>
			render(<Seo title="My Page" description="Custom description" />)
		).not.toThrow();
	});

	it("renders with a custom lang without crashing", () => {
		expect(() =>
			render(<Seo title="My Page" lang="pl" />)
		).not.toThrow();
	});
});
