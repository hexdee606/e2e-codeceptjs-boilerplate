module.exports = {
    allure: {
        enabled: true, // Enable or disable the allure plugin
        outputDir: './allure-results', // Directory to save allure results
        require: '@codeceptjs/allure-legacy', // Use the allure legacy reporter

        // Basic Configuration
        useCucumberStepReporter: true, // Use Cucumber steps as Allure steps
        // disableWebdriverScreenshotsReporting: false, // Disable automatic screenshots
        // disableWebdriverStepsReporting: false, // Disable WebDriver steps reporting
        // disableMochaHooks: false, // Disable Mocha hooks in the report

        // // Step Timeout (advanced configuration)
        // stepTimeout: 0, // Set a custom timeout for each step
        // stepTimeoutOverride: {
        //     start: 0, // Override timeout for the 'start' event
        //     before: 0, // Override timeout for the 'before' event
        //     after: 0, // Override timeout for the 'after' event
        //     end: 0, // Override timeout for the 'end' event
        // },

        // // Custom Labels
        // labels: {
        //     epic: 'Epic', // Assign a label as 'Epic'
        //     feature: 'Feature', // Assign a label as 'Feature'
        //     story: 'Story', // Assign a label as 'Story'
        // },

        // // Links in Reports
        // links: {
        //     issue: 'https://issue-tracker.example.com/ISSUE-', // Prefix for issue links
        //     tms: 'https://test-management.example.com/TEST-', // Prefix for TMS links
        // },

        // // Categories for test results
        // categories: {
        //     failed: [
        //         {message: 'Step failed', matchedStatuses: ['failed']},
        //         {message: 'Test failed', matchedStatuses: ['failed']},
        //     ],
        //     flaky: [
        //         {message: 'Test marked as flaky', matchedStatuses: ['flaky']},
        //     ],
        //     known: [
        //         {message: 'Known issue', matchedStatuses: ['known']},
        //     ],
        // },

        // Environment Variables
        environmentInfo: './env.conf', // Path to a properties file that contains environment variables

        // Attachments
        attachments: {
            include: ['./outputs/screenshots', './outputs/logs', './outputs/videos'], // Include screenshots as attachments
            exclude: [], // Exclude logs from being attached
        },

        // // Custom Commands
        // customCommands: [
        //     {
        //         name: 'attachScreenshot',
        //         path: './custom-commands/attachScreenshot.js',
        //     },
        //     {
        //         name: 'addEnvironmentInfo',
        //         path: './custom-commands/addEnvironmentInfo.js',
        //     },
        // ],

        // // Parallel execution
        // parallel: {
        //     rerunFailures: false, // Rerun failed tests
        //     maxFailures: 5, // Stop execution after 5 failures
        // },

        // Set additional report metadata
        meta: {
            author: 'hexdee606', // Set the author of the tests
            // severity: 'Critical', // Set the default severity of the tests
            // version: '1.0.0', // Version of the software under test
        },
    },
    retryFailedStep: {
        enabled: true, // Enable or disable the retry mechanism
        retries: 3, // Number of retries for a failed step
        minTimeout: 1000, // Minimum wait time between retries (in milliseconds)
        maxTimeout: 5000, // Maximum wait time between retries (in milliseconds)
        delay: 2000, // Delay before retrying the failed step (in milliseconds)
        retryOnFail: true, // Whether to retry on any failure or only specific failures
        // errorPatterns: [ // Optional array of patterns or error messages to match for retrying
        //     "NetworkError",
        //     "TimeoutError"
        // ],
    },
    stepByStepReport: {
        enabled: true, // Enable or disable step-by-step reporting
        fullPageScreenshots: true, // Capture full-page screenshots instead of only the visible area
        screenshotsForAllFailures: true, // Take screenshots for all failures
        onFail: true, // Take a screenshot on failure
        deleteSuccessful: false, // Delete screenshots for successful steps to save space
        animatedGif: false, // Generate animated GIFs from screenshots (if supported)
        imageComparison: false, // Enable image comparison for screenshots
        comparisonTolerance: 0.01, // Set the tolerance level for image comparison
        outputDir: './outputs/step-by-step', // Directory to save the screenshots
        screenshotDelay: 1000, // Delay between taking screenshots (in milliseconds)
        fileNamePattern: '{step}-{name}-{time}', // Custom pattern for screenshot file names
        customScreenshotName: (step) => `${step.name}-${Date.now()}`, // Function to generate custom screenshot names
    },
    screenshotOnFail: {
        enabled: true, // Enable or disable the screenshot on failure
        path: './outputs/screenshots', // Directory to save screenshots
        fullPage: true, // Capture the full page in the screenshot
        uniqueNames: true, // Generate unique names for each screenshot
        keepSuccessfulScreenshots: false, // Optionally keep screenshots from successful steps
        quality: 100, // Set the quality of the screenshot (JPEG format)
        format: 'png', // Set the format of the screenshot (can be 'png' or 'jpeg')
        customScreenshotName: (step) => `${step.name}-${Date.now()}`, // Function to generate custom screenshot names
    },
    BrowserLogsOnFail: {
        enabled: true, // Enable or disable browser log capture on failure
        uniqueNames: true, // Generate unique names for each log file
        require: 'codeceptjs-browserlogs-plugin', // The required plugin to capture logs
        path: './outputs/logs', // Directory to save log files
        includeConsoleLog: true, // Include console logs in the output
        includeNetworkLog: true, // Include network logs in the output
        includeErrorLog: true, // Include error logs in the output
        logFormat: 'json', // Set the format of the logs (can be 'json', 'text')
        maxLogEntries: 1000, // Maximum number of log entries to capture
        filterLogTypes: ['error', 'warn'], // Filter specific types of logs (e.g., 'error', 'warn', 'info')
        customLogName: (step) => `${step.name}-${Date.now()}.log`, // Function to generate custom log file names
    },

};
