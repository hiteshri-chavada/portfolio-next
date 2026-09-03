import { SectionHeading } from "@/components/sections/section-heading";
import { getSkillGroups } from "@/sanity/lib/fetch";

export async function Skills() {
  const skillGroups = await getSkillGroups();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-border px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2 id="skills-heading" className="sr-only">
          Skills
        </h2>
        <SectionHeading eyebrow="02 - Skills" title="What I work with" />
        <dl className="border-t border-border">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className="grid gap-2 border-b border-border py-6 sm:grid-cols-[220px_1fr] sm:gap-10 sm:py-7"
            >
              <dt className="flex items-baseline gap-3 text-foreground">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{group.title}</span>
              </dt>
              <dd className="text-muted-foreground">
                {(group.skills ?? []).join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
