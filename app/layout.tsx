import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex crypto calculate",
  description: "alex 計算器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
