export default function BrandMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Outer border — brutalist */}
      <rect x="1" y="1" width="30" height="30" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* N letterform — constructed, geometric */}
      <path
        d="M8 24V8L24 24V8"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}
