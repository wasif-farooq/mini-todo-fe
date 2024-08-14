import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Main from "../Main";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mocking components to focus on structure rather than implementation details
jest.mock("../Header", () => () => <div>Mocked Header</div>);
jest.mock("../Footer", () => () => <div>Mocked Footer</div>);
jest.mock("../../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Main", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the AppHeader, children, and AppFooter when user is authenticated", () => {
    useAuth.mockReturnValue({ user: { name: "Test User" } });

    const { getByText } = render(
      <MemoryRouter>
        <Main>
          <div>Mocked Children</div>
        </Main>
      </MemoryRouter>,
    );

    expect(getByText("Mocked Header")).toBeInTheDocument();
    expect(getByText("Mocked Footer")).toBeInTheDocument();
    expect(getByText("Mocked Children")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should navigate to /login when user is not authenticated", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter>
        <Main>
          <div>Mocked Children</div>
        </Main>
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
