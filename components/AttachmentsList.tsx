const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

type Attachment = {
  id: number;
  name: string;
  url: string;
  mime: string;
};

function getFileLabel(mime: string, name: string) {
  if (
    mime === "application/pdf" ||
    name.toLowerCase().endsWith(".pdf")
  ) {
    return "PDF";
  }

  if (
    mime.includes("word") ||
    name.toLowerCase().endsWith(".doc") ||
    name.toLowerCase().endsWith(".docx")
  ) {
    return "DOC";
  }

  return "Failas";
}

function cleanFileName(name: string) {
  return name
    .replace(/\.(pdf|doc|docx)$/i, "")
    .replace(/[_-]+/g, " ");
}

export function AttachmentsList({
  attachments,
  title = "Dokumentai",
}: {
  attachments: Attachment[];
  title?: string;
}) {
  if (!attachments?.length) {
    return null;
  }

  return (
    <section className={title ? "mt-8" : "mt-3"}>
      {title && (
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
          {title}
        </h2>
      )}

      <div
        className={
          title
            ? "mt-4 border-t border-slate-200"
            : "border-t border-slate-200"
        }
      >
        {attachments.map((file) => (
          <a
            key={file.id}
            href={`${STRAPI_URL}${file.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 border-b border-slate-200 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-[15px] font-medium leading-5 text-slate-800 transition group-hover:text-[#154280]">
                {cleanFileName(file.name)}
              </span>

              <span className="shrink-0 text-xs font-medium text-slate-400">
                {getFileLabel(file.mime, file.name)}
              </span>
            </div>

            <span className="shrink-0 text-sm font-semibold text-[#154280]">
              Atidaryti →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}