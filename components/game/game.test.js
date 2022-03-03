import { game } from "./game.js";
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

window.getUser = function () {
  return window.store["games"][0];
};

window.updateUser = function (game) {
  window.store["games"][0] = game;
};

window.getRedLigthDuration = function () {
  return 1000;
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe("game component", () => {
  it("when left and red stop game", async () => {
    const el = await fixture("<game-app></game-app>");
    const left = el.querySelector("#left");
    left.click();
    expect(window.store["games"][0]["score"]).to.equal(0);
  });
  it("when right and red stop game", async () => {
    const el = await fixture("<game-app></game-app>");
    const right = el.querySelector("#right");
    right.click();
    expect(window.store["games"][0]["score"]).to.equal(0);
  });
  it("when left and green score ++", async () => {
    const el = await fixture("<game-app></game-app>");
    await sleep(1500);
    const left = el.querySelector("#left");
    left.click();
    expect(window.store["games"][0]["score"]).to.equal(1);
  });
  it("when right and green score ++", async () => {
    const el = await fixture("<game-app></game-app>");
    await sleep(1500);
    const right = el.querySelector("#left");
    right.click();
    expect(window.store["games"][0]["score"]).to.equal(2);
  });
});
