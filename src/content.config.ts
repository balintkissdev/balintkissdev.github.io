import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const sideProjects = defineCollection({
  loader: file('src/data/side-projects.yaml'),
  schema: z.object({
    title: z.string(),
    repoUrl: z.string(),
    demoUrl: z.string().optional(),
    domain: z.string().optional(),
    badges: z.array(z.string()).optional(),
    image: z.string().optional(),
    githubStarRepo: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = { 'side-projects': sideProjects };
