const I = actor();
const {assert} = require('chai');
const Excel = require('exceljs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

class CommonUtils {




    /**
     * Recursively deletes a directory and its contents.
     * @param {string} dir - The directory to delete.
     */
    rmdir(dir) {
        const list = fs.readdirSync(dir);
        for (const filename of list) {
            const fullPath = path.join(dir, filename);
            const stat = fs.statSync(fullPath);
            if (fullPath === '.' || fullPath === '..') {
                continue;
            } else if (stat.isDirectory()) {
                this.rmdir(fullPath);
            } else {
                fs.unlinkSync(fullPath);
            }
        }
        fs.rmdirSync(dir);
    }

    /**
     * Replaces all occurrences of a term in a string with a replacement.
     * @param {string} str - The original string.
     * @param {string} term - The term to replace.
     * @param {string} replacement - The replacement term.
     * @returns {string} The modified string.
     */
    replaceAll(str, term, replacement) {
        return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }



    /**
     * Connects to MongoDB.
     * @param {string} mongoUrl - The MongoDB connection URL.
     */
    async connectWithMongoDB(mongoUrl) {
        try {
            await mongoose.connect(mongoUrl, {useNewUrlParser: true});
        } catch (error) {
            mongoose.connection.on('error', err => {
                console.error('MongoDB connection error:', err);
            });
        }
    }

    /**
     * Verifies the presence of text from an object array in the UI.
     * @param {Object} inputs - The object containing text to verify.
     */
    async verifyAssertTextWithArray(inputs) {
        const assertText = {};

        function recursiveTextGrab(obj, currentKey = '') {
            for (const key in obj) {
                const newKey = currentKey ? `${currentKey}.${key}` : key;
                if (typeof obj[key] === 'object') {
                    recursiveTextGrab(obj[key], newKey);
                } else {
                    assertText[newKey] = obj[key];
                }
            }
        }

        recursiveTextGrab(inputs);

        for (const key in assertText) {
            if (typeof assertText[key] === 'string') {
                await this.waitAndSee(`//*[contains(text(),'${assertText[key]}')] | //span[contains(.,'${assertText[key]}')] | //*[contains(@placeholder, "${assertText[key]}")]`, 30);
            } else if (Array.isArray(assertText[key])) {
                for (const text of assertText[key]) {
                    await this.waitAndSee(`//*[contains(text(),'${text}')] | //span[contains(.,'${text}')] | //*[contains(@placeholder, "${text}")]`, 30);
                }
            }
        }
    }

    /**
     * Converts an epoch date to a locale date string.
     * @param {number} epochDateAndTime - The epoch date and time.
     * @returns {string} The formatted date string.
     */
    getDateFromEpoch(epochDateAndTime) {
        const normalDate = new Date(epochDateAndTime);
        return normalDate.toLocaleDateString('en-GB');
    }

    /**
     * Rounds a number to a specified number of decimal places and formats it.
     * @param {number} value - The number to round.
     * @param {number} decimal - The number of decimal places.
     * @returns {string} The formatted number.
     */
    roundOfDecimal(value, decimal) {
        if (typeof value !== 'number' || isNaN(value)) {
            console.error('Invalid input. Please provide a valid number.');
            return ''; // Return an empty string for invalid inputs
        }

        const roundedValue = Number(value.toFixed(decimal));

        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        }).format(roundedValue);
    }

    /**
     * Verifies if a value is between a minimum and maximum range.
     * @param {number} value - The value to check.
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @param {boolean} [isFindBudget=false] - Flag indicating if it’s for budget finding.
     * @returns {boolean} True if the value is within the range, false otherwise.
     */
    verifyValueIsInBetween(value, min, max, isFindBudget = false) {
        if (value < min || value > max) {
            if (!isFindBudget) {
                throw new Error(`Value (${value}) is not between ${min} and ${max}.`);
            } else {
                return false;
            }
        } else {
            console.log(`Value (${value}) is between ${min} and ${max}.`);
            return true;
        }
    }

    /**
     * Finds the minimum and maximum values based on a budget and percentage.
     * @param {number} budget - The budget.
     * @param {number} percentage - The percentage to calculate the range.
     * @returns {Object} The minimum and maximum values.
     */
    findMinAndMaxValue(budget, percentage) {
        const percentDecimal = percentage / 100;
        const min = Math.round(budget - (percentDecimal * budget));
        const max = Math.round(budget + (percentDecimal * budget));
        return {min: Math.round(min), max: Math.round(max)};
    }

    /**
     * Wraps a string to a specified length, optionally including an ellipsis.
     * @param {string} string - The string to wrap.
     * @param {number} len - The length to wrap to.
     * @param {boolean} [includeEllipsis=false] - Whether to include an ellipsis.
     * @returns {string} The wrapped string.
     */
    charWrap(string, len, includeEllipsis = false) {
        if (string.length <= len) {
            return string;
        } else {
            if (includeEllipsis) {
                return string.substring(0, len) + '...';
            } else {
                return string.substring(0, len);
            }
        }
    }

    /**
     * Reads an Excel file and returns its contents as a JSON object.
     * @param {string} filePath - The path to the Excel file.
     * @param {number|string} workSheetIndexOrName - The index or name of the worksheet to read.
     * @returns {Promise<Object[]>} The JSON object representation of the worksheet data.
     */
    async readExcel(filePath, workSheetIndexOrName) {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(workSheetIndexOrName);
        if (!worksheet) {
            throw new Error(`Worksheet with index or name "${workSheetIndexOrName}" not found.`);
        }

        let data = [];
        worksheet.eachRow({includeEmpty: false}, (row) => {
            data.push(row.values);
        });

        if (data.length === 0) {
            throw new Error("The worksheet is empty.");
        }

        const headers = data[0].slice(1);

        return data.slice(1).map((row) => {
            let rowData = {};
            headers.forEach((header, colIndex) => {
                rowData[header] = row[colIndex + 1];
            });
            return rowData;
        });
    }
}

module.exports = CommonUtils;
