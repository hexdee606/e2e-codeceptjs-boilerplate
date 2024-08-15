const {actor, Helper} = require("codeceptjs"); // Import environment configuration
const I = actor();

module.exports = new class browser_storage_utils extends Helper {
    constructor(config) {
        super(config);
    }

    /**
     * Retrieves all keys and their values from local storage and returns them as a JSON object.
     * @returns {Promise<Object>} A JSON object with local storage keys and their values.
     */
    async getLocalStorageKeysAndValues() {
        return await I.executeScript(() => {
            const localStorageData = {};
            // Iterate over all local storage items
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                // Attempt to parse the value as JSON if possible
                try {
                    localStorageData[key] = JSON.parse(value);
                } catch (e) {
                    // If parsing fails, store the raw value
                    localStorageData[key] = value;
                }
            }
            return localStorageData;
        });
    }

    /**
     * Retrieves all keys and their values from session storage and returns them as a JSON object.
     * @returns {Promise<Object>} A JSON object with session storage keys and their values.
     */
    async getSessionStorageKeysAndValues() {
        return await I.executeScript(() => {
            const sessionStorageData = {};
            // Iterate over all session storage items
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                // Attempt to parse the value as JSON if possible
                try {
                    sessionStorageData[key] = JSON.parse(value);
                } catch (e) {
                    // If parsing fails, store the raw value
                    sessionStorageData[key] = value;
                }
            }
            return sessionStorageData;
        });
    }
}