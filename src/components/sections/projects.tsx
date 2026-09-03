import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { getProjects } from "@/sanity/lib/fetch";

export async function Projects() {
  const projects = await getProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-border px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>
        <SectionHeading eyebrow="04 - Projects" title="Selected work" />
        <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {projects.map((project, i) => {
            const cardClass =
              "group flex h-full flex-col justify-between gap-8 bg-background p-8 transition-colors hover:bg-muted sm:p-10";

            const card = (
              <>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-foreground/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.link && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-foreground/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <p className="mt-5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
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
                    aria-label={`${project.name} (opens in a new tab)`}
                    className={cardClass}
                  >
                    {card}
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
