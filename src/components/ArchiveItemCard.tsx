import type { CollectionItem } from '@/lib/types';

interface ArchiveItemCardProps {
  item: CollectionItem;
}

export default function ArchiveItemCard({ item }: ArchiveItemCardProps) {
  return (
    <a
      href={`#collection/${item.collectionSlug}/${item.slug}`}
      className="group block border border-border rounded-none overflow-hidden transition-all duration-200 hover:border-border-strong hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      {/* Image */}
      {item.image ? (
        <div className="aspect-[4/3] overflow-hidden bg-surface-elevated">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] bg-surface-elevated flex items-center justify-center"
          style={{ borderTopColor: item.accent, borderTopWidth: '4px' }}
        >
          <span className="font-editorial text-2xl text-text-faint">{item.title}</span>
        </div>
      )}

      {/* Metadata */}
      <div className="p-[21px] flex flex-col gap-[7px]">
        <span className="type-mono-util" style={{ color: item.accent }}>
          {item.category}
        </span>
        <h3 className="font-editorial text-xl font-semibold text-text">
          {item.title}
        </h3>
        {item.description && (
          <p className="type-body text-text-secondary text-sm line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
}
