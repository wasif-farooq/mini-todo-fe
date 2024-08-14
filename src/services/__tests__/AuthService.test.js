import authService from "../AuthService";
import httpService from "../../utils/http";

// Mock the httpService to control its behavior during the tests
jest.mock("../../utils/http");

beforeEach(() => {
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem");
  jest.spyOn(Storage.prototype, "removeItem");
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});

describe("AuthService", () => {
  describe("login", () => {
    it("should call httpService.post with the correct data and store the token", async () => {
      const mockToken = "test-token";
      httpService.post.mockResolvedValue({ token: mockToken });

      const response = await authService.login(
        "test@example.com",
        "password123",
      );

      expect(httpService.post).toHaveBeenCalledWith("/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(localStorage.setItem).toHaveBeenCalledWith("authToken", mockToken);
      expect(httpService.setAuthToken).toHaveBeenCalledWith(mockToken);
      expect(response.token).toBe(mockToken);
    });
  });

  describe("register", () => {
    it("should call httpService.post with the correct data and store the token", async () => {
      const mockToken = "test-token";
      const userData = {
        email: "test@example.com",
        password: "password123",
        name: "John Doe",
      };
      httpService.post.mockResolvedValue({ token: mockToken });

      const response = await authService.register(userData);

      expect(httpService.post).toHaveBeenCalledWith("/register", userData);
      expect(localStorage.setItem).toHaveBeenCalledWith("authToken", mockToken);
      expect(httpService.setAuthToken).toHaveBeenCalledWith(mockToken);
      expect(response.token).toBe(mockToken);
    });
  });

  describe("me", () => {
    it("should call httpService.get to fetch the authenticated user's information", async () => {
      const mockUser = { id: 1, name: "John Doe", email: "test@example.com" };
      httpService.get.mockResolvedValue(mockUser);

      const response = await authService.me();

      expect(httpService.get).toHaveBeenCalledWith("auth/me");
      expect(response).toEqual(mockUser);
    });
  });

  describe("logout", () => {
    it("should remove the token from localStorage and clear the auth token from httpService", () => {
      authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
      expect(httpService.setAuthToken).toHaveBeenCalledWith(null);
    });
  });
});
