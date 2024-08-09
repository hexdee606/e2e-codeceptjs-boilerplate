const I = actor();
const {assert} = require('chai'); // Import Chai assertion library for validating test conditions
const ExcelJS = require('exceljs'); // Import exceljs for reading and writing Excel files
const path = require('path'); // Import path module for handling and transforming file paths
const fs = require('fs'); // Import fs module for file system operations
const mongoose = require('mongoose');

/**
 * Utility class for common CodeceptJS operations.
 */
let common_codeceptjs_utils = {

    /**
     * Waits for an element to be visible and then clicks it.
     * @param {string} locator - The locator of the element to click.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndClick(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.click(locator);
    },

    /**
     * Waits for an element to be visible and then checks it if it is not already checked.
     * @param {string} locator - The locator of the element to check.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async waitAndChecked(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        const values = await I.grabCheckedElementStatus(locator);
        if (!values) {
            I.checkOption(locator);
        }
    },

    /**
     * Waits for an element to be visible and then unchecks it if it is checked.
     * @param {string} locator - The locator of the element to uncheck.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async waitAndUnchecked(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        const values = await I.grabCheckedElementStatus(locator);
        if (values) {
            I.uncheckOption(locator);
        }
    },

    /**
     * Waits for an element to be visible and then verifies its presence.
     * @param {string} locator - The locator of the element to verify.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndSee(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.retry(2).seeElement(locator);
    },

    /**
     * Waits for an element to be visible and fills it with text.
     * @param {string} locator - The locator of the element to fill.
     * @param {string} text - The text to fill the element with.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndFillField(locator, text, sec = 10) {
        I.waitForVisible(locator, sec);
        I.fillField(locator, text);
    },

    /**
     * Clears the contents of a field.
     * @param {string} locator - The locator of the field to clear.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    clearFields(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.click(locator);
        I.pressKey(['Control', 'A']);
        I.pressKey('Backspace');
    },

    /**
     * Waits for an element to be invisible and then asserts it is not visible.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitForInvisibleAndDontSee(locator, sec = 10) {
        I.waitForInvisible(locator, sec);
        I.dontSeeElement(locator);
    },

    /**
     * Waits for an element to be visible and asserts its text.
     * @param {string} text - The text to assert.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndAssertText(text, locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.seeTextEquals(text, locator);
    },

    /**
     * Waits for an element to be visible and retrieves its attribute value.
     * @param {string} attribute - The attribute to retrieve.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     * @returns {Promise<string>} The attribute value.
     */
    async waitAndGetTextFromAttribute(attribute, locator, sec = 10) {
        I.waitForVisible(locator, sec);
        return await I.grabAttributeFrom(locator, attribute);
    },

    /**
     * Waits for an element to be visible and retrieves its text content.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     * @returns {Promise<string[]>} The text content of the element.
     */
    async waitAndGetTextFromLocator(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        return await I.grabTextFromAll(locator);
    },

    /**
     * Verifies that a button is enabled by checking its aria-disabled attribute.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async verifyIsEnabled(locator, sec = 10) {
        await I.waitForVisible(locator, sec);
        const value = await I.grabAttributeFrom(locator, 'aria-disabled');
        await assert.equal(value[0], 'f');
    },

    /**
     * Verifies that a button is disabled by checking its aria-disabled attribute.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     * @returns {Promise<string>} The aria-disabled attribute value.
     */
    async verifyIsDisabled(locator, sec = 10) {
        await I.waitForVisible(locator, sec)
        const value = await I.grabAttributeFrom(locator, 'aria-disabled');
        assert.equal(value[0], 't');
        return value;
    },

    /**
     * Verifies that a button is selected by checking its selected attribute.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async verifyIsSelected(locator, sec = 10) {
        await I.waitForVisible(locator, sec)
        const value = await I.grabAttributeFrom(locator, 'selected');
        assert.equal(value[0], 'true');
    },
}

/**
 * Utility class for common browser storage values
 * */

let browser_storage_utils = {
    /**
     * Retrieves the Okta token from local storage.
     * @param {string} key - Specify the key name you want to grab
     * @param {string} prefix - Prefix to prepend to the token (e.g., 'Bearer ')
     * @returns {Promise<string>} The Okta token with the prefix.
     */
    async grabValueFromLocalStorage(key, prefix = 'Bearer ') {
        return prefix + await I.executeScript((key) => {
            const item = localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);
                return parsedItem.accessToken; // Assuming the token is directly under `accessToken`
            } else {
                throw new Error('Item not found in local storage');
            }
        }, key);
    },


    /**
     * Retrieves the service configuration from session storage.
     * @returns {Promise<string>} The service configuration.
     */
    async getServiceConfig() {
        const serviceConfig = await I.executeScript(() => JSON.parse(sessionStorage['serviceConfig']));
        return JSON.stringify(serviceConfig);
    },

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
}

/**
 * Utility class for common Excel operations.
 */


