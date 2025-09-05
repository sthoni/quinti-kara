import type { Kara, World } from "./world";

export function checkTree(world: World): boolean {
  const [x, y] = getCoordsInFront(world.kara);
  const cellInFront = getCell(world, x, y);
  if (cellInFront?.tree) {
    return true;
  }
  return false;
}

function getCoordsInFront(kara: Kara): [number, number] {
  switch (kara.dir) {
    case "E":
      return [kara.x + 1, kara.y];
    case "N":
      return [kara.x, kara.y - 1];
    case "S":
      return [kara.x, kara.y + 1];
    case "W":
      return [kara.x - 1, kara.y];
  }
}

function getCell(world: World, x: number, y: number) {
  return world.grid[y]?.[x]; // optional chaining = undefined, wenn out of bounds
}
