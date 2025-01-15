import type { Metadata } from "next";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chalkstone Council Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
