import { link } from "./link.js";
import { fixture, expect } from '@open-wc/testing';

describe('link component', () => {
    it('has by default an empty string as link', async () => {
        const el = (await fixture('<custom-link mytext="link"></custom-link>'));
        const link = el.querySelector("a");
        expect(link.getAttribute('href')).to.equal('undefined');
    });
    it('has a link if param is provided', async () => {
        const el = (await fixture('<custom-link mytext="link" mylink="home"></custom-link>'));
        const link = el.querySelector("a");
        expect(link.getAttribute('href')).to.equal('home');
    });
});