import React from "react";
import { Layout } from "antd";
import AppHeader from "../components/Layout/Header";
import AppFooter from "../components/Layout/Footer";
import RegisterView from "../views/RegisterView/RegisterView";

const RegisterPage = () => (
  <Layout>
    <AppHeader />
    <RegisterView />
    <AppFooter />
  </Layout>
);

export default RegisterPage;
