import { SectionHeading } from "@/components/sections/section-heading";
import { getExperience } from "@/sanity/lib/fetch";

export async function Experience() {
  const experience = await getExperience();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-border px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>
        <SectionHeading eyebrow="03 - Experience" title="Where I've worked" />
        <ol className="border-t border-border">
          {experience.map((job, i) => (
            <li
              key={job._id}
              className="grid gap-4 border-b border-border py-10 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div>
                <p className="mb-2 font-mono text-xs tracking-widest text-primary uppercase">
                  Role {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-lg font-medium text-foreground">
                  {job.role}
                </p>
                <p className="text-primary">{job.company}</p>
                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  {job.period}
                </p>
              </div>
              <ul className="space-y-3">
                {(job.points ?? []).map((point) => (
                  <li
                    key={point}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
