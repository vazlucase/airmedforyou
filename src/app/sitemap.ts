import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/uti-aerea",
    "/voos-executivos",
    "/clubmed",
    "/cote-seu-voo",
    "/sobre",
    "/conhecer-mais",
    "/contato",
    "/politica-de-privacidade",
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/cote-seu-voo" ? 0.9 : 0.7,
  }));
}
