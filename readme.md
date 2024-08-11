# 🚀 Automation Framework with CodeceptJS, Playwright, and CucumberJS


![Under Development](https://img.shields.io/badge/status-under--development-yellow)
![Playwright](https://img.shields.io/badge/playwright-v1.45.3-blue?logo=playwright)
![CodeceptJS](https://img.shields.io/badge/codeceptjs-v3.6.5-green?logo=codeceptjs)
![CucumberJS](https://img.shields.io/badge/cucumber-v6.0.7-brightgreen?logo=cucumber)
![Node](https://img.shields.io/badge/node-%3E%3D20.16.0-orange?logo=node.js)
![NPM](https://img.shields.io/badge/npm-%3E%3D10.8.1-red?logo=npm)

![Axios](https://img.shields.io/badge/axios-v1.7.3-blue?logo=axios)
![Chai](https://img.shields.io/badge/chai-v4.5.0-red?logo=chai)
![ExcelJS](https://img.shields.io/badge/exceljs-v4.4.0-yellow?logo=exceljs)
![Import-Export](https://img.shields.io/badge/import--export-v1.0.1-lightgrey?logo=import-export)
![Mongoose](https://img.shields.io/badge/mongoose-v8.5.2-green?logo=mongoose)
![Puppeteer-Core](https://img.shields.io/badge/puppeteer--core-v22.15.0-lightblue?logo=puppeteer)

![Allure-Legacy](https://img.shields.io/badge/allure--legacy-v1.0.2-brightgreen?logo=allure)
![Types-Node](https://img.shields.io/badge/@types--node-v22.1.0-blue?logo=typescript)
![Allure-Commandline](https://img.shields.io/badge/allure--commandline-v2.29.0-orange?logo=allure)
![Allure-Playwright](https://img.shields.io/badge/allure--playwright-v3.0.0--beta.7-yellow?logo=allure)
![BrowserLogs-Plugin](https://img.shields.io/badge/browserlogs--plugin-v1.0.5-red?logo=browserlogs)
![Debug](https://img.shields.io/badge/debug-v4.3.6-lightgrey?logo=debug)
![Moment](https://img.shields.io/badge/moment-v2.30.1-blue?logo=moment)
![ESLint](https://img.shields.io/badge/eslint-v9.8.0-purple?logo=eslint)


## 📖 Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Configuration](#configuration)
  - [CodeceptJS Configuration](#codeceptjs-configuration)
  - [Playwright Configuration](#playwright-configuration)
  - [Plugins Configuration](#plugins-configuration)
- [Writing Tests](#writing-tests)
  - [Example Test Scenario](#example-test-scenario)
  - [Step Definitions](#step-definitions)
- [Running Tests](#running-tests)
- [Test Reporting](#test-reporting)
  - [Mochawesome Reports](#mochawesome-reports)
  - [Allure Reports](#allure-reports)
- [Debugging and Troubleshooting](#debugging-and-troubleshooting)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Support](#support)
- [License](#license)

## Introduction

Welcome to the **Automation Framework**, a robust setup built using [CodeceptJS](https://codecept.io), [Playwright](https://playwright.dev), and [CucumberJS](https://cucumber.io). This framework is designed for seamless integration and automated testing of web applications.

## Prerequisites

Before setting up the framework, ensure you have the following installed:

- **Node.js**: Version 14.x or higher (Recommended: >= 20.16.0)
- **NPM**: Version 6.x or higher (Recommended: >= 10.8.1)
- **Git**: For version control and cloning the repository

Verify installation by running:

```bash
node -v
npm -v
git --version
```

## Project Setup

### Cloning the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/hexdee606/e2e-codeceptjs-boilerplate.git
cd e2e-codeceptjs-boilerplate
```

### Installing Dependencies

Install project dependencies using npm:

```bash
npm install
```

### Configuring Playwright

Install necessary browser binaries for Playwright:

```bash
npx playwright install
```

### Running Tests

To run the test suite, use:

```bash
npm test
```

## Configuration

### CodeceptJS Configuration

The central configuration file is `codecept.conf.js`, where you define test settings, helpers, and plugins.

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

### Playwright Configuration

Located in `config/playwright.conf.js`, this file contains browser settings like headless mode, browser type, and timeouts.

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

### Plugins Configuration

The plugins used in this framework are configured in `config/plugins.conf.js`:

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

## Writing Tests

### Example Test Scenario

Create a new test file in the `tests/` directory:

```javascript
Feature('Login');

Scenario('User can log in with valid credentials', (I) => {
  I.amOnPage('/login');
  I.fillField('Username', 'test_user');
  I.fillField('Password', 'secure_password');
  I.click('Login');
  I.see('Welcome, test_user');
});
```

### Step Definitions

For BDD-style testing, define Gherkin steps in the `step_definitions/` directory:

```javascript
const { I } = inject();

Given('I am on the login page', () => {
  I.amOnPage('/login');
});

When('I fill in the login form with valid credentials', () => {
  I.fillField('Username', 'test_user');
  I.fillField('Password', 'secure_password');
});

Then('I should see the welcome message', () => {
  I.see('Welcome, test_user');
});
```

## Running Tests

To execute tests, use the following commands:

- **Run All Tests**:
  ```bash
  npm test
  ```

- **Run BDD Tests Only**:
  ```bash
  npm run bdd
  ```

- **Run Headless Tests**:
  ```bash
  npm run test:headless
  ```

## Test Reporting

### Mochawesome Reports

Mochawesome is configured as the default reporter. It generates HTML and JSON reports.

- **Generate Reports**:
  ```bash
  npm run generate-mochawesome-report
  ```

### Allure Reports

Allure provides a comprehensive reporting tool with trends and history.

- **Generate Allure Reports**:
  ```bash
  npm run generate-allure-report-with-history
  ```

- **View Allure Reports**:
  ```bash
  npm run open-allure-report
  ```

## Debugging and Troubleshooting

- **Enable Debugging**: Run tests with `DEBUG=*` to see detailed logs.
- **Screenshots on Failure**: Automatically taken and saved in `./outputs/screenshots/`.
- **Browser Logs**: Captured and saved in `./outputs/logs/`.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Code of Conduct

This project adheres to a strict [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards expected of contributors.

## Support

For support and inquiries, please contact [hexdee606@gmail.com](mailto:hexdee606@gmail.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
