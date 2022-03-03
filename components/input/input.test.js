import { input } from "./input.js";
import { fixture, expect } from '@open-wc/testing';

describe('input component', () => {
    it('has by default an empty string as value', async () => {
        const el = (await fixture('<custom-input mylabel="test"></custom-input>'));
        const input = el.querySelector("input");
        expect(input.value).to.equal('');
    });
});