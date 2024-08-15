const {actor, Helper, locator} = require('codeceptjs');
const I = actor();

let dynamicLocators = {
    validateText: (text) => `//*[text()="${text}"] | //*[@value="${text}"]`,
    selectRadioButton: (text) => `//input[@value="${text}"]`,
    fillTextBox: (text) => `//input[@name="${text}"]`,
    checkBoxSelect: (text) => `//label[text()="${text}"]/..//input`
}

class ui_test_scenario_page extends Helper {
    constructor(config) {
        super(config);
        this.validateIOnLoginAndSignupPageLocator = `//h2[text()="New User Signup!"]`;
        this.fillNameLocator = `//input[@name="name"]`;
        this.fillEmailLocator = `(//input[@name="email"])[2]`;
    }

    async validateIOnLoginAndSignupPage() {
        await common_codeceptjs_utils.waitAndSee(this.validateIOnLoginAndSignupPageLocator);
    }

    async fillNameAndEmail(name, email) {
        await common_codeceptjs_utils.waitAndFillField(this.fillNameLocator, name);
        await common_codeceptjs_utils.waitAndFillField(this.fillEmailLocator, email);
    }

    async fillAndValidateUserDetails() {
        const data = test_data.signup_test_data;
        const AddressInformation = data.AddressInformation;
        await common_codeceptjs_utils.waitAndSee(dynamicLocators.validateText("Enter Account Information"));
        await common_codeceptjs_utils.waitAndClick(dynamicLocators.selectRadioButton(data.title));
        await common_codeceptjs_utils.waitAndSee(dynamicLocators.validateText(data.Name));
        await common_codeceptjs_utils.waitAndSee(dynamicLocators.validateText(data.Email));
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox("password"), data.Password);
        await I.selectOption('days', data.dateOfBirth.day);
        await I.selectOption('months', data.dateOfBirth.month);
        await I.selectOption('years', data.dateOfBirth.year);
        await common_codeceptjs_utils.waitAndChecked(dynamicLocators.checkBoxSelect("Sign up for our newsletter!"));
        await common_codeceptjs_utils.waitAndChecked(dynamicLocators.checkBoxSelect("Receive special offers from our partners!"));
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('first_name'), AddressInformation.firstName);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('last_name'), AddressInformation.lastName);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('company'), AddressInformation.company);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('address1'), AddressInformation.addressLine1);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('address2'), AddressInformation.addressLine2);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('state'), AddressInformation.state);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('city'), AddressInformation.city);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('zipcode'), AddressInformation.zipcode);
        await common_codeceptjs_utils.waitAndFillField(dynamicLocators.fillTextBox('mobile_number'), AddressInformation.mobileNumber);
    }
}

module.exports = new ui_test_scenario_page();