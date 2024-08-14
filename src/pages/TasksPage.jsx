import React from "react";
import TasksView from "../views/TasksView/TasksView";
import { TaskProvider } from "../contexts/TaskContext";
import Main from "../components/Layout/Main";

const TasksPage = () => (
  <Main>
    <TaskProvider>
      <TasksView />
    </TaskProvider>
  </Main>
);

export default TasksPage;
