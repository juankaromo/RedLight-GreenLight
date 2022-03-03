import { table } from "./table.js";
import { fixture, expect } from "@open-wc/testing";

window.store = {
  games_empty: [],
  games: [
    {
      user: "test",
      score: 10,
      highscore: 100,
    },
  ],
};

describe("table component", () => {
  it("has by default an empty list", async () => {
    const el = await fixture(
      '<custom-table myitems="games_empty"></custom-table>'
    );
    const td = el.querySelector("td");
    expect((td.textContent || td.innerText).replace("\n", "").trim()).to.equal(
      "There are no games yet."
    );
  });
  it("has a list if ther are games", async () => {
    const el = await fixture('<custom-table myitems="games"></custom-table>');
    const td = el.querySelector("td");
    expect(td.textContent || td.innerText).to.equal("test");
  });
});
