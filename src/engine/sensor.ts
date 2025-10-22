import { getCell, getCoordsInFront, type World } from "./world";

export function checkTree(world: World): boolean {
  const [nx, ny] = getCoordsInFront(world);
  const cell = getCell(world, nx, ny);
  return cell.tree === true;
}

export function checkLeaf(world: World): boolean {
  const { x, y } = world.kara;
  const cell = getCell(world, x, y);
  return cell.leaf === true;
}
