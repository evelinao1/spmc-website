import type { ReactNode } from "react";

export type StrapiTextChild = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type StrapiBlock = {
  type: string;
  level?: number;
  format?: string;
  children?: StrapiTextChild[] | StrapiBlock[];
};

type RichTextProps = {
  blocks?: StrapiBlock[] | null;
  content?: StrapiBlock[] | null;
};

function renderText(children?: StrapiTextChild[]) {
  if (!children) return null;

  return children.map((child, index) => {
    let text: ReactNode = child.text;

    if (child.bold) text = <strong key={index}>{text}</strong>;
    if (child.italic) text = <em key={index}>{text}</em>;
    if (child.underline) text = <u key={index}>{text}</u>;

    return <span key={index}>{text}</span>;
  });
}

export function RichText({ blocks, content }: RichTextProps) {
  const items = blocks ?? content;

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-5 text-lg leading-8 text-slate-700">
      {items.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {renderText(block.children as StrapiTextChild[])}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-6 text-2xl font-semibold text-slate-900"
            >
              {renderText(block.children as StrapiTextChild[])}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {(block.children as StrapiBlock[])?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {renderText(item.children as StrapiTextChild[])}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}