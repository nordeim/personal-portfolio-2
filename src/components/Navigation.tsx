import BrandMark from './BrandMark';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  isNightMode: boolean;
  onThemeToggle: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  isMachineOpen: boolean;
  onMachineToggle: () => void;
}

export default function Navigation({
  isNightMode,
  onThemeToggle,
  isMenuOpen,
  onMenuToggle,
  isMachineOpen,
  onMachineToggle,
}: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-border bg-surface/90 backdrop-blur-sm">
      <nav className="mx-auto max-w-[1536px] px-[28px] h-[56px] flex items-center justify-between">
        {/* Left: Brand */}
        <a
          href="#"
          className="flex items-center gap-[14px] text-text hover:text-accent-code transition-colors duration-200"
          aria-label="Nicholas Yun — Home"
        >
          <BrandMark />
          <span className="font-utility text-xs tracking-widest uppercase hidden sm:inline">
            Nicholas Yun
          </span>
        </a>

        {/* Right: Controls */}
        <div className="flex items-center gap-[7px]">
          {/* MX Toggle */}
          <button
            onClick={onMachineToggle}
            className={`h-10 px-3 border font-utility text-xs tracking-wider uppercase transition-colors duration-200 rounded-none ${
              isMachineOpen
                ? 'bg-accent-code text-white border-accent-code'
                : 'border-border text-text-secondary hover:text-text hover:border-border-strong'
            }`}
            aria-label="Toggle Machine Mode"
            aria-pressed={isMachineOpen}
          >
            MX
          </button>

          {/* Theme Toggle */}
          <ThemeToggle isNightMode={isNightMode} onToggle={onThemeToggle} />

          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 border border-border rounded-none flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-200 sm:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              {isMenuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-[7px] ml-[14px]">
            {['About', 'Work', 'Contact'].map((section) => (
              <a
                key={`nav-${section}`}
                href={`#${section.toLowerCase()}`}
                className="font-utility text-xs tracking-wider uppercase text-text-secondary hover:text-text border border-transparent hover:border-border-strong px-3 h-10 flex items-center transition-colors duration-200 rounded-none"
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-35 bg-ink/60 backdrop-blur-sm sm:hidden"
            onClick={onMenuToggle}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside
            className="fixed top-[56px] right-0 z-40 w-[280px] h-[calc(100vh-56px)] bg-surface border-l border-border p-[28px] sm:hidden"
            role="dialog"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col gap-[28px]">
              {['About', 'Work', 'Contact'].map((section) => (
                <a
                  key={`mobile-nav-${section}`}
                  href={`#${section.toLowerCase()}`}
                  className="type-editorial-h3 text-text hover:text-accent-code transition-colors duration-200"
                  onClick={onMenuToggle}
                >
                  {section}
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
