import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trittico Ristorante | Authentic Italian Dining - Hackham, Adelaide",
  description: "Experience authentic Italian cuisine at Trittico Ristorante in Hackham, Adelaide. Fresh pasta, wood-fired pizza, fine dining. Online ordering, gift cards available.",
  keywords: "Italian restaurant, Hackham, Adelaide, pasta, pizza, authentic Italian, Trittico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
