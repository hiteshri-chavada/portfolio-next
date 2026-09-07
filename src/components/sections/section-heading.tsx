export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <p className="mb-2 sm:mb-3 font-mono text-sm text-primary">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
