import { useEffect, useCallback } from 'react';
import type { MachineOverlayData } from '@/lib/types';

interface MachineOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  data: MachineOverlayData;
}

export default function MachineOverlay({ isOpen, onClose, data }: MachineOverlayProps) {
  // Escape key handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-start justify-center pt-[84px] overflow-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Machine Mode Overlay"
    >
      <div className="w-full max-w-[960px] mx-[28px] border border-border rounded-none bg-surface p-[28px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[28px] border-b border-border pb-[14px]">
          <div className="flex items-center gap-[14px]">
            <span className="type-mono-util text-accent-code">MX://</span>
            <span className="type-mono-util text-text-muted">Machine Experience</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 border border-border rounded-none flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-200"
            aria-label="Close Machine Mode"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>

        {/* Data Display — Terminal Aesthetic */}
        <div className="font-utility text-sm space-y-[21px]">
          {/* Build Info */}
          <div>
            <span className="text-accent-code">build.version</span>
            <span className="text-text-muted mx-[14px]">=</span>
            <span className="text-text">{data.buildVersion}</span>
          </div>

          {/* Route */}
          <div>
            <span className="text-accent-code">route.current</span>
            <span className="text-text-muted mx-[14px]">=</span>
            <span className="text-text">{data.route || '/'}</span>
          </div>

          {/* Collections */}
          <div>
            <span className="text-accent-code block mb-[7px]">collections</span>
            <div className="pl-[28px] space-y-[7px]">
              {Object.entries(data.collections).map(([slug, count]) => (
                <div key={`mx-collection-${slug}`}>
                  <span className="text-text-muted">{slug}</span>
                  <span className="text-text-muted mx-[14px]">:</span>
                  <span className="text-text">{count}</span>
                  <span className="text-text-faint ml-[7px]">items</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Data */}
          {data.activeData !== null && data.activeData !== undefined && (
            <div>
              <span className="text-accent-code block mb-[7px]">activeData</span>
              <pre className="pl-[28px] text-text-secondary text-xs whitespace-pre-wrap break-all bg-ink/50 p-[14px] border border-border rounded-none overflow-auto max-h-[300px]">
                {JSON.stringify(data.activeData, null, 2)}
              </pre>
            </div>
          )}

          {/* Timestamp */}
          <div>
            <span className="text-accent-code">system.timestamp</span>
            <span className="text-text-muted mx-[14px]">=</span>
            <span className="text-text">{new Date().toISOString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
