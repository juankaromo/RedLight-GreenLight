import { login } from "./login.js";
import { fixture, expect } from '@open-wc/testing';

describe('login component', () => {
    it('has the text input components loaded', async () => {
        const el = (await fixture('<login-app></login-app>'));
        const input = el.querySelector("custom-input");
        expect(input.getAttribute('mylabel')).to.equal('Type your name');
    });
    it('has the button components loaded', async () => {
        const el = (await fixture('<login-app></login-app>'));
        const button = el.querySelector("custom-button");
        expect(button.getAttribute('issubmit')).to.equal('true');
    });
});