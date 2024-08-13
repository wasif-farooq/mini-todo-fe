import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  return tasks.map((task) => <TaskCard key={task.id} task={task} />);
};

export default TaskList;
