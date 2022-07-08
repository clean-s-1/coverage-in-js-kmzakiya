const alerts = require("../typewise-alert");
const { expect } = require("chai");

describe("inferBreach", () => {
  it("infers a value lower than the minimum as TOO_LOW", () => {
    expect(alerts.inferBreach(20, 50, 100)).equals("TOO_LOW");
  });
  it("infers a value lower than the maximum as TOO_HIGH", () => {
    expect(alerts.inferBreach(120, 50, 100)).equals("TOO_HIGH");
  });
  it("infers a value between minimum and maximum as NORMAL", () => {
    expect(alerts.inferBreach(70, 50, 100)).equals("NORMAL");
  });
});
describe("classifyTemperatureBreach", () => {
  it("return TOO_LOW for a value lower than the minimum", () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', -30, alerts.COOLING_LIMITS)).equals("TOO_LOW");
  });
  it("return TOO_HIGH for a value lower than the maximum", () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 50, alerts.COOLING_LIMITS)).equals("TOO_HIGH");
  });
  it("return NORMAL for a value between minimum and maximum", () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 20, alerts.COOLING_LIMITS)).equals("NORMAL");
  });
});

