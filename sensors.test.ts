import { test, expect } from "bun:test";
import type { World } from "./world";
import { checkTree } from "./sensors";

const example_world: World = {
  width: 6,
  height: 1,
  grid: [[{}, {}, {}, {}, {}, { tree: true }]],
  kara: { x: 0, y: 0, dir: "E" },
  leavesPicked: 0,
};

const example_world_tree_in_front: World = {
  width: 6,
  height: 1,
  grid: [[{}, {}, {}, {}, {}, { tree: true }]],
  kara: { x: 4, y: 0, dir: "E" },
  leavesPicked: 0,
};

test("checkTree works", () => {
  expect(checkTree(example_world)).toBe(false);
});

test("checkTree in front true", () => {
  expect(checkTree(example_world_tree_in_front)).toBe(true);
});