let excel_utils = {
    /**
     * Reads an Excel file and returns the workbook.
     * @param {string} filePath - Path to the Excel file.
     * @returns {Promise<ExcelJS.Workbook>} - The workbook object.
     */
    async readExcelFile(filePath) {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);
            return workbook;
        } catch (error) {
            console.error('Error reading Excel file:', error);
            throw error;
        }
    },

    /**
     * Writes data to an Excel file.
     * @param {string} filePath - Path to the Excel file.
     * @param {Array<Array<any>>} data - Data to write to the file, each sub-array represents a row.
     * @returns {Promise<void>}
     */
    async writeExcelFile(filePath, data) {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');
            data.forEach(row => worksheet.addRow(row));
            await workbook.xlsx.writeFile(filePath);
        } catch (error) {
            console.error('Error writing Excel file:', error);
            throw error;
        }
    },

    /**
     * Modifies an existing Excel file using a custom modification function.
     * @param {string} filePath - Path to the Excel file.
     * @param {Function} modifyFunction - Function to modify the workbook.
     * @returns {Promise<void>}
     */
    async modifyExcelFile(filePath, modifyFunction) {
        try {
            const workbook = await this.readExcelFile(filePath);
            await modifyFunction(workbook);
            await workbook.xlsx.writeFile(filePath);
        } catch (error) {
            console.error('Error modifying Excel file:', error);
            throw error;
        }
    },

    /**
     * Reads data from a specific worksheet and returns it as an array of arrays.
     * @param {ExcelJS.Workbook} workbook - The workbook object.
     * @param {string} sheetName - The name of the worksheet.
     * @returns {Array<Array<any>>} - The data from the worksheet.
     */
    getWorksheetData(workbook, sheetName) {
        const worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) {
            throw new Error(`Worksheet with name "${sheetName}" not found.`);
        }

        return worksheet.getSheetValues().slice(1); // Skip the header row
    },

    /**
     * Writes data to a specific worksheet in an existing workbook.
     * @param {ExcelJS.Workbook} workbook - The workbook object.
     * @param {string} sheetName - The name of the worksheet.
     * @param {Array<Array<any>>} data - Data to write to the worksheet.
     * @returns {Promise<void>}
     */
    async writeToWorksheet(workbook, sheetName, data) {
        let worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) {
            worksheet = workbook.addWorksheet(sheetName);
        }
        worksheet.clear(); // Clear existing data
        data.forEach(row => worksheet.addRow(row));
    },

    /**
     * Adds a new worksheet to an existing workbook.
     * @param {ExcelJS.Workbook} workbook - The workbook object.
     * @param {string} sheetName - The name of the new worksheet.
     * @param {Array<Array<any>>} [data=[]] - Optional data to populate the new worksheet.
     * @returns {ExcelJS.Worksheet} - The added worksheet.
     */
    addWorksheet(workbook, sheetName, data = []) {
        const worksheet = workbook.addWorksheet(sheetName);
        data.forEach(row => worksheet.addRow(row));
        return worksheet;
    },

    /**
     * Deletes a worksheet from the workbook.
     * @param {ExcelJS.Workbook} workbook - The workbook object.
     * @param {string} sheetName - The name of the worksheet to delete.
     */
    deleteWorksheet(workbook, sheetName) {
        const worksheet = workbook.getWorksheet(sheetName);
        if (worksheet) {
            workbook.removeWorksheet(worksheet.id);
        } else {
            console.warn(`Worksheet with name "${sheetName}" not found.`);
        }
    },

    /**
     * Transforms a table into an array of objects.
     * @param {Object} table - The table to transform.
     * @returns {Object[]} The transformed table.
     */
    transformTable(table) {
        const rows = table.rows;
        const headerRow = rows.shift().cells.map(cell => cell.value);
        return rows.map(row => {
            const obj = {};
            row.cells.forEach((cell, index) => {
                obj[headerRow[index]] = cell.value;
            });
            return obj;
        });
    },

    /**
     * Transforms an Excel table into an array of objects.
     * @param {string} fileName - The file path of the XLSX file.
     * @param {number|string} sheetNameOrNumber - The sheet name or index.
     * @param {number} [firstRow=1] - The first row to include.
     * @param {number} [lastRow] - The last row to include.
     * @returns {Promise<Object[]>} The transformed table.
     */
    async transformExcelTable(fileName, sheetNameOrNumber, firstRow = 1, lastRow) {
        try {
            const workbook = await this.readExcelFile(fileName);
            const worksheet = workbook.getWorksheet(sheetNameOrNumber);
            if (!worksheet) {
                throw new Error(`Worksheet with name or index "${sheetNameOrNumber}" not found.`);
            }

            let rows = worksheet.getSheetValues().slice(1); // Skip the header row
            if (firstRow > 1 || lastRow) {
                rows = rows.slice(firstRow - 1, lastRow);
            }

            const headerRow = rows.shift().slice(1); // Remove row number and header
            return rows.map(row => {
                const obj = {};
                row.slice(1).forEach((cell, index) => {
                    obj[headerRow[index]] = cell;
                });
                return obj;
            });
        } catch (error) {
            console.error('Error transforming Excel table:', error);
            throw error;
        }
    },

    /**
     * Transforms a CSV table into an array of objects.
     * @param {string} fileName - The file path of the CSV file.
     * @param {Object} option - The options for reading the CSV file.
     * @param {number} [firstRow=1] - The first row to include.
     * @param {number} [lastRow] - The last row to include.
     * @returns {Promise<Object[]>} The transformed table.
     */
    async transformTableFromCSV(fileName, option, firstRow = 1, lastRow) {
        try {
            const data = await this.readDownloadedCSVFile(fileName, option);
            let rows = data.slice(firstRow - 1, lastRow);

            const headerRow = rows.shift().slice(1); // Remove extra cell and header
            return rows.map(row => {
                const obj = {};
                row.slice(1).forEach((cell, index) => {
                    obj[headerRow[index]] = cell;
                });
                return obj;
            });
        } catch (error) {
            console.error('Error transforming CSV table:', error);
            throw error;
        }
    },

    // Placeholder for CSV file reading function, implementation required
    async readDownloadedCSVFile(fileName, option) {
        // Implement the CSV reading logic here, e.g., using a library like 'csv-parser'
        // Return the rows as an array of arrays or similar structure.
    }
}

// Export the utility classes
module.exports = {
    common_codeceptjs_utils,
    browser_storage_utils,
    excel_utils
};
