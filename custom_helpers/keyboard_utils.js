const {actor, Helper} = require("codeceptjs"); // Import environment configuration
const I = actor();
const os = require('os');
const {Key} = require('playwright');

class keyboard_utils extends Helper {
    constructor(config) {
        super(config);
        this.platform = os.platform();
    }

    // Utility functions for common keyboard shortcuts
    async selectAll() {
        await this.pressKey(this.getKeyCombination(['selectAll']));
    }

    async undo() {
        await this.pressKey(this.getKeyCombination(['undo']));
    }

    async redo() {
        await this.pressKey(this.getKeyCombination(['redo']));
    }

    async copy() {
        await this.pressKey(this.getKeyCombination(['copy']));
    }

    async paste() {
        await this.pressKey(this.getKeyCombination(['paste']));
    }

    async cut() {
        await this.pressKey(this.getKeyCombination(['cut']));
    }

    async find() {
        await this.pressKey(this.getKeyCombination(['find']));
    }

    async save() {
        await this.pressKey(this.getKeyCombination(['save']));
    }

    async print() {
        await this.pressKey(this.getKeyCombination(['print']));
    }

    async refresh() {
        await this.pressKey(this.getKeyCombination(['refresh']));
    }

    async newTab() {
        await this.pressKey(this.getKeyCombination(['newTab']));
    }

    async closeTab() {
        await this.pressKey(this.getKeyCombination(['closeTab']));
    }

    async newWindow() {
        await this.pressKey(this.getKeyCombination(['newWindow']));
    }

    async toggleFullScreen() {
        await this.pressKey(['F11']);
    }

    // Method to press keys with multiple combinations
    async pressKey(keyCombination) {
        const {I} = this.helpers;
        await I.pressKey(this.mapKeyCombination(keyCombination));
    }

    // Method to get the appropriate key combination based on the OS
    getKeyCombination(action) {
        const combinations = {
            'selectAll': this.platform === 'darwin' ? ['Command', 'a'] : ['Control', 'a'],
            'undo': this.platform === 'darwin' ? ['Command', 'z'] : ['Control', 'z'],
            'redo': this.platform === 'darwin' ? ['Command', 'Shift', 'z'] : ['Control', 'y'],
            'copy': this.platform === 'darwin' ? ['Command', 'c'] : ['Control', 'c'],
            'paste': this.platform === 'darwin' ? ['Command', 'v'] : ['Control', 'v'],
            'cut': this.platform === 'darwin' ? ['Command', 'x'] : ['Control', 'x'],
            'find': this.platform === 'darwin' ? ['Command', 'f'] : ['Control', 'f'],
            'save': this.platform === 'darwin' ? ['Command', 's'] : ['Control', 's'],
            'print': this.platform === 'darwin' ? ['Command', 'p'] : ['Control', 'p'],
            'refresh': this.platform === 'darwin' ? ['Command', 'r'] : ['Control', 'r'],
            'newTab': this.platform === 'darwin' ? ['Command', 't'] : ['Control', 't'],
            'closeTab': this.platform === 'darwin' ? ['Command', 'w'] : ['Control', 'w'],
            'newWindow': this.platform === 'darwin' ? ['Command', 'n'] : ['Control', 'n']
        };

        return combinations[action] || action;
    }

    // Method to map key combinations to Playwright's Key enum
    mapKeyCombination(combination) {
        const keyMap = {
            'Command': Key.Meta,
            'Control': Key.Control,
            'Alt': Key.Alt,
            'Shift': Key.Shift,
            'Enter': Key.Enter,
            'Tab': Key.Tab,
            'Backspace': Key.Backspace,
            'Delete': Key.Delete,
            'ArrowUp': Key.ArrowUp,
            'ArrowDown': Key.ArrowDown,
            'ArrowLeft': Key.ArrowLeft,
            'ArrowRight': Key.ArrowRight,
            'Home': Key.Home,
            'End': Key.End,
            'PageUp': Key.PageUp,
            'PageDown': Key.PageDown,
            'F11': Key.F11,
            'F5': Key.F5,
            'Meta': Key.Meta,
            'Fn': Key.Fn
        };

        // Convert the key combination to Playwright Key enum
        return combination.map(key => keyMap[key] || key).join('+');
    }
}

module.exports = new keyboard_utils();
