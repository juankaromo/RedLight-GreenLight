import { ranking } from "./ranking.js";
import { fixture, expect } from "@open-wc/testing";

window.store = {
  games: [
    {
      user: "test",
      score: 10,
      highscore: 100,
    },
  ],
};

describe("ranking component", () => {
  it("has a loaded table on it", async () => {
    const el = await fixture("<ranking-app></ranking-app>");
    const ct = el.querySelector("custom-table");
    expect(ct).not.equal("undefined");
  });
});
