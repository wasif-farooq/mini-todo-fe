import React, { useEffect } from "react";
import { Layout } from "antd";
import AppHeader from "./Header";
import AppFooter from "./Footer";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Main = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
          {children}
        </Layout.Content>
      </Layout>
      <AppFooter />
    </Layout>
  );
};

export default Main;
