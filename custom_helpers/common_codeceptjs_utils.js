const I = actor()
const {assert} = require('chai'); // Import Chai assertion library for validating test conditions
export class common_codeceptjs_utils {
    constructor() {

    }

    /**
     * Waits for an element to be visible and then clicks it.
     * @param {string} locator - The locator of the element to click.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndClick(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.click(locator);
    }

    /**
     * Waits for an element to be visible and then checks it if it is not already checked.
     * @param {string} locator - The locator of the element to check.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async waitAndChecked(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        const values = await I.grabCheckedElementStatus(locator);
        if (!values) {
            I.checkOption(locator);
        }
    }

    /**
     * Waits for an element to be visible and then unchecks it if it is checked.
     * @param {string} locator - The locator of the element to uncheck.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async waitAndUnchecked(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        const values = await I.grabCheckedElementStatus(locator);
        if (values) {
            I.uncheckOption(locator);
        }
    }

    /**
     * Waits for an element to be visible and then verifies its presence.
     * @param {string} locator - The locator of the element to verify.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndSee(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.retry(2).seeElement(locator);
    }

    /**
     * Waits for an element to be visible and fills it with text.
     * @param {string} locator - The locator of the element to fill.
     * @param {string} text - The text to fill the element with.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndFillField(locator, text, sec = 10) {
        I.waitForVisible(locator, sec);
        I.fillField(locator, text);
    }

    /**
     * Clears the contents of a field.
     * @param {string} locator - The locator of the field to clear.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    clearFields(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.click(locator);
        I.pressKey(['Control', 'A']);
        I.pressKey('Backspace');
    }

    /**
     * Waits for an element to be invisible and then asserts it is not visible.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitForInvisibleAndDontSee(locator, sec = 10) {
        I.waitForInvisible(locator, sec);
        I.dontSeeElement(locator);
    }

    /**
     * Waits for an element to be visible and asserts its text.
     * @param {string} text - The text to assert.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    waitAndAssertText(text, locator, sec = 10) {
        I.waitForVisible(locator, sec);
        I.seeTextEquals(text, locator);
    }

    /**
     * Waits for an element to be visible and retrieves its attribute value.
     * @param {string} attribute - The attribute to retrieve.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     * @returns {Promise<string>} The attribute value.
     */
    async waitAndGetTextFromAttribute(attribute, locator, sec = 10) {
        I.waitForVisible(locator, sec);
        return await I.grabAttributeFrom(locator, attribute);
    }

    /**
     * Waits for an element to be visible and retrieves its text content.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     * @returns {Promise<string[]>} The text content of the element.
     */
    async waitAndGetTextFromLocator(locator, sec = 10) {
        I.waitForVisible(locator, sec);
        return await I.grabTextFromAll(locator);
    }

    /**
     * Verifies that a button is enabled by checking its aria-disabled attribute.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async verifyIsEnabled(locator, sec = 10) {
        await I.waitForVisible(locator, sec);
        const value = await I.grabAttributeFrom(locator, 'aria-disabled');
        await assert.equal(value[0], 'f');
    }

    /**
     * Verifies that a button is disabled by checking its aria-disabled attribute.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     * @returns {Promise<string>} The aria-disabled attribute value.
     */
    async verifyIsDisabled(locator, sec = 10) {
        await I.waitForVisible(locator, sec)
        const value = await I.grabAttributeFrom(locator, 'aria-disabled');
        assert.equal(value[0], 't');
        return value;
    }

    /**
     * Verifies that a button is selected by checking its selected attribute.
     * @param {string} locator - The locator of the element.
     * @param {number} sec - The number of seconds to wait {default time 10 sec}.
     */
    async verifyIsSelected(locator, sec = 10) {
        await I.waitForVisible(locator, sec)
        const value = await I.grabAttributeFrom(locator, 'selected');
        assert.equal(value[0], 'true');
    }
}