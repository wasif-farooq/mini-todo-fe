import axios from "axios";

/**
 * HttpService class that handles API requests and can mock responses.
 * Implements the Singleton pattern to ensure only one instance of the service exists.
 */
class HttpService {
  constructor() {
    if (!HttpService.instance) {
      /**
       * Axios instance for making API requests.
       * @type {axios.AxiosInstance}
       */
      this.apiClient = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL, // Base URL for API requests from environment variables
        timeout: 1000, // Request timeout in milliseconds
        headers: {
          "Content-Type": "application/json", // Default headers for requests
          "Access-Control-Allow-Origin": "*", // Allow requests from any origin
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
          "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
        },
      });

      /**
       * Flag to enable or disable mock mode.
       * @type {boolean}
       */
      this.isMockEnabled = process.env.REACT_APP_MOCK_ENABLED === "true";

      /**
       * Base URL for fetching mock responses.
       * @type {string}
       */
      this.mockBaseURL = process.env.REACT_APP_MOCK_BASE_URL;

      /**
       * Set token from localStorage if available
       */
      const token = localStorage.getItem("authToken");
      if (token) {
        this.setAuthToken(token);
      }

      HttpService.instance = this;
    }

    return HttpService.instance;
  }

  /**
   * Enable or disable mock mode.
   * @param {boolean} enabled - Whether to enable mock mode.
   */
  setMockEnabled(enabled) {
    this.isMockEnabled = enabled;
  }

  /**
   * Set the base URL for fetching mock responses.
   * @param {string} url - The base URL for mock responses.
   */
  setMockBaseURL(url) {
    this.mockBaseURL = url;
  }

  /**
   * Set the authentication token for requests.
   * @param {string} token - The authentication token.
   */
  setAuthToken(token) {
    if (token) {
      this.apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    } else {
      delete this.apiClient.defaults.headers.common["Authorization"];
    }
  }

  /**
   * Fetch mock response for a given URL and method.
   * @param {string} url - The API endpoint URL.
   * @param {string} method - The HTTP method (e.g., 'get', 'post').
   * @returns {Promise<Object|null>} - The mock response data or null if not found.
   */
  async getMockResponse(url, method) {
    const mockUrl = `${this.mockBaseURL}/${url.split("?")?.[0].replace(/\//g, "-")}-${method}.json`;
    try {
      const response = await axios.get(mockUrl);
      return new Promise((resolve) => {
        setTimeout(() => resolve(response.data), 1000); // 1-minute delay
      });
    } catch (error) {
      console.error(`Mock file not found for ${url} with method ${method}`);
      return null; // Return null if mock file is not found
    }
  }

  /**
   * Make an API request with the specified method and URL, using mock data if enabled.
   * @param {string} method - The HTTP method (e.g., 'get', 'post').
   * @param {string} url - The API endpoint URL.
   * @param {Object} [data={}] - The request payload.
   * @returns {Promise<Object>} - The response data.
   * @throws {Error} - Throws an error if the API request fails.
   */
  async request(method, url, data = {}) {
    if (this.isMockEnabled) {
      const mockResponse = await this.getMockResponse(
        url,
        method.toLowerCase(),
      );
      if (mockResponse) {
        return Promise.resolve(mockResponse); // Return mock response if available
      }
    }

    try {
      const response = await this.apiClient.request({
        method,
        url,
        data,
      });
      return response.data; // Return actual API response data
    } catch (error) {
      throw error.response ? error.response.data : error; // Throw error if API request fails
    }
  }

  /**
   * Wrapper method for making GET requests.
   * @param {string} url - The API endpoint URL.
   * @param {Object} [params={}] - The query parameters for the GET request.
   * @returns {Promise<Object>} - The response data.
   */
  get(url, params = {}) {
    return this.request("get", url, { params });
  }

  /**
   * Wrapper method for making POST requests.
   * @param {string} url - The API endpoint URL.
   * @param {Object} data - The request payload.
   * @returns {Promise<Object>} - The response data.
   */
  post(url, data) {
    return this.request("post", url, data);
  }

  /**
   * Wrapper method for making PUT requests.
   * @param {string} url - The API endpoint URL.
   * @param {Object} data - The request payload.
   * @returns {Promise<Object>} - The response data.
   */
  put(url, data) {
    return this.request("put", url, data);
  }

  /**
   * Wrapper method for making DELETE requests.
   * @param {string} url - The API endpoint URL.
   * @param {Object} [data={}] - The request payload.
   * @returns {Promise<Object>} - The response data.
   */
  delete(url, data = {}) {
    return this.request("delete", url, data);
  }
}

// Create a singleton instance of HttpService
const httpService = new HttpService();

export default httpService;
