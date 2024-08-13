import React, { useState } from "react";
import { Button, Input, Form, Card, Row, Col, Spin } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const RegisterView = () => {
  const { register, registerError } = useAuth(); // Access the register function and error state from AuthContext
  const [submitting, setSubmitting] = useState(false); // State to manage submitting/loading state

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setSubmitting(true); // Set submitting state to true when form submission starts
    try {
      await register({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error); // Handle any errors (optional, since errors are managed in context)
    } finally {
      setSubmitting(false); // Reset submitting state after the registration attempt
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6} xxl={4}>
        <Card className="register-card">
          <h2 className="register-title">Register</h2>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={handleRegister} // Use the handleRegister function on form submission
            onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

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

            {registerError && (
              <Form.Item>
                <p style={{ color: "red" }}>{registerError}</p>{" "}
                {/* Display registration error if any */}
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
                disabled={submitting} // Disable the button while submitting
                block
              >
                {submitting ? <Spin /> : "Register"}{" "}
                {/* Show spinner while submitting */}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterView;
