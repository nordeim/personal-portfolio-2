import { useEffect, useRef, useCallback, useState } from 'react';
import { useWeightedScroll } from '@/hooks/useWeightedScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { HeroSlide } from '@/lib/types';
import { heroSlides } from '@/lib/data';

interface HeroKineticProps {
  slide: HeroSlide;
  portraitUrl: string;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  activeIndex: number;
  totalSlides: number;
}

export default function HeroKinetic({
  slide,
  portraitUrl,
  onPrev,
  onNext,
  onDotClick,
  activeIndex,
  totalSlides,
}: HeroKineticProps) {
  const fontWeight = useWeightedScroll();
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setInterval>>(0);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  // Kinetic weight: use 950 static if reduced motion preferred
  const kineticWeight = prefersReduced ? 950 : fontWeight;

  // Pointer parallax tracking
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setPointerPos({ x, y });
  }, [prefersReduced]);

  // Auto-rotation (10s interval)
  useEffect(() => {
    autoRotateRef.current = setInterval(onNext, 10000);
    return () => clearInterval(autoRotateRef.current);
  }, [onNext]);

  // Reset timer on manual navigation
  const handleManualNav = useCallback((action: () => void) => {
    clearInterval(autoRotateRef.current);
    action();
    autoRotateRef.current = setInterval(onNext, 10000);
  }, [onNext]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[56px]"
      onPointerMove={handlePointerMove}
      style={{
        '--slide-accent': slide.accent,
        '--slide-secondary': slide.secondaryAccent,
        '--slide-x': `${pointerPos.x}px`,
        '--slide-y': `${pointerPos.y}px`,
      } as React.CSSProperties}
    >
      {/* Accent background glow */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07] transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${slide.accent} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-1 w-full max-w-[1536px] mx-auto px-[28px] grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-[56px] items-center">
        {/* Left: Typography Installation */}
        <div className="flex flex-col gap-[28px]">
          {/* Label */}
          <span
            className="type-mono-util tracking-widest"
            style={{ color: slide.accent }}
          >
            {slide.label}
          </span>

          {/* Kinetic Headline */}
          <h1
            className="type-kinetic-hero text-text"
            style={{ fontWeight: kineticWeight }}
          >
            {slide.headline}
          </h1>

          {/* Subtitle */}
          <p className="type-body text-text-secondary max-w-[560px]">
            {slide.subtitle}
          </p>

          {/* Artifact */}
          <div className="flex flex-col gap-[7px] mt-[14px] border-t border-border pt-[14px]">
            <span className="type-mono-util text-text-muted">Artifact</span>
            <span className="font-editorial text-xl font-semibold text-text">
              {slide.artifactTitle}
            </span>
            <span className="type-mono-util text-text-faint">
              {slide.artifactMeta}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[7px] mt-[7px]">
            {slide.tags.map((tag, index) => (
              <span
                key={`tag-${index}-${tag}`}
                className="type-mono-util px-[14px] py-[7px] border border-border text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="relative flex items-center justify-center">
          {/* Portrait Frame */}
          <div
            className="relative w-full max-w-[480px] aspect-[3/4] border border-border overflow-hidden"
            style={{
              transform: prefersReduced ? 'none' : `translate(var(--slide-x), var(--slide-y))`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt="Nicholas Yun"
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-surface-elevated flex items-center justify-center">
                <span
                  className="font-editorial text-[6rem] font-bold text-text-faint"
                  style={{ color: slide.accent }}
                >
                  {slide.signature}
                </span>
              </div>
            )}

            {/* Inner stroke */}
            <div
              className="absolute inset-[4px] border border-border pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Navigation Dots */}
          <div className="absolute -bottom-[56px] left-1/2 -translate-x-1/2 flex gap-[7px]">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => handleManualNav(() => onDotClick(index))}
                className={`w-[28px] h-[4px] border rounded-none transition-all duration-200 ${
                  index === activeIndex
                    ? 'bg-text border-text'
                    : 'bg-transparent border-border hover:border-border-strong'
                }`}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Slide ${index + 1}: ${heroSlides[index]?.headline ?? ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prev/Next Arrows */}
      <button
        onClick={() => handleManualNav(onPrev)}
        className="absolute left-[28px] top-1/2 -translate-y-1/2 z-2 w-10 h-10 border border-border rounded-none flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-200"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={() => handleManualNav(onNext)}
        className="absolute right-[28px] top-1/2 -translate-y-1/2 z-2 w-10 h-10 border border-border rounded-none flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-200"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Scroll Cue */}
      <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 z-1 flex flex-col items-center gap-[7px]">
        <span className="type-mono-util text-text-faint">Scroll</span>
        <div className="w-[1px] h-[28px] bg-border-strong relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text animate-pulse" />
        </div>
      </div>
    </section>
  );
}
