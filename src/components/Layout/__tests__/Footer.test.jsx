import React from "react";
import { render } from "@testing-library/react";
import AppFooter from "../Footer";

describe("AppFooter", () => {
  it("should render the footer with correct text", () => {
    const { getByText } = render(<AppFooter />);

    // Check if the footer text is rendered correctly
    expect(getByText("My App ©2024")).toBeInTheDocument();
  });

  it("should have the correct styling", () => {
    const { container } = render(<AppFooter />);

    // Check if the footer has the correct style
    const footer = container.querySelector("footer");
    expect(footer).toHaveStyle("text-align: center");
  });
});
