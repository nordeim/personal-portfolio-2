import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { AboutPillar } from '@/lib/types';

interface AboutFlowProps {
  pillars: AboutPillar[];
}

export default function AboutFlow({ pillars }: AboutFlowProps) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [sizerHeight, setSizerHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const activePillar = pillars[activePillarIndex];

  // Stable height sizer pattern: measure the content, set explicit height
  useEffect(() => {
    if (sizerRef.current) {
      setSizerHeight(sizerRef.current.scrollHeight);
    }
  }, [activePillarIndex, pillars]);

  return (
    <section
      id="about"
      className="relative py-[104px] border-t border-border"
    >
      <div className="mx-auto max-w-[1536px] px-[28px]">
        {/* Section Label */}
        <div className="mb-[56px]">
          <span className="type-mono-util text-text-faint tracking-widest">
            01 / About
          </span>
        </div>

        {/* Asymmetric Grid: 0.26fr / 0.74fr */}
        <div className="grid grid-cols-1 md:grid-cols-[0.26fr_0.74fr] gap-[56px]">
          {/* Left: Pillar Navigation */}
          <div className="flex md:flex-col gap-[7px] md:border-l border-border md:pl-[28px]">
            {pillars.map((pillar, index) => (
              <button
                key={`pillar-${index}-${pillar.title}`}
                onClick={() => setActivePillarIndex(index)}
                className={`font-utility text-xs tracking-wider uppercase px-[14px] py-[7px] border rounded-none transition-all duration-200 text-left ${
                  index === activePillarIndex
                    ? 'border-text text-text bg-text/5'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                }`}
                aria-pressed={index === activePillarIndex}
              >
                {pillar.title}
              </button>
            ))}
          </div>

          {/* Right: Content with Stable Height */}
          <div
            style={{ minHeight: sizerHeight > 0 ? `${sizerHeight}px` : undefined }}
            className="relative"
          >
            {/* Visible content with fade transition */}
            {activePillar && (
              <div
                ref={contentRef}
                className={`transition-opacity duration-900 ease-out ${
                  prefersReduced ? '' : 'animate-fadeIn'
                }`}
              >
                {/* Pillar Title — Editorial Serif */}
                <h2 className="type-editorial-h2 mb-[28px]">{activePillar.title}</h2>

                {/* Paragraphs */}
                <div className="flex flex-col gap-[21px]">
                  {activePillar.paragraphs.map((paragraph, index) => (
                    <p
                      key={`para-${index}`}
                      className="type-body text-text-secondary max-w-[640px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Hidden sizer for height measurement */}
            <div
              ref={sizerRef}
              className="absolute inset-0 overflow-hidden pointer-events-none opacity-0"
              aria-hidden="true"
            >
              {activePillar && (
                <>
                  <h2 className="type-editorial-h2 mb-[28px]">{activePillar.title}</h2>
                  <div className="flex flex-col gap-[21px]">
                    {activePillar.paragraphs.map((paragraph, index) => (
                      <p key={`sizer-para-${index}`} className="type-body max-w-[640px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
