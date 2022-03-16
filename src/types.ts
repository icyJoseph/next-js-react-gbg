import { Infer, object, number, string, boolean } from "superstruct";

export const Pokemon = object({
  id: number(),
  name: string(),
  order: number(),
  sprites: object({
    frontDefault: string(),
  }),
  weight: number(),
  height: number(),
  captureRate: number(),
  description: string(),
});

export type Pokemon = Infer<typeof Pokemon>;

export type Message = { message: string };

export const Catch = object({
  id: number(),
  success: boolean(),
});
