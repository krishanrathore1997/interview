import type { MetadataRoute } from 'next';
import { navigationContent } from '@/data/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/checklist'];
  const topicRoutes = navigationContent.map((section) => section.href);
  const routes = Array.from(new Set([...staticRoutes, ...topicRoutes]));

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
