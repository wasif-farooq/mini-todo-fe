import React from "react";
import { render } from "@testing-library/react";
import TasksPage from "../TasksPage";

//
// Mocking components to focus on structure rather than implementation details
jest.mock("../../components/Layout/Main", () => ({ children }) => (
  <div>Mocked Main {children}</div>
));
jest.mock("../../views/TasksView/TasksView", () => () => (
  <div>Mocked TasksView</div>
));
jest.mock("../../contexts/TaskContext", () => ({
  TaskProvider: ({ children }) => <div>Mocked TaskProvider {children}</div>,
}));

describe("TasksPage", () => {
  it("should render the Main component with TaskProvider and TasksView", () => {
    const { getByText } = render(<TasksPage />);

    // Check if the mocked components are rendered
    expect(getByText("Mocked Main")).toBeInTheDocument();
    expect(getByText("Mocked TaskProvider")).toBeInTheDocument();
    expect(getByText("Mocked TasksView")).toBeInTheDocument();
  });
});
