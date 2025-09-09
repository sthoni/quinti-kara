import { expect, test } from "bun:test";
import { checkLeaf, checkTree } from "./sensor";
import { type World, worldFromAscii } from "./world";

test("checkTree works (not in front)", () => {
  const test_world_ascii = `
______
N____T
    `;
  const example_world: World = worldFromAscii(test_world_ascii);
  expect(checkTree(example_world)).toBe(false);
});

test("checkTree works (in front)", () => {
  const test_world_ascii = `
___T__
___N__
    `;
  const example_world: World = worldFromAscii(test_world_ascii);
  expect(checkTree(example_world)).toBe(true);
});

test("checkLeaves works (not on leaf)", () => {
  const example_world: World = {
    width: 6,
    height: 1,
    grid: [[{}, {}, {}, {}, {}, { leaf: true }]],
    kara: { x: 4, y: 0, dir: "E" },
    leavesPicked: 0,
  };

  expect(checkLeaf(example_world)).toBe(false);
});

test("checkLeaf works (on leaf)", () => {
  const example_world: World = {
    width: 6,
    height: 1,
    grid: [[{}, {}, {}, {}, {}, { leaf: true }]],
    kara: { x: 5, y: 0, dir: "E" },
    leavesPicked: 0,
  };

  expect(checkLeaf(example_world)).toBe(true);
});
