import React from "react";
import { Layout } from "antd";
import AppHeader from "../components/Layout/Header";
import AppFooter from "../components/Layout/Footer";
import LoginView from "../views/LoginView/LoginView";

const LoginPage = () => (
  <Layout>
    <AppHeader />
    <LoginView />
    <AppFooter />
  </Layout>
);

export default LoginPage;
