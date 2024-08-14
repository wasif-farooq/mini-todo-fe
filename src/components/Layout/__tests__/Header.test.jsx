import React from "react";
import { render } from "@testing-library/react";
import AppHeader from "../Header";

describe("AppHeader", () => {
  it("should render the header with correct text", () => {
    const { getByText } = render(<AppHeader />);

    // Check if the header text is rendered correctly
    expect(getByText("My App Header")).toBeInTheDocument();
  });

  it("should have the correct styling", () => {
    const { container } = render(<AppHeader />);

    // Check if the header has the correct style
    const header = container.querySelector("header");
    expect(header).toHaveStyle("color: #fff");
  });
});
