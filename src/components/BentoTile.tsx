import type { Project } from '@/lib/types';

interface BentoTileProps {
  project: Project;
  index: number;
  total: number;
}

type CategoryTexture = 'mono' | 'serif' | 'sans' | 'image';

function getCategoryTexture(category: string): CategoryTexture {
  switch (category) {
    case 'code':
    case 'experiments':
      return 'mono';
    case 'poetry':
    case 'story':
      return 'serif';
    case 'design':
      return 'sans';
    case 'photography':
    case 'art':
      return 'image';
    default:
      return 'sans';
  }
}

export default function BentoTile({ project, index, total }: BentoTileProps) {
  const texture = getCategoryTexture(project.category);

  // Asymmetric span: first and last items span wider
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const spanClass = isFirst || isLast
    ? 'md:col-span-6'
    : 'md:col-span-4';

  // Texture-based typography class
  const titleClass = texture === 'mono'
    ? 'font-utility text-sm tracking-wider uppercase'
    : texture === 'serif'
      ? 'font-editorial text-2xl font-semibold'
      : 'font-body text-xl font-semibold';

  return (
    <a
      href={`#collection/${project.slug}`}
      className={`group block border border-border rounded-none overflow-hidden transition-all duration-200 hover:border-border-strong hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${spanClass}`}
      style={{ borderTopColor: project.accent, borderTopWidth: '4px' }}
    >
      {/* Image area (if available) */}
      {project.image && (
        <div className="aspect-[16/10] overflow-hidden bg-surface-elevated">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      {/* Content area */}
      <div className="p-[28px] flex flex-col gap-[14px]">
        {/* Category label */}
        <span
          className="type-mono-util"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>

        {/* Title — texture-aware */}
        <h3 className={`${titleClass} text-text`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="type-body text-text-secondary text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Status + Link */}
        <div className="flex items-center justify-between mt-auto pt-[14px] border-t border-border">
          <span className="type-mono-util text-text-faint">
            {project.status}
          </span>
          <span
            className="type-mono-util flex items-center gap-[7px] transition-all duration-200 group-hover:gap-[14px]"
            style={{ color: project.accent }}
          >
            {project.linkLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
