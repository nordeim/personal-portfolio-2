import SocialIcon from './SocialIcon';
import type { SocialLink } from '@/lib/types';

interface ContactSectionProps {
  socialLinks: SocialLink[];
}

export default function ContactSection({ socialLinks }: ContactSectionProps) {
  return (
    <section id="contact" className="py-[104px] border-t border-border">
      <div className="mx-auto max-w-[1536px] px-[28px]">
        {/* Section Label */}
        <div className="mb-[56px]">
          <span className="type-mono-util text-text-faint tracking-widest">
            03 / Contact
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[56px]">
          {/* Left: CTA */}
          <div className="flex flex-col gap-[28px]">
            <h2 className="type-editorial-h2">
              Let&apos;s build something remarkable.
            </h2>
            <p className="type-body text-text-secondary max-w-[480px]">
              Whether it&apos;s a system to scale, an interface to craft, or a story to tell
              &mdash; I&apos;m always open to conversations that challenge the ordinary.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col gap-[14px]">
            {socialLinks.map((link) => (
              <a
                key={`social-${link.icon}`}
                href={link.href}
                target={link.icon === 'mail' ? undefined : '_blank'}
                rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-[14px] p-[14px] border border-border rounded-none transition-all duration-200 hover:border-border-strong hover:bg-surface-elevated/50"
                aria-label={link.description}
              >
                <SocialIcon icon={link.icon} className="text-text-muted group-hover:text-accent-code transition-colors duration-200" />
                <div className="flex flex-col">
                  <span className="font-utility text-sm text-text">{link.label}</span>
                  <span className="type-mono-util text-text-faint text-xs">{link.description}</span>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  className="ml-auto text-text-faint group-hover:text-accent-code transition-all duration-200 group-hover:translate-x-[4px]"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-[104px] pt-[28px] border-t border-border flex flex-col sm:flex-row items-center justify-between gap-[14px]">
          <span className="type-mono-util text-text-faint text-xs">
            &copy; {new Date().getFullYear()} Nicholas Yun. Engineered soul, one pixel at a time.
          </span>
          <span className="type-mono-util text-text-faint text-xs">
            v2.0.0 &middot; React 19 &middot; TS 6 &middot; Tailwind v4
          </span>
        </div>
      </div>
    </section>
  );
}
