import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum([
				'mindful-living',
				'plant-based-wellness',
				'emotional-wellbeing',
				'chan-meditation',
				'community-events',
			]).default('mindful-living'),
			lang: z.enum(['en', 'zh']).default('zh'),
			tags: z.array(z.string()).optional(),
		}),
});

export const collections = { blog };
