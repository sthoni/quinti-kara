import { describe, test, expect } from "bun:test";
import { worldFromAscii, worldToAscii } from "./world";

describe("ASCII <-> World", () => {
  test("roundtrip preserves ASCII", () => {
    const ascii = `
_____E__
___T____
__LLL___
`;
    const world = worldFromAscii(ascii);
    const back = worldToAscii(world);
    expect(back.trim()).toBe(ascii.trim());
  });

  test("places Kara correctly with direction", () => {
    const ascii = `
__N_
____
`;
    const world = worldFromAscii(ascii);
    expect(world.kara.x).toBe(2);
    expect(world.kara.y).toBe(0);
    expect(world.kara.dir).toBe("N");
    expect(worldToAscii(world).trim()).toContain("N");
  });
});
