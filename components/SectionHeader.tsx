type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
};

export default function SectionHeader({ eyebrow, title, lead, align = "start" }: Props) {
  return (
    <header className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      )}
      <h2 className="font-display text-display-md text-primary">{title}</h2>
      {lead && <p className="mt-4 text-mute leading-relaxed">{lead}</p>}
    </header>
  );
}
