import taskService from "../TaskService";
import httpService from "../../utils/http";

// Mock the httpService to control its behavior during the tests
jest.mock("../../utils/http");

describe("TaskService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should call httpService.get and return the tasks", async () => {
      const mockTasks = [
        { id: "1", title: "Task 1", status: "todo" },
        { id: "2", title: "Task 2", status: "inProgress" },
      ];
      httpService.get.mockResolvedValue(mockTasks);

      const tasks = await taskService.getAll();

      expect(httpService.get).toHaveBeenCalledWith("tasks");
      expect(tasks).toEqual(mockTasks);
    });
  });

  describe("create", () => {
    it("should call httpService.post with the correct data and return the created task", async () => {
      const newTask = {
        title: "New Task",
        description: "New task description",
        status: "todo",
      };
      const mockResponse = { id: "3", ...newTask };
      httpService.post.mockResolvedValue(mockResponse);

      const response = await taskService.create(newTask);

      expect(httpService.post).toHaveBeenCalledWith("tasks", newTask);
      expect(response).toEqual(mockResponse);
    });
  });

  describe("delete", () => {
    it("should call httpService.delete with the correct taskId and return the response", async () => {
      const taskId = "1";
      const mockResponse = { success: true };
      httpService.delete.mockResolvedValue(mockResponse);

      const response = await taskService.delete(taskId);

      expect(httpService.delete).toHaveBeenCalledWith(`tasks/${taskId}`);
      expect(response).toEqual(mockResponse);
    });
  });

  describe("update", () => {
    it("should call httpService.put with the correct taskId and taskData and return the updated task", async () => {
      const taskId = "1";
      const updatedTaskData = {
        title: "Updated Task",
        description: "Updated task description",
        status: "inProgress",
      };
      const mockResponse = { id: taskId, ...updatedTaskData };
      httpService.put.mockResolvedValue(mockResponse);

      const response = await taskService.update(taskId, updatedTaskData);

      expect(httpService.put).toHaveBeenCalledWith(
        `tasks/${taskId}`,
        updatedTaskData,
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe("markAsInProgress", () => {
    it("should call httpService.put with the correct URL and return the updated task", async () => {
      const taskId = "1";
      const mockResponse = { id: taskId, status: "inProgress" };
      httpService.put.mockResolvedValue(mockResponse);

      const response = await taskService.markAsInProgress(taskId);

      expect(httpService.put).toHaveBeenCalledWith(
        `tasks/${taskId}/in-progress`,
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe("markAsDone", () => {
    it("should call httpService.put with the correct URL and return the updated task", async () => {
      const taskId = "1";
      const mockResponse = { id: taskId, status: "done" };
      httpService.put.mockResolvedValue(mockResponse);

      const response = await taskService.markAsDone(taskId);

      expect(httpService.put).toHaveBeenCalledWith(`tasks/${taskId}/done`);
      expect(response).toEqual(mockResponse);
    });
  });

  describe("markAsTodo", () => {
    it("should call httpService.put with the correct URL and return the updated task", async () => {
      const taskId = "1";
      const mockResponse = { id: taskId, status: "todo" };
      httpService.put.mockResolvedValue(mockResponse);

      const response = await taskService.markAsTodo(taskId);

      expect(httpService.put).toHaveBeenCalledWith(`tasks/${taskId}/todo`);
      expect(response).toEqual(mockResponse);
    });
  });
});
