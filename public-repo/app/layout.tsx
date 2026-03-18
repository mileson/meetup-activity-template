import type { Metadata } from "next";
import { event } from "@/data/event";
import "./globals.css";

export const metadata: Metadata = {
  title: event.title,
  description: event.summary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
