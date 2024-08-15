const {actor, Helper} = require("codeceptjs"); // Import environment configuration
const ExcelJS = require('exceljs'); // Import exceljs for reading and writing Excel files
const path = require('path'); // Import path module for handling and transforming file paths


class excel_utils extends Helper{
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
    }

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
    }

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
    }

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
    }

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
    }

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
    }

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
    }

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
    }

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
                new Error(`Worksheet with name or index "${sheetNameOrNumber}" not found.`);
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
    }

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
    }

    /**
     * Reads a CSV file and returns the data as an array of arrays.
     * @param {string} fileName - The name of the CSV file to read.
     * @param {object} [option] - Optional settings for parsing.
     * @returns {Promise<Array>} The rows of the CSV file as an array of arrays.
     */
    async readDownloadedCSVFile(fileName, option = {}) {
        const filePath = path.join(__dirname, fileName);
        const workbook = new ExcelJS.Workbook();
        const rows = [];

        await workbook.csv.readFile(filePath, option).then((worksheet) => {
            worksheet.eachRow({includeEmpty: true}, (row) => {
                rows.push(row.values.slice(1)); // `slice(1)` to remove the first empty value
            });
        });

        return rows;
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

module.exports = {
    excel_utils: new excel_utils()
}