import { SectionHeading } from "@/components/sections/section-heading";
import { getExperience, getSiteSettings } from "@/sanity/lib/fetch";

export async function About() {
  const [settings, experience] = await Promise.all([
    getSiteSettings(),
    getExperience(),
  ]);

  const details = [
    { label: "Based in", value: settings.location },
    {
      label: "Current role",
      value: `${settings.role} @ ${experience[0]?.company ?? ""}`,
    },
    { label: "Education", value: settings.education?.degree ?? "" },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="about-heading" className="sr-only">
          About
        </h2>
        <SectionHeading eyebrow="01 - About" title="A little about me" />

        <div className="grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-10">
          <div className="md:col-span-2">
            <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              {settings.summary}
            </p>
          </div>

          <div className="self-start border-t border-border pt-6 sm:pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="border-b border-border py-5 first:pt-0 last:border-b-0"
              >
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  {detail.label}
                </p>
                <p className="mt-1.5 font-medium text-foreground">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-16 border-t border-border pt-8 sm:pt-10 text-center">
          <p
            className="font-signature text-5xl leading-none text-foreground sm:text-6xl md:text-7xl"
            aria-hidden="true"
          >
            {settings.name}
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Pixel
            <span
              className="inline-block size-1 rounded-full bg-primary"
              aria-hidden="true"
            />
            Perfect
          </p>
        </div>
      </div>
    </section>
  );
}
