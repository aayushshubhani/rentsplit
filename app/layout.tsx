import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "RentSplit — Smart Shared Expense Management for Roommates",
  description: "RentSplit is a cloud-based shared expense management platform for roommates, hostels, and shared apartments. Split bills, verify payments with AI, and manage group finances effortlessly.",
  keywords: "rent split, roommate expense tracker, shared bills, rent calculator, expense management, AI payment verification",
  openGraph: {
    title: "RentSplit — Smart Shared Expense Management",
    description: "Split bills, verify payments with AI, manage group finances for roommates and shared apartments.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
