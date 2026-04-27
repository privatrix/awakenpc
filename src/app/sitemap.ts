import type { MetadataRoute } from "next"
import { POSTS } from "./papers/posts"
import { CANON } from "./lore/canon"

const BASE = "https://awakenpc.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/awakening`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/oracle`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/papers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/lore`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/archive`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/debates`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ]

  const paperRoutes: MetadataRoute.Sitemap = POSTS.map(post => ({
    url: `${BASE}/papers/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const canonRoutes: MetadataRoute.Sitemap = CANON.map(entry => ({
    url: `${BASE}/lore#${entry.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...paperRoutes, ...canonRoutes]
}
