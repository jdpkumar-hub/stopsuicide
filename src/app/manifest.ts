import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "stopsuicide.in",
    short_name: "stopsuicide",
    description: "Hope, resilience, recovery, and mental wellness.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f9ff",
    theme_color: "#2563EB",
    lang: "en",
  };
}
