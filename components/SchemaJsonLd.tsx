type SchemaJsonLdProps = {
  data: unknown;
};

export function SchemaJsonLd({ data }: SchemaJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}