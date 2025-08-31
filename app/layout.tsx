import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub logo",
    }]
  }
}

export default function RootLayout({
  children, modal
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>{children} {modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
