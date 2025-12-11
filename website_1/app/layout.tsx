import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HQ Blogs | Ideas Worth Exploring",
  description: "Discover insights, stories, and perspectives that spark curiosity and inspire action.",
  keywords: ["blog", "articles", "insights", "stories"],
  authors: [{ name: "HQ Blogs" }],
  openGraph: {
    title: "HQ Blogs | Ideas Worth Exploring",
    description: "Discover insights, stories, and perspectives that spark curiosity and inspire action.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
