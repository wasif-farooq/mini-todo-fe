import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const AppSidebar = () => (
  <Sider>
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  </Sider>
);

export default AppSidebar;
