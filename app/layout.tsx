import type { Metadata } from "next";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// eslint-disable-next-line import/no-unused-modules
export const metadata: Metadata = {
  title: "Chalkstone Council Portal",
};

// eslint-disable-next-line import/no-unused-modules
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
