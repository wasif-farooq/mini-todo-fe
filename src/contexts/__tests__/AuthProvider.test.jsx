// AuthProvider.test.jsx
import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import authService from "../../services/AuthService";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line testing-library/prefer-screen-queries
// Mock the authService and toast
jest.mock("../../services/AuthService");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock useNavigate
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

const TestComponent = () => {
  const { user, loading, loginError, registerError, login, register, logout } =
    useAuth();

  return (
    <div>
      <div data-testid="user">{user ? user.name : "No User"}</div>
      <div data-testid="loading">{loading ? "Loading" : "Loaded"}</div>
      <div data-testid="loginError">{loginError || "No Login Error"}</div>
      <div data-testid="registerError">
        {registerError || "No Register Error"}
      </div>
      <button
        onClick={() => login("test@example.com", "password")}
        data-testid="login-button"
      >
        Login
      </button>
      <button
        onClick={() =>
          register({
            email: "test@example.com",
            password: "password",
            name: "Test User",
          })
        }
        data-testid="register-button"
      >
        Register
      </button>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("fetches user on mount", async () => {
    authService.me.mockResolvedValue({ user: { name: "Test User" } });

    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await waitFor(() =>
      expect(getByTestId("loading").textContent).toBe("Loaded"),
    );
    expect(getByTestId("user").textContent).toBe("Test User");
    expect(authService.me).toHaveBeenCalled();
  });

  test("handles fetch user error", async () => {
    authService.me.mockRejectedValue(new Error("Fetch Error"));

    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await waitFor(() =>
      expect(getByTestId("loading").textContent).toBe("Loaded"),
    );
    expect(getByTestId("user").textContent).toBe("No User");
    expect(toast.error).toHaveBeenCalledWith("Failed to fetch user data");
  });

  test("login success", async () => {
    authService.login.mockResolvedValue({ user: { name: "Logged In User" } });

    const { getByTestId, findByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await findByTestId("login-button");

    await act(async () => {
      getByTestId("login-button").click();
    });

    expect(authService.login).toHaveBeenCalledWith(
      "test@example.com",
      "password",
    );
    expect(getByTestId("user").textContent).toBe("Logged In User");
    expect(toast.error).toHaveBeenCalled();
  });
  //
  test("login failure", async () => {
    authService.login.mockRejectedValue(new Error("Login Error"));

    const { getByTestId, findByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await findByTestId("login-button");
    await act(async () => {
      getByTestId("login-button").click();
    });

    expect(authService.login).toHaveBeenCalledWith(
      "test@example.com",
      "password",
    );
    expect(getByTestId("loginError").textContent).toBe("Login failed");
    expect(toast.error).toHaveBeenCalledWith(
      "Login failed. Please check your credentials and try again.",
    );
  });

  test("register success", async () => {
    authService.register.mockResolvedValue({
      user: { name: "Registered User" },
    });

    const { getByTestId, findByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await findByTestId("register-button");
    await act(async () => {
      getByTestId("register-button").click();
    });

    expect(authService.register).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
      name: "Test User",
    });
    expect(getByTestId("user").textContent).toBe("Registered User");
    expect(toast.success).toHaveBeenCalledWith(
      "Registration successful. Welcome!",
    );
  });

  test("register failure", async () => {
    authService.register.mockRejectedValue(new Error("Register Error"));

    const { getByTestId, findByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await findByTestId("register-button");
    await act(async () => {
      getByTestId("register-button").click();
    });

    expect(authService.register).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
      name: "Test User",
    });
    expect(getByTestId("registerError").textContent).toBe(
      "Registration failed",
    );
    expect(toast.error).toHaveBeenCalledWith(
      "Registration failed. Please try again.",
    );
  });

  test("logout", async () => {
    authService.me.mockResolvedValue({ data: { user: { name: "Test User" } } });

    const { getByTestId, findByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    await findByTestId("logout-button");
    await waitFor(() =>
      expect(getByTestId("loading").textContent).toBe("Loaded"),
    );

    await act(async () => {
      getByTestId("logout-button").click();
    });

    expect(authService.logout).toHaveBeenCalled();
    expect(getByTestId("user").textContent).toBe("No User");
    expect(toast.success).toHaveBeenCalledWith("Successfully logged out");
  });
});
