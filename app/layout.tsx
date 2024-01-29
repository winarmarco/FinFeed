import type {Metadata} from "next";
import {ClerkProvider} from "@clerk/nextjs";
import {Inter} from "next/font/google";
import "./globals.css";
import {TRPCProvider} from "@/_trpc/provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "FinFeed",
  description: "SocialVesting To Share Ideas",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <TRPCProvider>
          <body className={inter.className}>{children}</body>
        </TRPCProvider>
      </ClerkProvider>
    </html>
  );
}
