import React from "react";
import { render } from "@testing-library/react";
import Links from "../components/organisms/Navigation/Links";

test("Render Links component", () => {
  const { getByTestId } = render(<Links />);
  expect(getByTestId("Home")).toBeInTheDocument();
});
