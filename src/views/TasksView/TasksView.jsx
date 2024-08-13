import React from "react";
import { Row, Col, Button } from "antd";
import { useTasks } from "../../contexts/TaskContext";
import TaskModal from "../../components/Task/TaskModal";
import TaskList from "../../components/Task/TaskList";

const TasksView = () => {
  const { showModal, tasks } = useTasks();

  return (
    <>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "20px" }}
      >
        Add Task
      </Button>

      <Row gutter={16}>
        {["todo", "inProgress", "done"].map((column) => (
          <Col span={8} key={column}>
            <h2 style={{ textAlign: "center" }}>
              {column === "todo"
                ? "To Do"
                : column === "inProgress"
                  ? "In Progress"
                  : "Done"}
            </h2>
            <div
              style={{
                backgroundColor: "#f0f2f5",
                padding: "20px",
                borderRadius: "8px",
                minHeight: "300px",
                maxHeight: "500px", // Set maximum height for the scrollable area
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              <TaskList tasks={tasks[column]} />
            </div>
          </Col>
        ))}
      </Row>

      <TaskModal />
    </>
  );
};

export default TasksView;
