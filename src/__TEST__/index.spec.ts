import { handler } from "../../lambda/yotsuba-api";

describe(`handler`, () => {
  it(`should be a function`, () => {
    expect(typeof handler).toBe(`function`);
  });
});
