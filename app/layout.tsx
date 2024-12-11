import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "Delta Facility Services",
  description: "",
  // Adding the favicon link
  icons: {
    icon: "/logo.png", // Or "/favicon.png" depending on your file
  },
};

const poppins = Poppins({
  weight: ['400'], // Regular weight
  subsets: ['latin'], // Default subset
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
