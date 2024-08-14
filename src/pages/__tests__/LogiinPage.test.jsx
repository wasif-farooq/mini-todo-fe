import React from "react";
import { render } from "@testing-library/react";
import LoginPage from "../LoginPage";

// eslint-disable-next-line testing-library/prefer-screen-queries
// Mocking components to avoid unnecessary rendering in the unit test
jest.mock("../../components/Layout/Header", () => () => (
  <div>Mocked Header</div>
));
jest.mock("../../components/Layout/Footer", () => () => (
  <div>Mocked Footer</div>
));
jest.mock("../../views/LoginView/LoginView", () => () => (
  <div>Mocked LoginView</div>
));

describe("LoginPage", () => {
  it("should render the AppHeader, LoginView, and AppFooter components", () => {
    const { getByText } = render(<LoginPage />);

    // Check if the mocked components are rendered
    expect(getByText("Mocked Header")).toBeInTheDocument();
    expect(getByText("Mocked Footer")).toBeInTheDocument();
    expect(getByText("Mocked LoginView")).toBeInTheDocument();
  });
});
