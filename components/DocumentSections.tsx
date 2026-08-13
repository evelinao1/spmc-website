import { AttachmentsList } from "@/components/AttachmentsList";

type Attachment = {
  id: number;
  name: string;
  url: string;
  mime: string;
};

type DocumentSection = {
  id: number;
  title: string;
  description?: string | null;
  attachments?: Attachment[];
};

export function DocumentSections({
  sections,
}: {
  sections?: DocumentSection[];
}) {
  if (!sections?.length) {
    return null;
  }

  return (
    <div className="mt-10 space-y-8">
      {sections.map((section) => (
        <section key={section.id}>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            {section.title}
          </h2>

          {section.description && (
            <p className="mt-1 text-slate-600">
              {section.description}
            </p>
          )}

          <AttachmentsList
            attachments={section.attachments ?? []}
            title=""
          />
        </section>
      ))}
    </div>
  );
}