import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/sanity/lib/fetch";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.89 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export async function Contact() {
  const settings = await getSiteSettings();

  const channels = [
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s+/g, "")}`,
      icon: Phone,
    },
    {
      label: "LinkedIn",
      value: stripProtocol(settings.linkedin),
      href: settings.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
    {
      label: "GitHub",
      value: stripProtocol(settings.github),
      href: settings.github,
      icon: GithubIcon,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        <div className="mb-12">
          <p className="font-mono text-sm text-primary">05 - Contact</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Let&rsquo;s build something great together.
            </h3>
            <p className="mt-6 max-w-md text-balance text-lg text-muted-foreground">
              Share your goals, timeline, and what it&rsquo;ll take to ship
              it - I&rsquo;ll get back to you shortly.
            </p>
            <div className="mt-10">
              <a
                href={`mailto:${settings.email}`}
                className={buttonVariants({ size: "lg" })}
              >
                Say hello
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:pl-10">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 border-b border-border py-5 first:pt-0"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <channel.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs tracking-widest text-muted-foreground uppercase">
                      {channel.label}
                    </span>
                    <span className="text-foreground transition-colors group-hover:text-primary">
                      {channel.value}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
                {channel.external && (
                  <span className="sr-only">(opens in a new tab)</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
