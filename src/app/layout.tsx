import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL("https://rebeccahermanfostering.com"),

  title: {
    default: "Cavalier King Charles Rehoming Center",
    template: "%s | Cavalier King Charles Rehoming Center",
  },

  description:
    "Find healthy, home-raised Cavalier King Charles Spaniels ready for loving homes. Vet-checked, vaccinated, and responsibly rehomed across the U.S.",

  keywords: [
    "Cavalier King Charles Spaniel puppies",
    "Cavalier puppies for adoption",
    "Cavalier King Charles Spaniel rehoming",
    " Cavalier King Charles Spaniel puppies",
    "family puppies",
    "Cavalier King Charles Rehoming Center"
  ],

  authors: [{ name: "Cavalier King Charles Rehoming Center" }],
  creator: "Cavalier King Charles Rehoming Center",
  publisher: "Cavalier King Charles Rehoming Center",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://rebeccahermanfostering.com",
  },

  openGraph: {
    type: "website",
    url: "https://rebeccahermanfostering.com",
    title:
      "Cavalier King Charles Rehoming Center",
    description:
      "Healthy, vet-checked Cavalier King Charles Spaniels raised with care and ready for loving homes.",
    siteName: "Cavalier King Charles Rehoming Center",
    images: [
      {
        url: "https://rebeccahermanfostering.com/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Cavalier King Charles Rehoming Center",
      },
    ],
    locale: "en_US",
  },

  other: {
    "fb:app_id": "1234567890",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Cavalier King Charles Rehoming Center",
    description:
      "Find healthy, home-raised Cavalier King Charles Spaniels ready for loving families.",
    images: ["https://rebeccahermanfostering.com/thumbnail.png"],
  },

  category: "Pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Toaster position="top-right" />
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = 'd43cf828f52918b1f76f0bf80618471b7cd0398a';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `
        }} />
      </body>
    </html>
  );
}
