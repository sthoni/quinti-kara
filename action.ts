import { getCoordsInFront, type World } from "./world";

export function move(current_world: World): World {
  const [new_kara_x, new_kara_y] = getCoordsInFront(current_world);
  const new_world: World = {
    ...current_world,
    kara: {
      x: new_kara_x,
      y: new_kara_y,
      dir: current_world.kara.dir,
    },
  };
  return new_world;
}

export function turn_left(current_world: World): World {
  return current_world;
}

export function pick_leaf(current_world: World): World {
  return current_world;
}
