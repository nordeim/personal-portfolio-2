interface ContentBodyProps {
  body: string;
  category: string;
}

export default function ContentBody({ body, category }: ContentBodyProps) {
  const isPoetry = category === 'poetry';
  const lines = body.split('\n').filter((line) => line.trim().length > 0);

  if (isPoetry) {
    return (
      <div className="flex flex-col gap-[7px]">
        {lines.map((line, index) => (
          <p
            key={`poem-line-${index}`}
            className="font-editorial text-lg leading-relaxed text-text-secondary"
          >
            {line}
          </p>
        ))}
      </div>
    );
  }

  // Prose: wrap each paragraph block
  const paragraphs = body.split(/\n\n+/).filter((p) => p.trim().length > 0);
  return (
    <div className="flex flex-col gap-[14px]">
      {paragraphs.map((paragraph, index) => (
        <p
          key={`prose-para-${index}`}
          className="type-body text-text-secondary"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
