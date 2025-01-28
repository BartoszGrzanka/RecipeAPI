"use client";
import './globals.css'
import { DataProvider } from "@/contexts/APIContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
