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

    if (child.bold) {
      text = <strong>{text}</strong>;
    }

    if (child.italic) {
      text = <em>{text}</em>;
    }

    if (child.underline) {
      text = <u>{text}</u>;
    }

    return <span key={index}>{text}</span>;
  });
}

export function RichText({ blocks, content }: RichTextProps) {
  const items = blocks ?? content;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 text-slate-600 leading-7">
      {items.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {renderText(
                block.children as StrapiTextChild[]
              )}
            </p>
          );
        }

        if (block.type === "heading") {
          const children = renderText(
            block.children as StrapiTextChild[]
          );

          if (block.level === 3) {
            return (
              <h3
                key={index}
                className="pt-4 text-xl font-semibold text-slate-900"
              >
                {children}
              </h3>
            );
          }

          if (block.level === 4) {
            return (
              <h4
                key={index}
                className="pt-3 text-lg font-semibold text-slate-900"
              >
                {children}
              </h4>
            );
          }

          return (
            <h2
              key={index}
              className="pt-5 text-2xl font-semibold text-slate-900"
            >
              {children}
            </h2>
          );
        }

        if (block.type === "list") {
          const listItems = (
            block.children as StrapiBlock[]
          )?.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderText(
                item.children as StrapiTextChild[]
              )}
            </li>
          ));

          if (block.format === "ordered") {
            return (
              <ol
                key={index}
                className="list-decimal space-y-1.5 pl-6"
              >
                {listItems}
              </ol>
            );
          }

          return (
            <ul
              key={index}
              className="list-disc space-y-1.5 pl-6"
            >
              {listItems}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}