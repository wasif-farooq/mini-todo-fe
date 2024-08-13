import React, { useState, useEffect } from "react";
import { Modal, Input, Select } from "antd";
import { useTasks } from "../../contexts/TaskContext";

const { Option } = Select;

const TaskModal = () => {
  const { isModalVisible, currentTask, tasks, addTask, editTask, hideModal } =
    useTasks();

  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [parentTaskId, setParentTaskId] = useState(null);

  useEffect(() => {
    if (currentTask) {
      setNewTask(currentTask.title);
      setDescription(currentTask.description || "");
      setParentTaskId(currentTask.parentId || null);
    } else {
      setNewTask("");
      setDescription("");
      setParentTaskId(null);
    }
  }, [currentTask]);

  const handleOk = () => {
    if (currentTask) {
      editTask({
        ...currentTask,
        title: newTask,
        description: description,
        parentId: parentTaskId,
      });
    } else {
      addTask({
        title: newTask,
        description: description,
        parentId: parentTaskId,
      });
    }
  };

  return (
    <Modal
      title={currentTask ? "Edit Task" : "Add Task"}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={hideModal}
    >
      <Input
        placeholder="Task title"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input.TextArea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Select
        placeholder="Select parent task (optional)"
        value={parentTaskId}
        onChange={(value) => setParentTaskId(value)}
        style={{ width: "100%" }}
      >
        <Option value={null}>No Parent</Option>
        {[...tasks.todo, ...tasks.inProgress, ...tasks.done]
          .filter((task) => task.parentId === null) // Only show tasks without parents
          .map((task) => (
            <Option key={task.id} value={task.id}>
              {task.title}
            </Option>
          ))}
      </Select>
    </Modal>
  );
};

export default TaskModal;
