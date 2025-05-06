import type { Metadata } from "next"
import { Comic_Neue, Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/components/ThemeRegistry"
import StoreProvider from "@/store/StoreProvider"
import MockWrapper from "@/components/MockWrapper"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AuthProvider from "@/contexts/AuthProvider"

// ✅ 通知功能相关 import
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] })
const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-comic-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Paw's Friend",
  description: "Find the right pet sitter",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${comicNeue.variable}`}>
        <StoreProvider>
          <AuthProvider>
            <ThemeRegistry>
              <MockWrapper>
                <Header />
                {children}
                <Footer />
                <ToastContainer position="top-right" autoClose={4000} />
              </MockWrapper>
            </ThemeRegistry>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
