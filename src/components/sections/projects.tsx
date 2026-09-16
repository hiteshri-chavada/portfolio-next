import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { getProjects } from "@/sanity/lib/fetch";

export async function Projects() {
  const projects = await getProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-border px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>
        <SectionHeading eyebrow="04 - Projects" title="Selected work" />
        <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const cardClass =
              "group flex h-full flex-col justify-between gap-6 bg-background p-6 transition-colors hover:bg-muted";

            const card = (
              <>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.link && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-foreground/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    {(project.tags ?? []).slice(0, 3).join(" · ")}
                  </p>
                </div>
              </>
            );

            return (
              <li key={project._id}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {card}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className={cardClass}>{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
