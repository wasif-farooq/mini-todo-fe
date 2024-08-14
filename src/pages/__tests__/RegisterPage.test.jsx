import React from "react";
import { render } from "@testing-library/react";
import RegisterPage from "../RegisterPage";

// Mocking components to avoid unnecessary rendering in the unit test
jest.mock("../../components/Layout/Header", () => () => (
  <div>Mocked Header</div>
));
jest.mock("../../components/Layout/Footer", () => () => (
  <div>Mocked Footer</div>
));
jest.mock("../../views/RegisterView/RegisterView", () => () => (
  <div>Mocked RegisterView</div>
));

describe("RegisterPage", () => {
  it("should render the AppHeader, RegisterView, and AppFooter components", () => {
    const { getByText } = render(<RegisterPage />);

    // Check if the mocked components are rendered
    expect(getByText("Mocked Header")).toBeInTheDocument();
    expect(getByText("Mocked Footer")).toBeInTheDocument();
    expect(getByText("Mocked RegisterView")).toBeInTheDocument();
  });
});
