import { ArrowDown, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LetterParticles } from "@/components/letter-particles";
import { getSiteSettings } from "@/sanity/lib/fetch";

export async function Hero() {
  const profile = await getSiteSettings();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-20 sm:pt-24"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Pixel
            <span
              className="inline-block size-1 rounded-full bg-primary"
              aria-hidden="true"
            />
            Perfect
          </p>
          <p className="mb-6 font-mono text-sm text-primary">
            {profile.role} · {profile.location}
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            {profile.tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className={buttonVariants({ size: "lg" })}>
              View work
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              Get in touch
            </a>
          </div>
        </div>

        <LetterParticles
          letter="H"
          className="hidden aspect-square w-full lg:block"
        />
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll to about section"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
