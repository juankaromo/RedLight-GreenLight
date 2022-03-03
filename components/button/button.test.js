import { button } from "./button.js";
import { fixture, expect } from '@open-wc/testing';

describe('button component', () => {
    it('has by default an empty string as text', async () => {
        const el = (await fixture('<custom-button myname="btn"></custom-button>'));
        const btn = el.querySelector("button");
        expect(btn.textContent || btn.innerText).to.equal('undefined');
    });
    it('has a button text if param is provided', async () => {
        const el = (await fixture('<custom-button myname="ranking" mytext="Ranking"></custom-button>'));
        const btn = el.querySelector("button");
        expect(btn.textContent || btn.innerText).to.equal('Ranking');
    });
});