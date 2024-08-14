import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";
import TaskCard from "../TaskCard";

// Mock the TaskCard component
jest.mock("../TaskCard", () => jest.fn(() => <div>Mocked TaskCard</div>));

describe("TaskList", () => {
  const mockTasks = [
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
    { id: "3", title: "Task 3", description: "Description 3" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a TaskCard for each task", () => {
    render(<TaskList tasks={mockTasks} />);

    expect(TaskCard).toHaveBeenCalledTimes(mockTasks.length);
    mockTasks.forEach((task, index) => {
      expect(TaskCard).toHaveBeenNthCalledWith(index + 1, { task }, {});
    });
  });

  it("should render nothing if tasks is an empty array", () => {
    render(<TaskList tasks={[]} />);

    expect(TaskCard).not.toHaveBeenCalled();
    expect(screen.queryByText("Mocked TaskCard")).toBeNull();
  });

  it("should render nothing if tasks is not provided", () => {
    render(<TaskList tasks={undefined} />);

    expect(TaskCard).not.toHaveBeenCalled();
    expect(screen.queryByText("Mocked TaskCard")).toBeNull();
  });
});
