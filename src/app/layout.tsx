import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import StoreProvider from "@/store/StoreProvider";
import useMockServiceWorker from "@/mocks/useMockServiceWorker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paw's Friend",
  description: "Find the right pet sitter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // useMockServiceWorker();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
