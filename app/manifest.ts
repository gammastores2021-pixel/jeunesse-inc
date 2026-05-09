import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jeunesse Stores LLC",
    short_name: "Jeunesse",
    description: "AI transformation and integrated marketing.",
    start_url: "/en",
    display: "standalone",
    background_color: "#F7F6F2",
    theme_color: "#0B1F3A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
