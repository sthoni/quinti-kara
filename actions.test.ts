import { describe, expect, test } from "bun:test";
import { move } from "./action";
import { worldFromAscii } from "./world";

describe("Kara moves through the world", () => {
  test("Kara moves east", () => {
    const current_world_ascii = `
_____E__
`;
    const current_world = worldFromAscii(current_world_ascii);
    const expected_world_ascii = `
      ______E_
      `;
    const expected_world = worldFromAscii(expected_world_ascii);
    const moved_world = move(current_world);
    expect(moved_world).toEqual(expected_world);
  });
  test("Kara moves west", () => {
    const current_world_ascii = `
 _____W__
 `;
    const current_world = worldFromAscii(current_world_ascii);
    const expected_world_ascii = `
       ____W___
       `;
    const expected_world = worldFromAscii(expected_world_ascii);
    const moved_world = move(current_world);
    expect(moved_world).toEqual(expected_world);
  });

  test("Kara moves north", () => {
    const current_world_ascii = `
________
_____N__
   `;
    const current_world = worldFromAscii(current_world_ascii);
    const expected_world_ascii = `
_____N__
________
         `;
    const expected_world = worldFromAscii(expected_world_ascii);
    const moved_world = move(current_world);
    expect(moved_world).toEqual(expected_world);
  });
  test("Kara moves around the world", () => {
    const current_world_ascii = `
____
___E
     `;
    const current_world = worldFromAscii(current_world_ascii);
    const expected_world_ascii = `
____
E___
           `;
    const expected_world = worldFromAscii(expected_world_ascii);
    const moved_world = move(current_world);
    expect(moved_world).toEqual(expected_world);
  });
  test("Kara moves around the world II", () => {
    const current_world_ascii = `
____
___E
       `;
    const current_world = worldFromAscii(current_world_ascii);
    const expected_world_ascii = `
____
_E__
             `;
    const expected_world = worldFromAscii(expected_world_ascii);
    const moved_world = move(move(current_world));
    expect(moved_world).toEqual(expected_world);
  });
});
