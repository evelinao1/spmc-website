type CKEditorContentProps = {
  content?: string | null;
};

export function CKEditorContent({
  content,
}: CKEditorContentProps) {
  if (!content) return null;

  return (
    <div
      className="
        ckeditor-content
        space-y-4
        text-slate-700

        [&_p]:leading-7

        [&_h1]:mt-8
        [&_h1]:mb-4
        [&_h1]:text-3xl
        [&_h1]:font-bold
        [&_h1]:tracking-tight
        [&_h1]:text-slate-900

        [&_h2]:mt-8
        [&_h2]:mb-3
        [&_h2]:text-2xl
        [&_h2]:font-semibold
        [&_h2]:tracking-tight
        [&_h2]:text-slate-900

        [&_h3]:mt-6
        [&_h3]:mb-2
        [&_h3]:text-xl
        [&_h3]:font-semibold
        [&_h3]:text-slate-900

        [&_strong]:font-semibold
        [&_strong]:text-slate-900

        [&_em]:italic

        [&_ul]:list-disc
        [&_ul]:pl-6

        [&_ol]:list-decimal
        [&_ol]:pl-6

        [&_li]:my-1

        [&_a]:font-medium
        [&_a]:text-[#154280]
        [&_a]:underline
        [&_a]:underline-offset-2

        [&_blockquote]:border-l-4
        [&_blockquote]:border-slate-200
        [&_blockquote]:pl-4
        [&_blockquote]:italic
        [&_blockquote]:text-slate-600

        [&_figure.table]:my-6
        [&_figure.table]:overflow-x-auto

        [&_table]:w-full
        [&_table]:border-collapse
        [&_table]:text-sm

        [&_td]:border
        [&_td]:border-slate-200
        [&_td]:px-3
        [&_td]:py-2
        [&_td]:align-middle

        [&_th]:border
        [&_th]:border-slate-200
        [&_th]:bg-slate-50
        [&_th]:px-3
        [&_th]:py-2
        [&_th]:text-left
        [&_th]:font-semibold
        [&_th]:text-slate-900

        [&_td_p]:my-0
        [&_th_p]:my-0
        [&_td_p]:leading-5
        [&_th_p]:leading-5
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}