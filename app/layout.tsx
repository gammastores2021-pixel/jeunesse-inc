import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeunesse-inc.co"),
  title: {
    default: "Jeunesse Stores LLC — AI Transformation & Integrated Marketing",
    template: "%s · Jeunesse Stores LLC"
  },
  description:
    "Jeunesse Stores LLC embeds AI into business operations and runs the marketing engines on top.",
  applicationName: "Jeunesse Stores LLC",
  authors: [{ name: "Jeunesse Stores LLC" }],
  creator: "Jeunesse Stores LLC",
  publisher: "Jeunesse Stores LLC",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"]
  }
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
