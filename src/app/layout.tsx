import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stashly — Save. Search. Share.",
  description:
    "Stop losing links buried in DMs and saved posts. Stashly gives every link a title, tags, and a home — searchable in seconds.",
  metadataBase: new URL("https://stashly.pro"),
  openGraph: {
    title: "Stashly — Save. Search. Share.",
    description:
      "Stop losing links buried in DMs and saved posts. Stashly gives every link a title, tags, and a home — searchable in seconds.",
    url: "https://stashly.pro",
    siteName: "Stashly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stashly — Save. Search. Share.",
    description:
      "Stop losing links buried in DMs and saved posts. Stashly gives every link a title, tags, and a home — searchable in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#6C47FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
