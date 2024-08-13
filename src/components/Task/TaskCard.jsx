import React from "react";
import { Card, Dropdown, Menu, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTasks } from "../../contexts/TaskContext";
import dayjs from "dayjs";

const { Text, Title } = Typography;

const TaskCard = ({ task }) => {
  const { getParentTaskName, moveTask, deleteTask, setTaskForEditing } =
    useTasks();

  const handleMenuClick = (action) => {
    switch (action.key) {
      case "edit":
        setTaskForEditing(task);
        break;
      case "moveToInProgress":
        moveTask(task, "inProgress");
        break;
      case "moveToDone":
        moveTask(task, "done");
        break;
      case "moveToTodo":
        moveTask(task, "todo");
        break;
      case "delete":
        deleteTask(task);
        break;
      default:
        break;
    }
  };

  const renderTaskOptions = () => {
    const statusOptions = {
      todo: [{ key: "moveToInProgress", label: "Move to In Progress" }],
      inProgress: [
        { key: "moveToTodo", label: "Move to To Do" },
        { key: "moveToDone", label: "Move to Done" },
      ],
      done: [{ key: "moveToInProgress", label: "Move to In Progress" }],
    };

    return (
      <Menu onClick={(action) => handleMenuClick(action)}>
        <Menu.Item key="edit">Edit</Menu.Item>
        {statusOptions[
          task.status === "in_progress" ? "inProgress" : task.status
        ].map((option) => (
          <Menu.Item key={option.key}>{option.label}</Menu.Item>
        ))}
        <Menu.Item key="delete">Delete</Menu.Item>
      </Menu>
    );
  };

  return (
    <Card
      style={{ marginBottom: "8px" }}
      actions={[
        <Dropdown overlay={renderTaskOptions()} trigger={["click"]}>
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>,
      ]}
    >
      <Title level={4}>{task.title}</Title>
      <Text>{task.description}</Text>
      <Text type="secondary" style={{ display: "block", marginTop: "4px" }}>
        Created At: {dayjs(task.created_at).format("MMMM D, YYYY h:mm A")}
      </Text>
      {task.parentId && (
        <Text type="secondary" style={{ display: "block", marginTop: "4px" }}>
          Parent Task: {getParentTaskName(task.parentId)}
        </Text>
      )}
    </Card>
  );
};

export default TaskCard;
