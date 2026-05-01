import type { MetadataRoute } from "next";

const base = "https://www.geekatyourspot.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
