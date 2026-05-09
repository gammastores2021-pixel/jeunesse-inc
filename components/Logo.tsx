/**
 * Brand logo. Renders inline SVG so it can serve as a server component
 * and ship without a network round-trip for the icon files.
 *
 * variant="full" → mark + wordmark (header / footer default)
 * variant="mark" → mark only (tight spaces)
 */

type Variant = "full" | "mark";

export default function Logo({
  variant = "full",
  className = ""
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Mark />
      </span>
    );
  }
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Mark />
      <span className="font-display text-lg tracking-tight text-primary">
        Jeunesse <span className="text-mute">·</span> Stores
      </span>
    </span>
  );
}

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="27" height="27" rx="6" fill="#0B1F3A" />
      <path
        d="M9 8h10M14 8v10c0 2.5-1.5 4-4 4"
        stroke="#C9A35B"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
