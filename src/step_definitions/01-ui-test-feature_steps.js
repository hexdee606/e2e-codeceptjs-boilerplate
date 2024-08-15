const ui_test_scenario_page = require("../pages/01-ui-test-scenario_page");

Given(/^the user is on the homepage$/, async function () {
    await common_codeceptjs_utils.waitToNavigate("", `//*[text()=" Test Cases"]`);
});
When(/^the user clicks on the "([^"]*)" button$/, async function (buttonText) {
    await common_codeceptjs_utils.waitAndClick(`//*[text()="${buttonText}"]`);
});
Then(/^the user should be on the login and signup page$/, async function () {
    await ui_test_scenario_page.validateIOnLoginAndSignupPage();
});
When(/^the user signs up with the name "([^"]*)" and email "([^"]*)"$/, async function (name, email) {
    await ui_test_scenario_page.fillNameAndEmail(name, email);
    test_data.signup_test_data.Name = name;
    test_data.signup_test_data.Email = email;
});
When(/^the user fills in the required information$/, async function () {
    await ui_test_scenario_page.fillAndValidateUserDetails();
});
Then(/^the user should see the "([^"]*)" confirmation message$/, async function (assertText) {
    await common_codeceptjs_utils.waitAndSee(`//*[text()="${assertText}"]`);
});
Then(/^the user should be logged in as "([^"]*)"$/, async function (name) {
    await common_codeceptjs_utils.waitAndSee(`//*[text()="${name}"]`);
});