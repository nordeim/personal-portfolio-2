import { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import HeroKinetic from './components/HeroKinetic';
import AboutFlow from './components/AboutFlow';
import BentoGrid from './components/BentoGrid';
import ArchiveSpread from './components/ArchiveSpread';
import ContactSection from './components/ContactSection';
import GrainOverlay from './components/GrainOverlay';
import MachineOverlay from './components/MachineOverlay';
import { useRouteHash } from './hooks/useRouteHash';
import { heroSlides, aboutPillars, projects, collectionDefinitions, socialLinks } from './lib/data';
import { getPortfolioItems, getCollectionItems, getPortraitForKey } from './lib/content';
import type { ArchiveRoute, CollectionItem } from './lib/types';

function parseArchiveRoute(hash: string): ArchiveRoute {
  const clean = hash.replace(/^#\/?/, '');
  const parts = clean.split('/');
  if (parts[0] === 'collection' && parts[1]) {
    return { collectionSlug: parts[1], itemSlug: parts[2] ?? null };
  }
  if (parts[0] === 'portfolio' && parts[1]) {
    return { collectionSlug: 'portfolio', itemSlug: parts[1] };
  }
  return { collectionSlug: '', itemSlug: null };
}

export default function App() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMachineOpen, setIsMachineOpen] = useState(false);

  const routeHash = useRouteHash();
  const archiveRoute = parseArchiveRoute(routeHash);

  const activeCollection = collectionDefinitions.find(
    (c) => c.slug === archiveRoute.collectionSlug,
  );
  const collectionItems = activeCollection
    ? getCollectionItems(activeCollection.slug)
    : [];
  const portfolioItems = getPortfolioItems();
  const allItems: CollectionItem[] = [...collectionItems, ...portfolioItems.map((p) => ({
    ...p,
    collectionSlug: 'portfolio',
  }))];
  const activeItem = archiveRoute.itemSlug
    ? allItems.find((item) => item.slug === archiveRoute.itemSlug) ?? null
    : null;

  const currentSlide = heroSlides[activeHeroIndex];
  const portraitUrl = currentSlide ? getPortraitForKey(currentSlide.portraitKey) : '';

  const handleThemeToggle = useCallback(() => {
    setIsNightMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('theme-night', next);
      document.documentElement.classList.toggle('theme-day', !next);
      return next;
    });
  }, []);

  const handleHeroPrev = useCallback(() => {
    setActiveHeroIndex((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1,
    );
  }, []);

  const handleHeroNext = useCallback(() => {
    setActiveHeroIndex((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1,
    );
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setActiveHeroIndex(index);
  }, []);

  const themeClass = isNightMode ? 'theme-night' : 'theme-day';

  return (
    <div className={`${themeClass} min-h-screen bg-surface text-text transition-colors duration-300`}>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-[160%] focus:translate-y-0 z-20 bg-accent-code text-white px-4 py-2 font-utility text-sm focus:outline-3 focus:outline-accent-code/35 focus:outline-offset-3"
      >
        Skip to main content
      </a>

      <Navigation
        isNightMode={isNightMode}
        onThemeToggle={handleThemeToggle}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
        isMachineOpen={isMachineOpen}
        onMachineToggle={() => setIsMachineOpen((prev) => !prev)}
      />

      <main id="main-content">
        {activeCollection ? (
          <ArchiveSpread
            collection={activeCollection}
            items={collectionItems as CollectionItem[]}
            activeItem={activeItem}
          />
        ) : (
          <>
            {currentSlide && (
              <HeroKinetic
                slide={currentSlide}
                portraitUrl={portraitUrl}
                onPrev={handleHeroPrev}
                onNext={handleHeroNext}
                onDotClick={handleDotClick}
                activeIndex={activeHeroIndex}
                totalSlides={heroSlides.length}
              />
            )}

            <AboutFlow pillars={aboutPillars} />

            <BentoGrid projects={projects} portfolioItems={allItems} />

            <ContactSection socialLinks={socialLinks} />
          </>
        )}
      </main>

      <GrainOverlay />

      {isMachineOpen && (
        <MachineOverlay
          isOpen={isMachineOpen}
          onClose={() => setIsMachineOpen(false)}
          data={{
            buildVersion: '2.0.0',
            route: routeHash,
            collections: Object.fromEntries(
              collectionDefinitions.map((c) => [c.slug, getCollectionItems(c.slug).length]),
            ),
            activeData: activeItem ?? activeCollection ?? null,
          }}
        />
      )}
    </div>
  );
}
