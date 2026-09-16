import { ArrowUpRight, Award } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { getCertifications } from "@/sanity/lib/fetch";

export async function Certifications() {
  const certifications = await getCertifications();

  if (certifications.length === 0) return null;

  const smRemainder = (2 - (certifications.length % 2)) % 2;
  const lgRemainder = (3 - (certifications.length % 3)) % 3;
  const placeholders = [
    { visible: smRemainder >= 1, visibleLg: lgRemainder >= 1 },
    { visible: false, visibleLg: lgRemainder >= 2 },
  ];

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="border-t border-border px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="certifications-heading" className="sr-only">
          Certifications
        </h2>
        <SectionHeading eyebrow="05 - Certifications" title="Certifications" />
        <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => {
            const cardClass =
              "group flex h-full flex-col justify-between gap-4 bg-background p-6 transition-colors hover:bg-muted";

            const card = (
              <>
                <div className="flex items-start justify-between">
                  <Award aria-hidden="true" className="size-4 text-primary" />
                  {cert.credentialUrl && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-foreground/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-medium text-foreground transition-colors group-hover:text-primary capitalize">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{cert.issuer}</p>
                  {(cert.issueDate || cert.credentialId) && (
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-widest text-muted-foreground capitalize">
                      {cert.issueDate && <span>{cert.issueDate}</span>}
                      {cert.credentialId && (
                        <span>ID · {cert.credentialId}</span>
                      )}
                    </div>
                  )}
                </div>
              </>
            );

            return (
              <li key={cert._id}>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
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
          {placeholders.map((p, i) => (
            <li
              key={`placeholder-${i}`}
              aria-hidden="true"
              className={`hidden bg-background bg-[repeating-linear-gradient(45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_10px)] ${
                p.visible ? "sm:block" : "sm:hidden"
              } ${p.visibleLg ? "lg:block" : "lg:hidden"}`}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
