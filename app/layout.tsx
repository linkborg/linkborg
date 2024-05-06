import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextAuthProvider} from "@/app/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkBorg",
  description: "The ultimate link shortener platform - linkb.org",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </body>
      </html>
  );
}