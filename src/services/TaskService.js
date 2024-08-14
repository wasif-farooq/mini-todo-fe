import httpService from "../utils/http";

/**
 * TaskService class that handles task-related API requests.
 */
class TaskService {
  /**
   * Fetch all tasks.
   * @returns {Promise<Array>} - An array of tasks.
   */
  async getAll() {
    const response = await httpService.get("tasks");
    return response;
  }

  /**
   * Create a new task.
   * @param {Object} taskData - The data for the task to create.
   * @param {string} taskData.title - The title of the task.
   * @param {string} taskData.description - The description of the task.
   * @param {string} taskData.status - The status of the task (e.g., 'todo', 'inProgress', 'done').
   * @returns {Promise<Object>} - The response data.
   */
  async create(taskData) {
    const response = await httpService.post("tasks", taskData);
    return response;
  }

  /**
   * Delete a task.
   * @param {string} taskId - The ID of the task to delete.
   * @returns {Promise<Object>} - The response data.
   */
  async delete(taskId) {
    const response = await httpService.delete(`tasks/${taskId}`);
    return response;
  }

  /**
   * Update a task.
   * @param {string} taskId - The ID of the task to update.
   * @param {Object} taskData - The updated data for the task.
   * @returns {Promise<Object>} - The response data.
   */
  async update(taskId, taskData) {
    const response = await httpService.put(`tasks/${taskId}`, taskData);
    return response;
  }

  /**
   * Mark a task as "In Progress".
   * @param {string} taskId - The ID of the task to update.
   * @returns {Promise<Object>} - The response data.
   */
  async markAsInProgress(taskId) {
    const response = await httpService.put(`tasks/${taskId}/in-progress`);
    return response;
  }

  /**
   * Mark a task as "Done".
   * @param {string} taskId - The ID of the task to update.
   * @returns {Promise<Object>} - The response data.
   */
  async markAsDone(taskId) {
    const response = await httpService.put(`tasks/${taskId}/done`);
    return response;
  }

  /**
   * Mark a task as "To Do".
   * @param {string} taskId - The ID of the task to update.
   * @returns {Promise<Object>} - The response data.
   */
  async markAsTodo(taskId) {
    const response = await httpService.put(`tasks/${taskId}/todo`);
    return response;
  }
}

// Create a singleton instance of TaskService
const taskService = new TaskService();

export default taskService;
