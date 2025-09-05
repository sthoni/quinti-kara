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
