const I = actor();
const utils = require('../../custom_helpers/utils');
const variables = require("../../custom_helpers/variables");
Given(/^the user is on the home page$/, async function () {
    await I.amOnPage("https://pipedream.com/apps/swapi");
    const result = await utils.browser_storage_utils.getLocalStorageKeysAndValues();
    // Prettify the JSON structure with an indentation of 2 spaces
    const prettyJson = JSON.stringify(result, null, 2);

    // Log the prettified JSON
    console.log(prettyJson);
    console.log(result["_reb2buid"]);
    console.log(variables.test);
});