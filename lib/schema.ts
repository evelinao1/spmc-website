import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

export type SchemaBreadcrumbItem = {
  label: string;
  href: string;
};

type CreateNewsArticleJsonLdArgs = {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  imageUrl?: string | null;
};

export function createBreadcrumbJsonLd(
  items: SchemaBreadcrumbItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };
}

export function createNewsArticleJsonLd({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  imageUrl,
}: CreateNewsArticleJsonLdArgs) {
  const articleUrl = new URL(path, siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,

    headline: title,
    description,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    ...(publishedTime && {
      datePublished: publishedTime,
    }),

    ...(modifiedTime && {
      dateModified: modifiedTime,
    }),

    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),

    author: {
      "@id": `${siteUrl}/#organization`,
    },

    publisher: {
      "@id": `${siteUrl}/#organization`,
    },

    inLanguage: "lt-LT",
    isAccessibleForFree: true,
  };
}
type CreateCourseJsonLdArgs = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string | null;
  qualification?: string | null;
  targetAudience?: string | null;
  category?: string | null;
};

export function createCourseJsonLd({
  title,
  description,
  path,
  imageUrl,
  qualification,
  targetAudience,
  category,
}: CreateCourseJsonLdArgs) {
  const courseUrl = new URL(path, siteUrl).toString();
  const organizationId = new URL(
    "/#organization",
    siteUrl
  ).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${courseUrl}#course`,
    name: title,
    description,
    url: courseUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": courseUrl,
    },
    provider: {
      "@id": organizationId,
    },
    inLanguage: "lt-LT",

    ...(imageUrl && {
      image: imageUrl,
    }),

    ...(qualification && {
      educationalCredentialAwarded: qualification,
    }),

    ...(targetAudience && {
      audience: {
        "@type": "EducationalAudience",
        educationalRole: targetAudience,
      },
    }),

    ...(category && {
      about: category,
    }),
  };
}
type CreatePersonJsonLdArgs = {
  name: string;
  path: string;
  jobTitle?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  telephone?: string | null;
};

export function createPersonJsonLd({
  name,
  path,
  jobTitle,
  imageUrl,
  email,
  telephone,
}: CreatePersonJsonLdArgs) {
  const personUrl = new URL(path, siteUrl).toString();
  const organizationId = new URL(
    "/#organization",
    siteUrl
  ).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${personUrl}#person`,
    name,
    url: personUrl,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": personUrl,
    },

    worksFor: {
      "@id": organizationId,
    },

    ...(jobTitle && {
      jobTitle,
    }),

    ...(imageUrl && {
      image: imageUrl,
    }),

    ...(email && {
      email,
    }),

    ...(telephone && {
      telephone,
    }),
  };
}
type CreateCampusJsonLdArgs = {
  name: string;
  description: string;
  path: string;
  imageUrl?: string | null;
  address?: string | null;
  telephone?: string | null;
  email?: string | null;
};

export function createCampusJsonLd({
  name,
  description,
  path,
  imageUrl,
  address,
  telephone,
  email,
}: CreateCampusJsonLdArgs) {
  const campusUrl = new URL(path, siteUrl).toString();
  const organizationId = new URL(
    "/#organization",
    siteUrl
  ).toString();

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${campusUrl}#organization`,
    name,
    description,
    url: campusUrl,

    parentOrganization: {
      "@id": organizationId,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": campusUrl,
    },

    ...(imageUrl && {
      image: imageUrl,
    }),

    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressCountry: "LT",
      },
    }),

    ...(telephone && {
      telephone,
    }),

    ...(email && {
      email,
    }),
  };
}
type CreateContactPageJsonLdArgs = {
  name: string;
  description: string;
  path: string;
  telephone?: string | null;
  email?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  addressLocality?: string | null;
  addressRegion?: string | null;
  addressCountry?: string | null;
  socialLinks?: Array<string | null | undefined>;
};

export function createContactPageJsonLd({
  name,
  description,
  path,
  telephone,
  email,
  streetAddress,
  postalCode,
  addressLocality,
  addressRegion,
  addressCountry,
  socialLinks = [],
}: CreateContactPageJsonLdArgs) {
  const pageUrl = new URL(path, siteUrl).toString();
  const organizationId = new URL(
    "/#organization",
    siteUrl
  ).toString();

  const sameAs = socialLinks.filter(
    (link): link is string => Boolean(link)
  );

  const hasAddress =
    streetAddress ||
    postalCode ||
    addressLocality ||
    addressRegion ||
    addressCountry;

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${pageUrl}#webpage`,
    name,
    description,
    url: pageUrl,
    inLanguage: "lt-LT",

    mainEntity: {
      "@type": "EducationalOrganization",
      "@id": organizationId,

      ...(telephone && {
        telephone,
      }),

      ...(email && {
        email,
      }),

      ...(telephone || email
        ? {
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Bendroji informacija",

              ...(telephone && {
                telephone,
              }),

              ...(email && {
                email,
              }),

              availableLanguage: "Lithuanian",
            },
          }
        : {}),

      ...(hasAddress && {
        address: {
          "@type": "PostalAddress",

          ...(streetAddress && {
            streetAddress,
          }),

          ...(postalCode && {
            postalCode,
          }),

          ...(addressLocality && {
            addressLocality,
          }),

          ...(addressRegion && {
            addressRegion,
          }),

          addressCountry: addressCountry || "LT",
        },
      }),

      ...(sameAs.length > 0 && {
        sameAs,
      }),
    },
  };
}