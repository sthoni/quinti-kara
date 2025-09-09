import { type Cell, getCell, getCoordsInFront, type World } from "./world";

export function checkTree(world: World): boolean {
  const [x, y] = getCoordsInFront(world);
  const cellInFront = getCell(world, x, y);
  if (cellInFront?.tree) {
    return true;
  }
  return false;
}

export function checkLeaf(world: World): boolean {
  if (world.grid[world.kara.y]?.[world.kara.x]?.leaf) {
    return true;
  }
  return false;
}
