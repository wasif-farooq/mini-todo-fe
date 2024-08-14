import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import taskService from "../services/TaskService";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getAll();
        const categorizedTasks = {
          todo: [],
          inProgress: [],
          done: [],
        };
        fetchedTasks.forEach((task) => {
          const status =
            task.status === "in_progress" ? "inProgress" : task.status;
          categorizedTasks[status].push(task);
        });
        setTasks(categorizedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast.error("Failed to fetch tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setCurrentTask(null);
  };

  const addTask = async (taskData) => {
    try {
      const createdTask = await taskService.create({
        ...taskData,
        parent_id: taskData.parentId || null,
        status: "todo",
      });
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, createdTask],
      }));
      hideModal();
      toast.success("Task added successfully.");
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const editTask = async (task) => {
    try {
      const updatedTask = await taskService.update(task.id, {
        ...task,
        parent_id: task.parentId || null,
        status: task.status === "inProgress" ? "in_progress" : task.status,
      });
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        console.log({ updatedTasks, task });
        const taskList =
          updatedTasks[
            task.status === "in_progress" ? "inProgress" : task.status
          ];
        console.log({ taskList });
        const taskIndex = taskList.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          taskList[taskIndex] = updatedTask;
        }
        return updatedTasks;
      });
      hideModal();
      toast.success("Task updated successfully.");
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const setTaskForEditing = (task) => {
    setCurrentTask(task);
    showModal();
  };

  const moveTask = async (task, newStatus) => {
    try {
      let updatedTask;
      if (newStatus === "inProgress") {
        updatedTask = await taskService.markAsInProgress(task.id);
      } else if (newStatus === "done") {
        updatedTask = await taskService.markAsDone(task.id);
      } else if (newStatus === "todo") {
        updatedTask = await taskService.markAsTodo(task.id);
      }

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        const taskList =
          updatedTasks[
            task.status === "in_progress" ? "inProgress" : task.status
          ];
        const taskIndex = taskList.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          taskList.splice(taskIndex, 1);
          updatedTasks[newStatus].push(updatedTask);
        }
        return updatedTasks;
      });
      toast.success(`Task moved to ${newStatus}.`);
    } catch (error) {
      console.error("Failed to move task:", error);
      toast.error("Failed to move task. Please try again.");
    }
  };

  const deleteTask = async (task) => {
    try {
      await taskService.delete(task.id);
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        const taskList =
          updatedTasks[
            task.status === "in_progress" ? "inProgress" : task.status
          ];
        const taskIndex = taskList.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          taskList.splice(taskIndex, 1);
        }
        // Also delete all subtasks of this task
        for (let status in updatedTasks) {
          updatedTasks[status] = updatedTasks[status].filter(
            (t) => t.parentId !== task.id,
          );
        }
        return updatedTasks;
      });
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const getParentTaskName = (parent) => {
    return parent ? parent.title : null;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isModalVisible,
        currentTask,
        showModal,
        hideModal,
        addTask,
        editTask,
        setTaskForEditing,
        moveTask,
        deleteTask,
        getParentTaskName,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
