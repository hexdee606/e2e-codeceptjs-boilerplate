# 🚀 Automation Framework with CodeceptJS, Playwright, and CucumberJS

### Automation Framework

![Under Development](https://img.shields.io/badge/status-under--development-yellow)
![Playwright](https://img.shields.io/badge/playwright-v1.45.3-blue?logo=playwright)
![CodeceptJS](https://img.shields.io/badge/codeceptjs-v3.6.5-green?logo=codeceptjs)
![CucumberJS](https://img.shields.io/badge/cucumber-v6.0.7-brightgreen?logo=cucumber)
![Node](https://img.shields.io/badge/node-%3E%3D20.16.0-orange?logo=node.js)
![NPM](https://img.shields.io/badge/npm-%3E%3D10.8.1-red?logo=npm)

### Dependencies

![Axios](https://img.shields.io/badge/axios-v1.7.3-blue?logo=axios)
![Chai](https://img.shields.io/badge/chai-v4.5.0-red?logo=chai)
![ExcelJS](https://img.shields.io/badge/exceljs-v4.4.0-yellow?logo=exceljs)
![Import-Export](https://img.shields.io/badge/import--export-v1.0.1-lightgrey?logo=import-export)
![Mongoose](https://img.shields.io/badge/mongoose-v8.5.2-green?logo=mongoose)
![Puppeteer-Core](https://img.shields.io/badge/puppeteer--core-v22.15.0-lightblue?logo=puppeteer)

### Dev Dependencies

![Allure-Legacy](https://img.shields.io/badge/allure--legacy-v1.0.2-brightgreen?logo=allure)
![Types-Node](https://img.shields.io/badge/@types--node-v22.1.0-blue?logo=typescript)
![Allure-Commandline](https://img.shields.io/badge/allure--commandline-v2.29.0-orange?logo=allure)
![Allure-Playwright](https://img.shields.io/badge/allure--playwright-v3.0.0--beta.7-yellow?logo=allure)
![BrowserLogs-Plugin](https://img.shields.io/badge/browserlogs--plugin-v1.0.5-red?logo=browserlogs)
![Debug](https://img.shields.io/badge/debug-v4.3.6-lightgrey?logo=debug)
![Moment](https://img.shields.io/badge/moment-v2.30.1-blue?logo=moment)
![ESLint](https://img.shields.io/badge/eslint-v9.8.0-purple?logo=eslint)

### Available Scripts

- ![Run Tests](https://img.shields.io/badge/-run--tests-blue): `npm run test:run` - Run the tests with debugging.
- ![Serve Allure Report](https://img.shields.io/badge/-serve--allure--report-yellow): `npm run test:report-serve` - Serve the Allure report.
- ![Debug Tests](https://img.shields.io/badge/-debug--tests-green): `npm run test:debug` - Run tests with the `@debug` tag.
- ![Generate Allure Report](https://img.shields.io/badge/-generate--allure--report-orange): `npm run test:report-generate` - Generate the Allure report.
- ![Run E2E Tests](https://img.shields.io/badge/-run--e2e--tests-purple): `npm run test:e2e` - Run end-to-end tests.
- ![Run Parallel Tests](https://img.shields.io/badge/-run--parallel--tests-red): `npm run test:parallel` - Run tests in parallel.
- ![Open Allure Report](https://img.shields.io/badge/-open--allure--report-brightgreen): `npm run test:report-open` - Open the generated Allure report.


## 📖 Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installing Dependencies](#installing-dependencies)
  - [Configuring Playwright](#configuring-playwright)
- [Configuration](#configuration)
  - [Overview of Configuration Files](#overview-of-configuration-files)
  - [CodeceptJS Configuration](#codeceptjs-configuration)
  - [Playwright Configuration](#playwright-configuration)
  - [Environment Configuration](#environment-configuration)
  - [Plugins Configuration](#plugins-configuration)
  - [Global Variables Configuration](#global-variables-configuration)
  - [Step Definitions and Support Files](#step-definitions-and-support-files)
- [Custom Helpers](#custom-helpers)
- [Running Tests](#running-tests)
  - [Running Tests Locally](#running-tests-locally)
  - [Running in Headless Mode](#running-in-headless-mode)
  - [Parallel Test Execution](#parallel-test-execution)
- [Test Reporting](#test-reporting)
  - [Mochawesome Reports](#mochawesome-reports)
  - [Allure Reports](#allure-reports)
- [Debugging and Troubleshooting](#debugging-and-troubleshooting)
  - [Enabling Debug Mode](#enabling-debug-mode)
  - [Screenshots on Failure](#screenshots-on-failure)
  - [Capturing Browser Logs](#capturing-browser-logs)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Support](#support)
- [License](#license)

## Introduction

Welcome to the **Automation Framework**, a powerful, scalable, and customizable solution built using [CodeceptJS](https://codecept.io), [Playwright](https://playwright.dev), and [CucumberJS](https://cucumber.io). This framework is designed to streamline the process of end-to-end (E2E) testing for web applications, enabling seamless integration, robust testing, and detailed reporting.

## Prerequisites

Before setting up the framework, ensure you have the following installed on your local machine:

- **Node.js**: Version 14.x or higher (Recommended: >= 20.16.0).
- **NPM**: Version 6.x or higher (Recommended: >= 10.8.1).
- **Git**: For version control and to clone the repository.

To verify that these are installed correctly, run the following commands:

```bash
node -v
npm -v
git --version
```

## Project Setup

### Cloning the Repository

Start by cloning the repository to your local machine. This will allow you to have a copy of the project that you can work on.

```bash
git clone https://github.com/hexdee606/e2e-codeceptjs-boilerplate.git
cd e2e-codeceptjs-boilerplate
```

### Installing Dependencies

Next, install all the necessary dependencies required by the project. This includes CodeceptJS, Playwright, CucumberJS, and other supporting libraries.

```bash
npm install
```

### Configuring Playwright

After installing the dependencies, you need to configure Playwright by installing the required browser binaries. This step ensures that Playwright can run tests across different browsers.

```bash
npx playwright install
```

## Configuration

### Overview of Configuration Files

This framework is highly configurable. Below is a brief overview of the key configuration files:

- **codecept.conf.js**: Main configuration file for CodeceptJS, including helper settings and plugins.
- **playwright.conf.js**: Configuration for Playwright, defining browser settings.
- **env.conf.js**: Environment-specific configurations like URLs and API endpoints.
- **plugins.conf.js**: Configuration for various plugins used in the framework.
- **global.variables.conf.js**: Defines global variables that are accessible throughout the tests.

### CodeceptJS Configuration

The central configuration file, `codecept.conf.js`, is where you define the test settings, helpers, plugins, and other global configurations.

```javascript
exports.config = {
  output: './outputs',
  helpers: {
    Playwright: require('./config/playwright.conf'),
    REST: require('./config/rest.conf'),
    GraphQL: require('./config/graphql.conf'),
    FileSystem: {}
  },
  include: require('./config/include.conf'),
  mocha: require('./config/mocha.conf'),
  bootstrap: null,
  plugins: require('./config/plugins.conf'),
  timeout: 15000,
  gherkin: require('./config/gherkin.conf'),
  stepTimeout: 5000,
  retryFailedStep: {
    enabled: true,
    retries: 2
  },
  multiple: require('./config/multiple.conf'),
  name: 'automation-framework'
};
```

This file includes all the necessary configurations for CodeceptJS, such as the directories for outputs, the helpers you’re using, and plugin configurations.

### Playwright Configuration

Located in `config/playwright.conf.js`, this file contains browser settings like headless mode, browser type, and timeouts. Playwright enables testing across Chromium, Firefox, and WebKit.

```javascript
module.exports = {
  url: 'http://localhost',
  show: false, // Set to true to show the browser during testing
  browser: 'chromium', // Can be 'chromium', 'firefox', 'webkit'
  waitForTimeout: 15000, // Default wait time
  restart: true, // Restart the browser between tests
  windowSize: '1280x1024'
};
```

This file controls how Playwright interacts with the browsers. You can adjust settings to run tests in headless mode or with a visible browser window.

### Environment Configuration

The `env.conf.js` file defines environment-specific configurations like URLs for different environments (e.g., development, staging, production).

```javascript
const envConf = {
  'env': process.env.E2E_ENV || 'int',
  'int': {
    'web': {
      host_url: 'https://automationexercise.com'
    },
    'restApi': {
      end_point: 'https://petstore.swagger.io/v2'
    },
    'gql': {
      end_point: 'https://graphqlzero.almansi.me/api'
    }
  }
};

module.exports = envConf;
```

This setup allows you to easily switch environments by changing the `E2E_ENV` variable, making it easy to run tests against different environments without modifying the code.

### Plugins Configuration

The plugins used in this framework enhance functionality like reporting, retrying failed steps, and capturing screenshots. The `plugins.conf.js` file configures these plugins.

```javascript
module.exports = {
  allure: {
    enabled: true,
    outputDir: './outputs/allure-results',
    require: '@codeceptjs/allure-legacy'
  },
  retryFailedStep: {
    enabled: true,
    retries: 3
  },
  stepByStepReport: {
    enabled: true,
    screenshotsForAllFailures: true,
    onFail: true
  },
  screenshotOnFail: {
    enabled: true,
    path: './outputs/screenshots',
    fullPage: true,
    uniqueNames: true,
    keepSuccessfulScreenshots: false,
    quality: 80,
    format: 'png'
  },
  BrowserLogsOnFail: {
    enabled: true,
    uniqueNames: true,
    require: 'codeceptjs-browserlogs-plugin',
    path: './outputs/logs',
    includeConsoleLog: true,
    includeNetworkLog: true,
    includeErrorLog: true,
    logFormat: 'json',
    maxLogEntries: 1000,
    filterLogTypes: ['error', 'warn']
  }
};
```

This file allows you to configure how and when reports, screenshots, and logs are generated, and which plugins are active.

### Global Variables Configuration

The `global.variables.conf.js` file defines global variables that can be accessed throughout your tests. This is especially useful for defining reusable constants, URLs, or utility functions that are needed across multiple test cases.

```javascript
global.api_helper = require("../custom_helpers/api_helper");
global.browser_storage_utils = require("../custom_helpers/browser_storage_utils");
global.common_codeceptjs_utils = require("../custom_helpers/common_codeceptjs_utils");
global.common_utils = require("../custom_helpers/common_utils");
global.excel_utils = require("../custom_helpers/excel_utils");
global.graphql_helper = require("../custom_helpers/graphql_helper");
global.keyboard_utils = require("../custom_helpers/keyboard_utils");
global.strings_data = require("../custom_helpers/strings_data");
global.test_data = require("../custom_helpers/test_data");
global.variables = require("../custom_helpers/variables");
```

This configuration imports various custom helper modules, making them globally available in your test scripts. This eliminates the need for repeated imports and promotes code reusability.

### Step Definitions and Support Files

The `include.conf.js` file is where you configure the paths to your step definitions and support files:

```javascript
module.exports = {
  I: './steps_file.js',
  page: './src/pages/*_page.js',
};
```

This file tells CodeceptJS where to find the step definitions (`steps_file.js`) and page objects (`*_page.js`). Step definitions contain the implementation of the steps written in your Gherkin files, while page objects encapsulate page-specific actions.

## Custom Helpers

Custom helpers in this framework extend CodeceptJS with additional functionalities. These helpers are located in the `custom_helpers/` directory.

### Example: API Helper

The `api_helper.js` file provides a set of functions to handle API interactions, making it easier to send GET, POST, PUT, DELETE requests from your tests.

```javascript
class ApiHelper extends Helper {
  async sendGetRequest(endpoint, headers = {}) {
    const I = actor();
    return I.sendGetRequest(endpoint, headers);
  }
}
```

This helper centralizes all API-related methods, ensuring that your test code remains clean and focused on the logic rather than the specifics of HTTP requests.

### Example: Browser Storage Utils

The `browser_storage_utils.js` file provides utility functions for interacting with browser storage (localStorage and sessionStorage).

```javascript
class BrowserStorageUtils extends Helper {
  async getLocalStorageKeysAndValues() {
    return await I.executeScript(() => {
      const localStorageData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData[key] = value;
      }
      return localStorageData;
    });
  }
}
```

This helper allows you to programmatically interact with browser storage during your tests, enabling you to verify that the correct data is being stored or retrieved.

## Running Tests

### Running Tests Locally

You can run all tests locally using the default command:

```bash
npm test
```

This will execute all test scenarios defined in your project.

### Running in Headless Mode

To run tests in headless mode (without opening a browser window):

```bash
npm run test:headless
```

This is useful for running tests in CI/CD pipelines or when you don’t need to see the browser's UI.

### Parallel Test Execution

You can configure and run tests in parallel across multiple browsers or environments by leveraging the `multiple` configuration:

```bash
npm run test:parallel
```

This reduces test execution time significantly by running tests concurrently.

## Test Reporting

### Mochawesome Reports

Mochawesome generates HTML and JSON reports that provide a detailed view of test results.

- **Generate Reports**:
  ```bash
  npm run generate-mochawesome-report
  ```

### Allure Reports

Allure offers a comprehensive and interactive reporting tool, perfect for tracking test trends and history.

- **Generate Allure Reports**:
  ```bash
  npm run generate-allure-report-with-history
  ```

- **View Allure Reports**:
  ```bash
  npm run open-allure-report
  ```

## Debugging and Troubleshooting

### Enabling Debug Mode

Debugging is essential for identifying issues in your tests. Enable debug mode by running:

```bash
DEBUG=* npm test
```

This will provide detailed logs during test execution.

### Screenshots on Failure

The framework is configured to capture screenshots whenever a test fails. These are saved in the `./outputs/screenshots/` directory.

### Capturing Browser Logs

Browser logs are automatically captured for failed tests, providing insights into console errors, network issues, and more. Logs are stored in `./outputs/logs/`.

## Contributing

We welcome contributions from the community! Please follow our [Contributing Guidelines](https://github.com/hexdee606/e2e-codeceptjs-boilerplate/blob/develop/CONTRIBUTING.md) to get started. Whether it’s a bug fix, new feature, or documentation improvement, your help is appreciated.

## Code of Conduct

We enforce a strict [Code of Conduct](https://github.com/hexdee606/e2e-codeceptjs-boilerplate/blob/develop/CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for all contributors. Please familiarize yourself with it before participating in this project.

## Support

For any support or inquiries, feel free to reach out via email at [hexdee606@gmail.com](mailto:hexdee606@gmail.com). We strive to respond to all queries within 24-48 hours.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/hexdee606/e2e-codeceptjs-boilerplate/blob/develop/LICENSE) file for more details.
