import React from "react";
import { Layout } from "antd";
import AppHeader from "../components/Layout/Header";
import TasksView from "../views/TasksView/TasksView";
import AppFooter from "../components/Layout/Footer";
import { TaskProvider } from "../contexts/TaskContext";

const TasksPage = () => (
  <Layout>
    <AppHeader />
    <Layout>
      <Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
        <TaskProvider>
          <TasksView />
        </TaskProvider>
      </Layout.Content>
    </Layout>
    <AppFooter />
  </Layout>
);

export default TasksPage;
