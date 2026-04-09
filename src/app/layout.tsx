import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your daily expenses with clarity. Add, view, and remove expenses by category.",
  keywords: ["expense tracker", "budget", "personal finance"],
  authors: [{ name: "Expense Tracker App" }],
  openGraph: {
    title: "Expense Tracker",
    description: "Track your daily expenses with clarity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
