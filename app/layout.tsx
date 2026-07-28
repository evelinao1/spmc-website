import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getContact } from "@/lib/contact";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_SHORT_NAME,
  getSiteUrl,
} from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: SITE_NAME,

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_SHORT_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Šilutės profesinio mokymo centras",
    "ŠPMC",
    "profesinis mokymas",
    "profesinė mokykla",
    "mokymo programos",
    "profesinis mokymas Šilutėje",
    "mokslas po 10 klasės",
    "mokslas po 12 klasės",
    "tęstinis profesinis mokymas",
    "suaugusiųjų mokymas",
    "Užimtumo tarnybos mokymai",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: siteUrl,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "education",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContact();

  const sameAs = [
    contact?.facebook,
    contact?.instagram,
    contact?.youtube,
  ].filter((url): url is string => Boolean(url));

  const hasStructuredAddress = Boolean(
    contact?.streetAddress ||
      contact?.postalCode ||
      contact?.addressLocality ||
      contact?.addressRegion ||
      contact?.addressCountry
  );

  const organizationJsonLd = {
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,

    name: SITE_NAME,
    legalName: contact?.legalName || SITE_NAME,
    alternateName: SITE_SHORT_NAME,

    description: SITE_DESCRIPTION,
    url: siteUrl,

    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/icon-512.png`,
      contentUrl: `${siteUrl}/icon-512.png`,
      caption: SITE_NAME,
    },

    image: {
      "@type": "ImageObject",
      url: new URL(DEFAULT_OG_IMAGE, siteUrl).toString(),
    },

    ...(contact?.legalEntityCode && {
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Juridinio asmens kodas",
        value: contact.legalEntityCode,
      },
    }),

    ...(hasStructuredAddress
      ? {
          address: {
            "@type": "PostalAddress",
            ...(contact?.streetAddress && {
              streetAddress: contact.streetAddress,
            }),
            ...(contact?.postalCode && {
              postalCode: contact.postalCode,
            }),
            ...(contact?.addressLocality && {
              addressLocality: contact.addressLocality,
            }),
            ...(contact?.addressRegion && {
              addressRegion: contact.addressRegion,
            }),
            ...(contact?.addressCountry && {
              addressCountry: contact.addressCountry,
            }),
          },
        }
      : contact?.address
        ? {
            address: contact.address,
          }
        : {}),

    ...(contact?.phone && {
      telephone: contact.phone,
    }),

    ...(contact?.email && {
      email: contact.email,
    }),

    ...(sameAs.length > 0 && {
      sameAs,
    }),

    ...((contact?.phone || contact?.email) && {
      contactPoint: {
        "@type": "ContactPoint",
        ...(contact?.phone && {
          telephone: contact.phone,
        }),
        ...(contact?.email && {
          email: contact.email,
        }),
        contactType: "general inquiries",
        availableLanguage: ["lt"],
      },
    }),
  };

  const websiteJsonLd = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,

    url: siteUrl,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "lt-LT",

    publisher: {
      "@id": `${siteUrl}/#organization`,
    },

    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/paieska?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd, websiteJsonLd],
  };

  return (
    <html
      lang="lt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {children}
      </body>
    </html>
  );
}