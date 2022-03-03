import { mainApp } from "./main.js";
import { fixture, expect } from '@open-wc/testing';

describe('main component', () => {
    it('has by default the router loaded', async () => {
        const el = (await fixture('<main-app></main-app>'));
        const content = el.querySelector("#content");
        const router = content.querySelector("app-router");
        expect(router.getAttribute('id')).to.equal('router');
    });
});