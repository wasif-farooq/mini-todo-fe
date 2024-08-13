import httpService from "../utils/http";

/**
 * AuthService class that handles authentication-related API requests.
 */
class AuthService {
  /**
   * Login a user with email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} - The response data.
   */
  async login(email, password) {
    const data = { email, password };
    const response = await httpService.post("/login", data);
    const token = response.token;
    localStorage.setItem("authToken", token);
    httpService.setAuthToken(token);
    return response;
  }

  /**
   * Register a new user.
   * @param {Object} userData - The user registration data.
   * @param {string} userData.email - The user's email.
   * @param {string} userData.password - The user's password.
   * @param {string} userData.name - The user's name.
   * @returns {Promise<Object>} - The response data.
   */
  async register(userData) {
    const response = await httpService.post("/register", userData);
    const token = response.token;
    localStorage.setItem("authToken", token);
    httpService.setAuthToken(token);
    return response;
  }

  /**
   * Fetch the authenticated user's information.
   * @returns {Promise<Object>} - The response data.
   */
  async me() {
    return httpService.get("auth/me");
  }

  /**
   * Logout function.
   */
  logout() {
    localStorage.removeItem("authToken");
    httpService.setAuthToken(null);
  }
}

// Create a singleton instance of AuthService
const authService = new AuthService();

export default authService;
