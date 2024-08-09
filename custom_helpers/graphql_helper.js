const I = actor();
const envURL = require('../config/env.conf'); // Import environment configuration

// Extract the base API endpoint for GraphQL from the environment configuration
const graphql_endpoint = envURL[envURL.env].services.end_point;

if (!graphql_endpoint) {
    throw new Error("GraphQL endpoint is not defined in the environment configuration.");
}

/**
 * GraphQL Helper class for managing GraphQL queries and mutations.
 */
class GraphQLHelper {
    constructor() {
        // Initialize common variables or settings
        this.defaultTimeout = 30000; // Default timeout for requests
    }

    /**
     * Sends a GraphQL query to the specified endpoint.
     *
     * @param {string} query - The GraphQL query string.
     * @param {Object} [variables={}] - Optional variables to include in the query.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    async sendQuery(query, variables = {}, headers = {}) {
        return await I.sendQuery(query, variables, {...this.defaultTimeout}, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending GraphQL query:", error);
                throw error;
            });
    }

    /**
     * Sends a GraphQL mutation to the specified endpoint.
     *
     * @param {string} mutation - The GraphQL mutation string.
     * @param {Object} [variables={}] - Optional variables to include in the mutation.
     * @param {Object} [headers={}] - Optional headers to include in the request.
     * @returns {Promise} - A promise that resolves with the response.
     */
    async sendMutation(mutation, variables = {}, headers = {}) {
        return await I.sendMutation(mutation, variables, {...this.defaultTimeout}, headers)
            .then(response => response)
            .catch(error => {
                console.error("Error sending GraphQL mutation:", error);
                throw error;
            });
    }

}

// Export an instance of the GraphQLHelper class
module.exports = new GraphQLHelper();
