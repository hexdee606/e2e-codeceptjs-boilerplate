const {assert} = require("chai");
const api_test_model = require("../model/02-api-test_model");
const api_test_page = require("../pages/02-api-test_page");

When(/^the user hits the create account API with the following details:$/, async function (dataTable) {
    await api_test_page.updateApiTestModel(common_utils.transformTable(dataTable));
    variables.api_response = await api_helper.sendPostRequest("/user", api_test_model);
});

Then(/^the user should validate a (\d+) response code$/, async function (expectedCode) {
    assert.equal(expectedCode, variables.api_response.data.code);
});

When(/^the user hits the GET user account details API for "([^"]*)"$/, async function (username) {
    variables.api_response = await api_helper.sendGetRequest(`/user/${username}`);
});

When(/^the user hits the DELETE user account details API for "([^"]*)"$/, async function (username) {
    variables.api_response = await api_helper.sendDeleteRequest(`/user/${username}`);
});

Then(/^the user should validate a response and the following details:$/, async function (dataTable) {
    await api_test_page.updateApiTestModel(common_utils.transformTable(dataTable));
    delete variables.api_response.data.id;
    // Assert deep equality
    assert.deepEqual(variables.api_response.data, api_test_model, 'The API response does not match the expected model.');
});