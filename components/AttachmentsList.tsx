const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

type Attachment = {
  id: number;
  name: string;
  url: string;
  mime: string;
};

export function AttachmentsList({
  attachments,
}: {
  attachments: Attachment[];
}) {
  if (!attachments?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-semibold">
        Dokumentai
      </h2>

      <div className="space-y-3">
        {attachments.map((file) => (
          <a
            key={file.id}
            href={`${STRAPI_URL}${file.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >
            <span>{file.name}</span>

            <span className="text-sm text-blue-600">
              Atsisiųsti
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}