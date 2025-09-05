import { test, expect } from "bun:test";
import type { World } from "./world";
import { checkLeaf, checkTree } from "./sensors";

test("checkTree works (not in front)", () => {
  const example_world: World = {
    width: 6,
    height: 1,
    grid: [[{}, {}, {}, {}, {}, { tree: true }]],
    kara: { x: 0, y: 0, dir: "E" },
    leavesPicked: 0,
  };
  expect(checkTree(example_world)).toBe(false);
});

test("checkTree works (in front)", () => {
  const example_world: World = {
    width: 6,
    height: 1,
    grid: [[{}, {}, {}, {}, {}, { tree: true }]],
    kara: { x: 4, y: 0, dir: "E" },
    leavesPicked: 0,
  };

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
