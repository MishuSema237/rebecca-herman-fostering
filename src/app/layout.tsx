import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { seoConfig } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://cavalierkingcharlesrehomingcenter.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": seoConfig.siteName,
  "description": seoConfig.description,
  "url": siteUrl,
  "telephone": seoConfig.phone,
  "email": seoConfig.email,
  "priceRange": "$$",
  "serviceType": ["Dog Adoption", "Pet Rehoming"],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "areaServed": "United States",
  "sameAs": [
    "https://www.facebook.com/CavalierKingCharlesRehomingCenter"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": seoConfig.siteName,
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/puppies?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: seoConfig.siteName,
    template: `%s | ${seoConfig.siteName}`,
  },

  description: seoConfig.description,

  keywords: seoConfig.keywords,

  authors: [{ name: seoConfig.ownerName }],
  creator: seoConfig.ownerName,
  publisher: seoConfig.siteName,

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
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: seoConfig.siteName,
    description: seoConfig.description,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.socialImage,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
    locale: "en_US",
  },

  other: {
    "fb:app_id": "1234567890",
  },

  twitter: {
    card: "summary_large_image",
    site: "@CKCRehoming",
    creator: seoConfig.twitterHandle,
    title: seoConfig.siteName,
    description: seoConfig.description,
    images: [seoConfig.socialImage],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
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
