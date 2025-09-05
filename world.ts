import * as v from "valibot";

/** Richtung: festgelegte Literale (wie ein Enum) */
export const DirSchema = v.union([
  v.literal("N"),
  v.literal("E"),
  v.literal("S"),
  v.literal("W"),
]);
export type Dir = v.InferInput<typeof DirSchema>;

/** Kara-Position */
export const KaraSchema = v.object({
  x: v.number(),
  y: v.number(),
  dir: DirSchema,
});
export type Kara = v.InferInput<typeof KaraSchema>;

/** Zelle – optionale Flags, v1 einfach & flexibel */
export const CellSchema = v.object({
  tree: v.optional(v.boolean()),
  leaf: v.optional(v.boolean()),
});
export type Cell = v.InferInput<typeof CellSchema>;

/** Welt */
export const WorldSchema = v.object({
  width: v.number(),
  height: v.number(),
  grid: v.array(v.array(CellSchema)), // 2D-Grid
  kara: KaraSchema,
  leavesPicked: v.number(),
});
export type World = v.InferInput<typeof WorldSchema>;

const example_world: World = {
  width: 6,
  height: 1,
  grid: [[{}, {}, {}, {}, {}, { tree: true }]],
  kara: { x: 0, y: 0, dir: "E" },
  leavesPicked: 0,
};

export function getCoordsInFront(kara: Kara): [number, number] {
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

export function getCoordsToLeft(kara: Kara): [number, number] {
  switch (kara.dir) {
    case "E":
      return [kara.x, kara.y - 1];
    case "N":
      return [kara.x - 1, kara.y];
    case "S":
      return [kara.x + 1, kara.y];
    case "W":
      return [kara.x, kara.y + 1];
  }
}

export function getCoordsToRight(kara: Kara): [number, number] {
  switch (kara.dir) {
    case "E":
      return [kara.x, kara.y + 1];
    case "N":
      return [kara.x + 1, kara.y];
    case "S":
      return [kara.x - 1, kara.y];
    case "W":
      return [kara.x, kara.y - 1];
  }
}

export function getCell(world: World, x: number, y: number) {
  return world.grid[y]?.[x]; // optional chaining = undefined, wenn out of bounds
}

export function worldFromAscii(ascii: string): World {
  const rows = ascii.trim().split("\n");
  const height = rows.length;
  const width = Math.max(...rows.map((r) => r.length));

  const grid: Cell[][] = [];
  let kara: Kara | null = null;

  for (let y = 0; y < height; y++) {
    const line = rows[y];
    if (line === undefined) {
      break;
    }
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      const ch = line[x] ?? "_";
      if (ch === "_" || ch === ".") {
        row.push({});
      } else if (ch === "T") {
        row.push({ tree: true });
      } else if (ch === "L") {
        row.push({ leaf: true });
      } else if ("NESW".includes(ch)) {
        row.push({});
        kara = { x, y, dir: ch as Dir };
      } else {
        throw new Error(`Unbekanntes Zeichen '${ch}' bei (${x},${y})`);
      }
    }
    grid.push(row);
  }

  if (!kara) {
    throw new Error("Kein Kara-Startpunkt (N/E/S/W) gefunden.");
  }

  return {
    width,
    height,
    grid,
    kara,
    leavesPicked: 0,
  };
}

export function worldToAscii(world: World): string {
  const rows: string[] = [];

  for (let y = 0; y < world.height; y++) {
    let line = "";
    for (let x = 0; x < world.width; x++) {
      // Kara?
      if (world.kara.x === x && world.kara.y === y) {
        line += world.kara.dir;
        continue;
      }

      const cell = world.grid[y]?.[x];
      if (cell?.tree) line += "T";
      else if (cell?.leaf) line += "L";
      else line += "_";
    }
    rows.push(line);
  }

  return rows.join("\n");
}
