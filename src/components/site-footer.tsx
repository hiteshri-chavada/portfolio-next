import { ArrowUp } from "lucide-react";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { SiteLogo } from "@/components/site-logo";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <a href="#hero" className="inline-flex items-center gap-2">
          <SiteLogo name={settings.name} />
        </a>
        <a
          href="#hero"
          className="flex items-center gap-2 hover:text-foreground transition-colors font-mono text-xs uppercase tracking-wider"
        >
          Back to top
          <ArrowUp className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
