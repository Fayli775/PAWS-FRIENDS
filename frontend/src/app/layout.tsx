import type { Metadata } from "next";
import { Comic_Neue, Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import StoreProvider from "@/store/StoreProvider";
import useMockServiceWorker from "@/mocks/useMockServiceWorker";

const inter = Inter({ subsets: ["latin"] });
const comicNeue = Comic_Neue({ // Ensure Comic_Neue is configured here
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-comic-neue', // This defines the variable name
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Paw's Friend",
  description: "Find the right pet sitter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // useMockServiceWorker();

  return (
    <html lang="en">
      <body className={`${inter.className} ${comicNeue.variable}`}>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
