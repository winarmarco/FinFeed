import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/_trpc/provider";
import { LivePriceContextProvider } from "@/lib/context/LivePriceContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinFeed",
  description: "SocialVesting To Share Ideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <TRPCProvider>
          <LivePriceContextProvider>
            <body className={inter.className}>{children}</body>
          </LivePriceContextProvider>
        </TRPCProvider>
      </ClerkProvider>
    </html>
  );
}
