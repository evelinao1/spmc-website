type TextChild = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
};

type Block = {
  type: string;
  children?: TextChild[];
};

export function StrapiBlocks({ content }: { content: Block[] }) {
  if (!content) return null;

  return (
    <div className="space-y-4 text-slate-700">
      {content.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {block.children?.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}