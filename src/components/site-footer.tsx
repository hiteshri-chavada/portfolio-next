import { ArrowUp } from "lucide-react";
import { getSiteSettings } from "@/sanity/lib/fetch";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p className="flex items-center gap-2">
          {settings.name}
          <span
            className="inline-block size-1 rounded-full bg-primary"
            aria-hidden="true"
          />
          {settings.role}
        </p>
        <a
          href="#hero"
          className="flex items-center gap-2 hover:text-foreground"
        >
          Back to top
          <ArrowUp className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
