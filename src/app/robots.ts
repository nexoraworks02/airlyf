import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const siteUrl = site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
