import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Accent tokens from src/ds/tokens/colors.css. Kept in sync with the OG card palette.
const accent = z.enum(['amber', 'indigo', 'teal', 'canada']);

// Field Notes. One .mdx per note; the file name is the slug (== glob entry id).
// `date`/`dateLong` stay strings to preserve the exact display text the views
// render ("Jul 6, 2026" / "July 6, 2026"); sorting parses dateLong via new Date().
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    category: z.string(),
    accent,
    featured: z.boolean().default(false),
    date: z.string(),
    dateLong: z.string(),
    updatedLong: z.string().optional(),
    time: z.string(),
    tags: z.array(z.string()),
  }),
});

// Lab reports. One .mdx per project. `date` is optional (some entries only have `year`).
const lab = defineCollection({
  loader: glob({ base: './src/content/lab', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['Software', 'Process']),
    ai: z.boolean(),
    status: z.string(),
    accent,
    featured: z.boolean().default(false),
    tagline: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    link: z.string(),
    linkLabel: z.string(),
    year: z.string(),
    date: z.string().optional(),
  }),
});

export const collections = { notes, lab };
