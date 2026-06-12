import BentoTile from './BentoTile';
import type { Project, CollectionItem } from '@/lib/types';

interface BentoGridProps {
  projects: Project[];
  portfolioItems: CollectionItem[];
}

export default function BentoGrid({ projects }: BentoGridProps) {
  if (projects.length === 0) {
    return (
      <section id="work" className="py-[104px] border-t border-border">
        <div className="mx-auto max-w-[1536px] px-[28px]">
          <span className="type-mono-util text-text-faint tracking-widest">
            02 / Work
          </span>
          <div className="mt-[56px] flex items-center justify-center py-[104px] border border-border">
            <p className="type-mono-util text-text-muted">No projects yet</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-[104px] border-t border-border">
      <div className="mx-auto max-w-[1536px] px-[28px]">
        {/* Section Label */}
        <div className="mb-[56px]">
          <span className="type-mono-util text-text-faint tracking-widest">
            02 / Work
          </span>
        </div>

        {/* 12-column asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[28px]">
          {projects.map((project, index) => (
            <BentoTile
              key={`tile-${project.slug}`}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
