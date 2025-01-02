import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextAuthProvider} from "@/app/session-provider";
import { ThemeProvider } from "@/app/theme-provider"
import { CSPostHogProvider } from "@/app/posthog-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `LinkBorg - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
  description: "The ultimate link shortener platform",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CSPostHogProvider>
                <NextAuthProvider>
                    {children}
                </NextAuthProvider>
            </CSPostHogProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}