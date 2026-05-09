type Props = { step: string; title: string; body: string };

export default function ProcessStep({ step, title, body }: Props) {
  return (
    <div className="border-t border-border pt-6">
      <p className="font-display text-accent text-sm tracking-wide">{step}</p>
      <h3 className="mt-2 font-display text-xl text-primary">{title}</h3>
      <p className="mt-3 text-sm text-mute leading-relaxed">{body}</p>
    </div>
  );
}
