import React, { useState } from "react";
import { Button, Input, Form, Card, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../../contexts/AuthContext";

const LoginView = () => {
  const { login } = useAuth(); // Access the login function and error state from AuthContext
  const [submitting, setSubmitting] = useState(false); // State to manage submitting/loading state

  const handleLogin = async (values) => {
    setSubmitting(true); // Set submitting state to true when form submission starts
    try {
      await login(values.email, values.password); // Call the login function with form values
    } catch (error) {
      console.error("Login failed:", error); // Handle any errors (optional, since errors are managed in context)
    } finally {
      setSubmitting(false); // Reset submitting state after the login attempt
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6} xxl={4}>
        <Card className="login-card">
          <h2 className="login-title">Login</h2>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin} // Use the handleLogin function on form submission
            onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                disabled={submitting} // Disable the button while submitting
                block
              >
                {submitting ? <Spin /> : "Login"}{" "}
                {/* Show spinner while submitting */}
              </Button>
            </Form.Item>

            <Form.Item>
              <p>
                Don't have an account?{" "}
                <Link to="/register">Register here</Link>{" "}
              </p>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginView;

