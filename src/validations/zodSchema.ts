import { z } from 'zod';

export const catSchema = z
  .object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
  })
  .required();

export type CreateCatDTO = z.infer<typeof catSchema>;
