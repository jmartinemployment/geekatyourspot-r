import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const sora = Sora({
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL('https://www.geekatyourspot.com'),
    alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'Geek at Your Spot',
    description: "Technology consultancy in Delray Beach, Florida specializing in integrating AI, Process Automation, AI Chatbots, Data Analytics, Strategy Consulting, Security & Compliance for small businesses in Broward, Palm Beach and Miami Dade Counties. Other services include bespoke application development using React, Angular, Microsoft C#, SQL, Node.js, Postgres, Wordpress development. From Timex Sinclair to AI",
    url: 'https://www.geekatyourspot.com',
    siteName: 'Geek at Your Spot',
    images: [
      {
        url: 'https://www.geekatyourspot.com/images/GeekAtYourSpot.svg', // Must be an absolute URL
        width: 124,
        height: 51,
      },
      {
        url: 'https://www.geekatyourspot.com/images/GeekAtYourSpot.svg', // Must be an absolute URL
        width: 124,
        height: 51,
        alt: 'My custom alt',
      },
    ],
    videos: [
    ],
    audio: [
    ],
    locale: 'en_US',
    type: 'website',
  },
  title: "Geek at Your Spot Application",
  description: "Technology consultancy in Delray Beach, Florida specializing in integrating AI, Process Automation, AI Chatbots, Data Analytics, Strategy Consulting, Security & Compliance for small businesses in Broward, Palm Beach and Miami Dade Counties. Other services include bespoke application development using React, Angular, Microsoft C#, SQL, Node.js, Postgres, Wordpress development. From Timex Sinclair to AI",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
   category: 'technology',
   icons: {
    icon: '/favicon.ico', // Points to public/favicon.ico
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full w-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        sora.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
