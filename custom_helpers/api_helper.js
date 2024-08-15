const {actor, Helper} = require("codeceptjs"); // Import environment configuration
const I = actor();

const envURL = require('../config/env.conf'); // Import environment configuration

// Extract the base API endpoint from the environment configuration
const api_endpoint = envURL[envURL.env].servers.end_point;

if (!api_endpoint) {
    throw new Error("API endpoint is not defined in the environment configuration.");
}

/**
 * API Helper class for managing API requests and configurations.
 */
class ApiHelper extends Helper{
    constructor(config) {
        super(config);
        // Initialize common variables or settings
    }

    /**
     * Constructs a full API URL by appending the given endpoint to the base API URL.
     *
     * @param {string} [endpoint="/"] - The specific endpoint to append to the base API URL. Defaults to "/" if not provided.
     * @returns {string} - The full API URL.
     */
    getBaseApiUrl(endpoint = "/") {
        const baseUrl = api_endpoint.endsWith("/") ? api_endpoint.slice(0, -1) : api_endpoint;
        const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
        return `${baseUrl}/${normalizedEndpoint}`;
    }

    /**
     * Sends an HTTP DELETE request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the DELETE request to.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    sendDeleteRequest(endpoint = "/", headers = {}) {
        return I.sendDeleteRequest(endpoint, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending DELETE request:", error);
                throw error;
            });
    }

    /**
     * Sends an HTTP GET request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the GET request to.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    sendGetRequest(endpoint = "/", headers = {}) {
        return I.sendGetRequest(endpoint, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending GET request:", error);
                throw error;
            });
    }

    /**
     * Sends an HTTP PATCH request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the PATCH request to.
     * @param {Object} [data={}] - Optional data to include in the request body.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    sendPatchRequest(endpoint = "/", data = {}, headers = {}) {
        return I.sendPatchRequest(endpoint, data, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending PATCH request:", error);
                throw error;
            });
    }

    /**
     * Sends an HTTP POST request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the POST request to.
     * @param {Object} [data={}] - Optional data to include in the request body.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    sendPostRequest(endpoint = "/", data = {}, headers = {}) {
        return I.sendPostRequest(endpoint, data, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending POST request:", error);
                throw error;
            });
    }

    /**
     * Sends an HTTP PUT request to the specified endpoint.
     *
     * @param {string} endpoint - The specific endpoint to send the PUT request to.
     * @param {Object} [data={}] - Optional data to include in the request body.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    sendPutRequest(endpoint = "/", data = {}, headers = {}) {
        return I.sendPutRequest(endpoint, data, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending PUT request:", error);
                throw error;
            });
    }
}

// Export an instance of the ApiHelper class
module.exports = new ApiHelper();
