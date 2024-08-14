import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskModal from "../TaskModal";
import { useTasks } from "../../../contexts/TaskContext";

// Mock the useTasks hook
jest.mock("../../../contexts/TaskContext");

describe("TaskModal", () => {
  const mockAddTask = jest.fn();
  const mockEditTask = jest.fn();
  const mockHideModal = jest.fn();
  const mockTasks = {
    todo: [{ id: "1", title: "Todo Task", parent_id: null }],
    inProgress: [],
    done: [],
  };

  beforeEach(() => {
    useTasks.mockReturnValue({
      isModalVisible: true,
      currentTask: null,
      tasks: mockTasks,
      addTask: mockAddTask,
      editTask: mockEditTask,
      hideModal: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Add Task modal with empty fields", () => {
    render(<TaskModal />);

    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task title").value).toBe("");
    expect(screen.getByPlaceholderText("Task description").value).toBe("");
    expect(screen.getByText("No Parent")).toBeInTheDocument();
  });

  it("should render the Edit Task modal with pre-filled fields when editing a task", () => {
    useTasks.mockReturnValue({
      isModalVisible: true,
      currentTask: {
        id: "2",
        title: "Existing Task",
        description: "This is an existing task",
        parent_id: null,
      },
      tasks: mockTasks,
      addTask: mockAddTask,
      editTask: mockEditTask,
      hideModal: jest.fn(),
    });

    render(<TaskModal />);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task title").value).toBe(
      "Existing Task",
    );
    expect(screen.getByPlaceholderText("Task description").value).toBe(
      "This is an existing task",
    );
  });

  it("should call addTask with correct data when adding a new task", () => {
    render(<TaskModal />);

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task description"), {
      target: { value: "New task description" },
    });

    fireEvent.click(screen.getByText("OK"));

    expect(mockAddTask).toHaveBeenCalledWith({
      title: "New Task",
      description: "New task description",
      parentId: null,
    });
  });

  it("should call editTask with correct data when editing an existing task", () => {
    useTasks.mockReturnValue({
      isModalVisible: true,
      currentTask: {
        id: "2",
        title: "Existing Task",
        description: "This is an existing task",
        parent_id: null,
      },
      tasks: mockTasks,
      addTask: mockAddTask,
      editTask: mockEditTask,
      hideModal: jest.fn(),
    });

    render(<TaskModal />);

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "Updated Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task description"), {
      target: { value: "Updated task description" },
    });

    fireEvent.click(screen.getByText("OK"));

    expect(mockEditTask).toHaveBeenCalledWith({
      id: "2",
      title: "Updated Task",
      description: "Updated task description",
      parentId: null,
      parent_id: null,
    });
  });
});
