import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jan Ausadhi",
  description: "medicine lookup for jan-ausadhi medicines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
