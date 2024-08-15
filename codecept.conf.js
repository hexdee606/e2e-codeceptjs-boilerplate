const playwrightConfig = require('./config/playwright.conf');
const restConfig = require('./config/rest.conf');
const graphqlConfig = require('./config/graphql.conf');
const pluginsConfig = require('./config/plugins.conf');
const multipleConfig = require('./config/multiple.conf');
const gherkinConfig = require('./config/gherkin.conf');
const includeConfig = require('./config/include.conf');
const mochaConfig = require('./config/mocha.conf');
const globalVariablesConfig = require('./config/global.variables.conf');

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
    name: 'automation-framework',
    gherkin: gherkinConfig,
    include: includeConfig,
    stepTimeout: 5000,
    retryFailedStep: {
        enabled: true,
        retries: 2
    },
    multiple: multipleConfig,
    waitForNavigation: "load",
    globalVariables: globalVariablesConfig
};
