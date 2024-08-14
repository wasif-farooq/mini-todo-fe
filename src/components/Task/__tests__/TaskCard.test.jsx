import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../TaskCard";
import { useTasks } from "../../../contexts/TaskContext";

// Mock the useTasks hook to control its behavior during the test
jest.mock("../../../contexts/TaskContext");

describe("TaskCard", () => {
  const mockTask = {
    id: "1",
    title: "Test Task",
    description: "This is a test task",
    status: "todo",
    created_at: "2024-08-13T10:00:00Z",
    parent: {
      id: 2,
      title: "Parent Task",
    },
  };

  const mockMoveTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockSetTaskForEditing = jest.fn();

  beforeEach(() => {
    useTasks.mockReturnValue({
      getParentTaskName: jest.fn().mockReturnValue("Parent Task Name"),
      moveTask: mockMoveTask,
      deleteTask: mockDeleteTask,
      setTaskForEditing: mockSetTaskForEditing,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the task details correctly", () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test task")).toBeInTheDocument();
    expect(
      screen.getByText("Created At: August 13, 2024 3:00 PM"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Parent Task: Parent Task Name"),
    ).toBeInTheDocument();
  });

  it("should call setTaskForEditing when edit option is clicked", () => {
    render(<TaskCard task={mockTask} />);

    fireEvent.click(screen.getByRole("img", { "aria-label": /ellipsis/i }));
    fireEvent.click(screen.getByText("Edit"));

    expect(mockSetTaskForEditing).toHaveBeenCalledWith(mockTask);
  });

  it("should call moveTask with 'inProgress' when 'Move to In Progress' is clicked", () => {
    render(<TaskCard task={mockTask} />);

    fireEvent.click(screen.getByRole("img", { "aria-label": /ellipsis/i }));
    fireEvent.click(screen.getByText("Move to In Progress"));

    expect(mockMoveTask).toHaveBeenCalledWith(mockTask, "inProgress");
  });

  it("should call deleteTask when delete option is clicked", () => {
    render(<TaskCard task={mockTask} />);

    fireEvent.click(screen.getByRole("img", { "aria-label": /ellipsis/i }));
    fireEvent.click(screen.getByText("Delete"));

    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask);
  });

  it("should render the correct options based on task status", () => {
    const taskWithStatusInProgress = {
      ...mockTask,
      status: "in_progress",
    };

    render(<TaskCard task={taskWithStatusInProgress} />);

    fireEvent.click(screen.getByRole("img", { "aria-label": /ellipsis/i }));

    expect(screen.getByText("Move to To Do")).toBeInTheDocument();
    expect(screen.getByText("Move to Done")).toBeInTheDocument();
    expect(screen.queryByText("Move to In Progress")).not.toBeInTheDocument();
  });
});
