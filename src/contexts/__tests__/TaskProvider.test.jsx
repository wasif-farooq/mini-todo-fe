import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import { TaskProvider, useTasks } from "../TaskContext";
import taskService from "../../services/TaskService";
import { toast } from "react-toastify";

// Mock the taskService and toast
jest.mock("../../services/TaskService");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const TestComponent = () => {
  const { tasks, addTask, editTask, moveTask, deleteTask } = useTasks();

  return (
    <div>
      <button
        onClick={() =>
          addTask({ title: "New Task", description: "Task Description" })
        }
        data-testid="add-task-button"
      >
        Add Task
      </button>
      <button
        onClick={() =>
          editTask({ id: "1", title: "Updated Task", status: "todo" })
        }
        data-testid="edit-task-button"
      >
        Edit Task
      </button>
      <button
        onClick={() => moveTask({ id: "1", status: "todo" }, "done")}
        data-testid="move-task-button"
      >
        Move Task
      </button>
      <button
        onClick={() => deleteTask({ id: "1", status: "todo" })}
        data-testid="delete-task-button"
      >
        Delete Task
      </button>
      <div data-testid="tasks">{JSON.stringify(tasks)}</div>
    </div>
  );
};

describe("TaskProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches tasks on mount", async () => {
    taskService.getAll.mockResolvedValue([
      { id: "1", title: "Task 1", status: "todo" },
      { id: "2", title: "Task 2", status: "inProgress" },
    ]);

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("tasks").textContent).toContain("Task 1"),
    );
  });

  test("addTask success", async () => {
    taskService.create.mockResolvedValue({
      id: "3",
      title: "New Task",
      description: "Task Description",
      status: "todo",
    });

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>,
    );

    await act(async () => {
      screen.getByTestId("add-task-button").click();
    });

    expect(taskService.create).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
      parent_id: null,
      status: "todo",
    });

    await waitFor(() =>
      expect(screen.getByTestId("tasks").textContent).toContain("New Task"),
    );
    expect(toast.success).toHaveBeenCalledWith("Task added successfully.");
  });

  test("editTask success", async () => {
    taskService.getAll.mockResolvedValue([
      { id: "1", title: "Task 1", status: "todo" },
      { id: "2", title: "Task 2", status: "inProgress" },
    ]);

    taskService.update.mockResolvedValue({
      id: "1",
      title: "Updated Task",
      status: "todo",
    });

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>,
    );

    // await waitFor(() => expect(getByTestId("edit-task-button")).toBeInTheDocument());
    await act(async () => {
      screen.getByTestId("edit-task-button").click();
    });

    expect(taskService.update).toHaveBeenCalledWith("1", {
      id: "1",
      title: "Updated Task",
      parent_id: null,
      status: "todo",
    });

    await waitFor(() =>
      expect(screen.getByTestId("tasks").textContent).toContain("Updated Task"),
    );
    expect(toast.success).toHaveBeenCalledWith("Task updated successfully.");
  });

  test("moveTask success", async () => {
    taskService.markAsDone.mockResolvedValue({
      id: "1",
      title: "Task 1",
      status: "done",
    });

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>,
    );

    await act(async () => {
      screen.getByTestId("move-task-button").click();
    });

    expect(taskService.markAsDone).toHaveBeenCalledWith("1");

    await waitFor(() =>
      expect(screen.getByTestId("tasks").textContent).toContain("done"),
    );
    expect(toast.success).toHaveBeenCalledWith("Task moved to done.");
  });

  test("deleteTask success", async () => {
    taskService.delete.mockResolvedValue({});

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>,
    );

    await act(async () => {
      screen.getByTestId("delete-task-button").click();
    });

    expect(taskService.delete).toHaveBeenCalledWith("1");

    await waitFor(() =>
      expect(screen.getByTestId("tasks").textContent).not.toContain("Task 1"),
    );
    expect(toast.success).toHaveBeenCalledWith("Task deleted successfully.");
  });

  test("fetch tasks failure", async () => {
    taskService.getAll.mockRejectedValue(new Error("Fetch Error"));

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>,
    );

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to fetch tasks. Please try again later.",
      ),
    );
  });
});
