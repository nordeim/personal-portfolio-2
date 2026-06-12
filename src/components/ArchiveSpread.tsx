import ArchiveItemCard from './ArchiveItemCard';
import ContentBody from './ContentBody';
import type { Collection, CollectionItem } from '@/lib/types';

interface ArchiveSpreadProps {
  collection: Collection;
  items: CollectionItem[];
  activeItem: CollectionItem | null;
}

export default function ArchiveSpread({
  collection,
  items,
  activeItem,
}: ArchiveSpreadProps) {
  // Item Detail View
  if (activeItem) {
    return (
      <section className="pt-[84px] pb-[104px]">
        <div className="mx-auto max-w-[1536px] px-[28px]">
          {/* Back Navigation */}
          <a
            href={`#collection/${collection.slug}`}
            className="inline-flex items-center gap-[7px] type-mono-util mb-[28px] transition-colors duration-200"
            style={{ color: collection.accent, borderBottom: `1px solid ${collection.accent}` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to {collection.title}
          </a>

          {/* Two-column editorial spread */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[56px]">
            {/* Left: Image */}
            <div className="border border-border overflow-hidden">
              {activeItem.image ? (
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[4/3] bg-surface-elevated flex items-center justify-center">
                  <span className="font-editorial text-4xl text-text-faint">
                    {activeItem.title}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Content */}
            <div className="flex flex-col gap-[28px]">
              {/* Category */}
              <span className="type-mono-util" style={{ color: collection.accent }}>
                {activeItem.category}
              </span>

              {/* Title */}
              <h1 className="type-editorial-h2">{activeItem.title}</h1>

              {/* Description */}
              {activeItem.description && (
                <p className="type-body text-text-secondary">
                  {activeItem.description}
                </p>
              )}

              {/* Body content */}
              {activeItem.body && (
                <ContentBody body={activeItem.body} category={activeItem.category} />
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-[14px] mt-[14px] pt-[14px] border-t border-border">
                {activeItem.link && (
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-mono-util px-[21px] py-[10px] border border-border rounded-none text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-200"
                  >
                    {activeItem.linkLabel}
                  </a>
                )}
                {activeItem.document && (
                  <a
                    href={activeItem.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-mono-util px-[21px] py-[10px] border border-border rounded-none text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-200"
                  >
                    View PDF
                  </a>
                )}
              </div>

              {/* Status */}
              <span className="type-mono-util text-text-faint">
                Status: {activeItem.status}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Collection List View
  return (
    <section className="pt-[84px] pb-[104px]">
      <div className="mx-auto max-w-[1536px] px-[28px]">
        {/* Back to Home */}
        <a
          href="#"
          className="inline-flex items-center gap-[7px] type-mono-util text-text-muted mb-[28px] hover:text-text transition-colors duration-200"
          style={{ borderBottom: '1px solid currentColor' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Home
        </a>

        {/* Collection Header */}
        <div className="mb-[56px]">
          <span className="type-mono-util mb-[14px] block" style={{ color: collection.accent }}>
            {collection.category}
          </span>
          <h1 className="type-editorial-h2 mb-[14px]">{collection.title}</h1>
          <p className="type-body text-text-secondary max-w-[640px]">
            {collection.description}
          </p>
        </div>

        {/* Item Grid */}
        {items.length === 0 ? (
          <div className="flex items-center justify-center py-[104px] border border-border">
            <p className="type-mono-util text-text-muted">
              No items in this collection yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]">
            {items.map((item) => (
              <ArchiveItemCard
                key={`archive-item-${item.slug}`}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
