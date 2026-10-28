import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { serviceDetails } from "@/config/services";
import { provincePages } from "@/config/service-areas";
import { cities, cityUrl, costUrl } from "@/config/cities";
import { blogPosts } from "@/config/blog";

const siteUrl = site.url;

// Every URL ends with "/" to match next.config trailingSlash.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = Object.keys(serviceDetails).map(
    (slug) => ({
      url: `${siteUrl}/services/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const provinceLandingPages: MetadataRoute.Sitemap = provincePages.map((p) => ({
    url: `${siteUrl}/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/service-areas/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...provinceLandingPages,
    ...servicePages,
    ...cities.map((c) => page(cityUrl(c), 0.8)),
    page("/duct-cleaning-cost/", 0.9),
    ...cities.map((c) => page(costUrl(c), 0.8)),
    page("/blog/", 0.6, "weekly"),
    ...blogPosts.map((p) => page(`/blog/${p.slug}/`, 0.6)),
  ];
}
