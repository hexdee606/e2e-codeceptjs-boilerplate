# Contributing to E2E CodeceptJS Boilerplate

Thank you for your interest in contributing to the E2E CodeceptJS Boilerplate! This document outlines the process for contributing to the project, including setting up the development environment, coding standards, and submitting changes.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Creating Issues](#creating-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Running Tests](#running-tests)
- [Commit Messages](#commit-messages)
- [Contact](#contact)

## Code of Conduct
Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming environment for all contributors.

## Getting Started
1. Fork the repository to your GitHub account.
2. Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/e2e-codeceptjs-boilerplate.git
   ```
3. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup
1. **Install Node.js** (version 14.x or higher recommended).
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Set up Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Run the tests to ensure everything is set up correctly:
   ```bash
   npm run test
   ```

## Coding Standards
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Ensure your code passes ESLint checks before committing:
   ```bash
   npm run lint
   ```

## Creating Issues
Before opening a new issue, search the existing issues to avoid duplicates. When creating a new issue, provide a detailed description, including steps to reproduce, expected behavior, and relevant screenshots.

## Submitting Pull Requests
1. Ensure your branch is up to date with the latest `main` branch:
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   ```
2. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a pull request from your branch to the `main` branch of this repository.
4. Ensure that your PR description clearly explains the changes and includes relevant issue references.

## Running Tests
- Run the complete test suite before submitting your PR:
   ```bash
   npm run test
   ```
- Generate Allure reports:
   ```bash
   npm run generate-allure-report-with-history
   ```

## Commit Messages
Use the following format for commit messages:
```
feat: Add new feature description
fix: Correct bug in specific module
docs: Update documentation
style: Improve code formatting
test: Add or update tests
chore: Miscellaneous tasks
```

## Contact
For questions or help, open a discussion on GitHub or contact us at [dipenc245@gmail.com].
