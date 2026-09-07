"use client";

import { cn } from "@/lib/utils";

interface SiteLogoProps {
  name?: string;
  role?: string;
  className?: string;
}

export function SiteLogo({
  name = "Hiteshri Chavda",
  role = "Frontend Developer",
  className,
}: SiteLogoProps) {
  return (
    <div
      className={cn(
        "group inline-flex flex-col justify-center select-none transition-opacity duration-200 hover:opacity-90",
        className
      )}
    >
      <div className="flex items-center gap-1.5 leading-none">
        <span className="font-signature text-2xl sm:text-3xl font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <span
          className="inline-block size-1.5 rounded-full bg-primary"
          aria-hidden="true"
        />
      </div>
      <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-muted-foreground leading-none mt-1">
        {role}
      </span>
    </div>
  );
}
