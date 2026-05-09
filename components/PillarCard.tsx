import Link from "next/link";

type Props = {
  title: string;
  body: string;
  href?: string;
  cta?: string;
  index?: number;
};

export default function PillarCard({ title, body, href, cta, index }: Props) {
  const inner = (
    <div className="card h-full flex flex-col">
      {typeof index === "number" && (
        <span className="font-display text-sm text-accent mb-3 tracking-wide">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="font-display text-xl text-primary leading-snug">{title}</h3>
      <p className="mt-3 text-sm text-mute leading-relaxed">{body}</p>
      {href && cta && (
        <span className="mt-6 text-sm text-primary font-medium inline-flex items-center gap-2">
          {cta} <span aria-hidden>→</span>
        </span>
      )}
    </div>
  );
  return href ? (
    <Link href={href} className="block group">
      {inner}
    </Link>
  ) : (
    inner
  );
}
