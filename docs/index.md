# Automation Framework with CodeceptJS, Playwright, and CucumberJS

## Introduction

Welcome to the **Automation Framework**, a robust testing framework built using [CodeceptJS](https://codecept.io), [Playwright](https://playwright.dev), and [CucumberJS](https://cucumber.io). This framework aims to provide a seamless integration for automated testing of web applications, combining the best of modern testing technologies.

### What is CodeceptJS?

**CodeceptJS** is a popular end-to-end testing framework designed for simplicity and ease of use. It provides a BDD-style syntax and supports multiple backends like WebDriver, Puppeteer, and Playwright, making it highly versatile for web testing.

### What is Playwright?

**Playwright** is a modern web automation library by Microsoft, built to support all browsers (Chromium, Firefox, and WebKit) with a single API. It's known for its fast execution and ability to handle complex web applications, making it an excellent choice for automated testing.

### What is CucumberJS?

**CucumberJS** is a JavaScript implementation of the popular Cucumber framework, enabling Behavior-Driven Development (BDD). It allows writing tests in a natural language style, using Gherkin syntax, making tests easier to read and understand.

## Why Use CodeceptJS, Playwright, and CucumberJS Together?

Combining these technologies allows developers to leverage the strengths of each:

- **CodeceptJS** provides a unified and elegant API for writing tests, supporting multiple backends, and integrating seamlessly with Playwright.
- **Playwright** offers fast and reliable browser automation, handling complex interactions with ease.
- **CucumberJS** enables writing human-readable tests, promoting collaboration between technical and non-technical team members.

This combination results in a powerful, flexible, and maintainable testing framework suitable for modern web applications.

## Project Structure

Below is the detailed structure of the framework, including an explanation of each file and directory listed:

### Configuration Files

#### `codecept.conf.js`

The central configuration file for CodeceptJS. It includes settings for output directories, helper configurations, plugins, and more.

```javascript
const path = require('path');
const playwrightConfig = require('./config/playwright.conf');
const restConfig = require('./config/rest.conf');
const graphqlConfig = require('./config/graphql.conf');
const pluginsConfig = require('./config/plugins.conf');
const multipleConfig = require('./config/multiple.conf');
const gherkinConfig = require('./config/gherkin.conf');
const includeConfig = require('./config/include.conf');
const mochaConfig = require('./config/mocha.conf');

exports.config = {
    output: './outputs',
    helpers: {
        Playwright: playwrightConfig,
        REST: restConfig,
        GraphQL: graphqlConfig,
        FileSystem: {}
    },
    keepBrowserOpen: false,
    mocha: mochaConfig,
    plugins: pluginsConfig,
    bootstrap: null,
    teardown: null,
    hooks: [],
    name: 'automation-framework',
    timeout: 15000,
    gherkin: gherkinConfig,
    include: includeConfig,
    stepTimeout: 5000,
    retryFailedStep: {
        enabled: true,
        retries: 2
    },
    multiple: multipleConfig,
};
```

- **Purpose**: Defines the configuration settings for the entire framework, including paths, helper methods, plugins, and test execution parameters.
- **Usage**: Modify this file to change the configuration of the testing framework.

#### `jsconfig.json`

Configures the JavaScript project settings, enabling support for JavaScript in editors and IDEs.

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

- **Purpose**: Ensures compatibility with JavaScript tools and editors by allowing JavaScript code within the project.
- **Usage**: Update this file to change JavaScript compiler options.

#### Configuration Directory (`config/`)

Contains specific configuration files for various components of the framework.

- `playwright.conf.js`: Settings for Playwright, such as browser configurations.
- `rest.conf.js`: Configuration for REST API testing.
- `graphql.conf.js`: Configuration for GraphQL API testing.
- `plugins.conf.js`: Plugin settings for CodeceptJS.
- `multiple.conf.js`: Configuration for running tests in parallel.
- `gherkin.conf.js`: Gherkin settings for BDD support.
- `include.conf.js`: Includes additional libraries and files.
- `mocha.conf.js`: Mocha settings for test reporting.

### Output Directory (`outputs/`)

This directory stores test results, screenshots, and logs generated during test execution.

- **Purpose**: Provides a location for storing test artifacts such as screenshots, logs, and reports.
- **Usage**: Review the contents for debugging failed tests or analyzing test execution results.

### Test Files

Organize your test scenarios within the `tests/` directory. Follow a structured naming convention to maintain clarity.

#### Example Test File: `login_test.js`

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

- **Purpose**: Contains test scenarios written in a BDD-style syntax, using CodeceptJS methods.
- **Usage**: Create new test files within this directory to add more test scenarios to your suite.

### Step Definitions (`step_definitions/`)

Contains Gherkin step definitions that map to the CucumberJS feature files.

#### Example Step Definition

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

- **Purpose**: Provides the implementation of Gherkin steps, connecting feature files with CodeceptJS methods.
- **Usage**: Add or modify step definitions to expand the coverage of feature files.

### Package Files

#### `package.json`

Defines the project's dependencies, scripts, and metadata.

```json
{
  "name": "automation-framework",
  "version": "1.0.0",
  "description": "A testing framework using CodeceptJS, Playwright, and CucumberJS.",
  "main": "index.js",
  "scripts": {
    "test": "codeceptjs run",
    "bdd": "codeceptjs run --grep '@bdd'"
  },
  "dependencies": {
    "@codeceptjs/configure": "^1.0.1",
    "axios": "^1.7.3",
    "chai": "^4.5.0",
    "codeceptjs": "^3.6.5",
    "cucumber": "^6.0.7",
    "exceljs": "^4.4.0",
    "import-export": "^1.0.1",
    "mongoose": "^8.5.2",
    "playwright": "^1.45.3",
    "puppeteer-core": "^22.15.0"
  },
  "devDependencies": {
    "@codeceptjs/allure-legacy": "^1.0.2",
    "@types/node": "^22.1.0",
    "allure-commandline": "^2.29.0",
    "allure-playwright": "^3.0.0-beta.7",
    "codeceptjs-browserlogs-plugin": "^1.0.5",
    "debug": "^4.3.6",
    "moment": "^2.30.1"
  },
  "engines": {
    "node": ">=20.16.0",
    "npm": ">=10.8.1"
  }
}
```

- **Purpose**: Manages the project's dependencies, scripts, and configurations.
- **Usage**: Use this file to add or update project dependencies and scripts.

#### `package-lock.json`

Auto-generated file containing the exact versions of

installed dependencies.

- **Purpose**: Ensures consistent dependency versions across environments.
- **Usage**: Generally managed automatically, no need for manual changes.

## Setting Up the Framework

Follow these steps to set up the framework from scratch:

### Prerequisites

- **Node.js**: Ensure Node.js is installed (version >= 20.16.0).
- **NPM**: Ensure npm is installed (version >= 10.8.1).

### Installation

1. **Clone the Repository**: Clone the project repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/automation-framework.git
   cd automation-framework
   ```

2. **Install Dependencies**: Use npm to install the project dependencies.

   ```bash
   npm install
   ```

3. **Configure Playwright**: Install browser dependencies for Playwright.

   ```bash
   npx playwright install
   ```

4. **Run Tests**: Execute the test suite using CodeceptJS.

   ```bash
   npm test
   ```

### Common Pitfalls

- **Incompatible Node.js Version**: Ensure you have the correct Node.js version installed.
- **Missing Dependencies**: Run `npm install` to resolve missing dependencies.
- **Browser Installation Issues**: Use `npx playwright install` to fix browser-related issues.

## Writing Test Scenarios

### Example Scenario

Below is an example of a typical test scenario using this framework:

#### Feature File (`features/login.feature`)

```gherkin
Feature: Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I fill in the login form with valid credentials
    Then I should see the welcome message
```

### Step Definitions

The step definitions for the above feature file are located in the `step_definitions/` directory and include the following code:

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

### Writing Your Tests

- **Define Feature Files**: Write scenarios in Gherkin syntax within the `features/` directory.
- **Create Step Definitions**: Implement Gherkin steps in JavaScript within the `step_definitions/` directory.
- **Run Tests**: Execute the tests using the command `npm test`.

## CodeceptJS and Playwright Methods

### CodeceptJS Methods for Playwright

CodeceptJS provides a range of methods for interacting with web pages using Playwright. Below are some common methods:

- **`I.amOnPage(url)`**: Navigate to a specific URL.

  ```javascript
  I.amOnPage('https://example.com');
  ```

- **`I.fillField(field, value)`**: Fill a form field with a specified value.

  ```javascript
  I.fillField('Username', 'test_user');
  ```

- **`I.click(locator)`**: Click on an element specified by a locator.

  ```javascript
  I.click('Submit');
  ```

- **`I.see(text)`**: Assert that a specific text is visible on the page.

  ```javascript
  I.see('Welcome, test_user');
  ```

- **`I.grabTextFrom(locator)`**: Retrieve text content from an element.

  ```javascript
  const message = I.grabTextFrom('.alert');
  ```

- **`I.wait(seconds)`**: Pause test execution for a specified number of seconds.

  ```javascript
  I.wait(2);
  ```

### Advanced Playwright Methods

In addition to CodeceptJS methods, Playwright offers advanced functionalities:

- **Handling Multiple Tabs**: Use Playwright's context to work with multiple tabs.

  ```javascript
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[target="_blank"]')
  ]);
  ```

- **Interacting with iframes**: Access and interact with elements within iframes.

  ```javascript
  const frame = page.frame({ name: 'iframe-name' });
  await frame.click('#button');
  ```

## Conclusion

The combination of CodeceptJS, Playwright, and CucumberJS provides a powerful framework for automated testing. This setup is ideal for modern web applications, offering flexibility, readability, and maintainability.

### Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

### Support

For support and inquiries, please contact [yourname@yourdomain.com](mailto:yourname@yourdomain.com).



Thank you for choosing our automation framework! We hope it serves your testing needs well.
### Explanation and Additional Information

1. **Introduction and Technologies Used**: Introduces the project and explains why the selected technologies are used together.

2. **Project Structure**: Provides a detailed explanation of the files and directories in the project. This section makes it clear how each component fits into the overall framework.

3. **Setting Up the Framework**: Guides users through setting up the project from scratch, including installation steps, configuration, and common pitfalls.

4. **Writing Test Scenarios**: Offers a step-by-step process to write and execute test scenarios, with examples.

5. **CodeceptJS and Playwright Methods**: Lists methods available in CodeceptJS for Playwright, providing examples of how to use them.

6. **Conclusion**: Summarizes the benefits of the framework and provides contact information for support.
