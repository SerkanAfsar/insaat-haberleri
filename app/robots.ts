import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/Admin/", "/Login", "/api"],
    },
    sitemap: "https://www.insaathaberleri.org/sitemap.xml",
  };
}
