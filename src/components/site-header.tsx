"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LetterParticles } from "@/components/letter-particles";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTypedName(name.slice(0, i));
      if (i >= name.length) clearInterval(interval);
    }, prefersReducedMotion ? 0 : 90);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background">
      <div className="flex h-20 items-stretch sm:h-24">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
          <a href="#hero" aria-label="Home" className="flex items-center gap-1">
            <LetterParticles
              letter="H"
              masterSize={160}
              formed
              tone="dark"
              interactive={false}
              intensity={1.2}
              density={5}
              sizeVariance={1.7}
              className="h-11 w-11 sm:h-14 sm:w-14"
            />
            <span
              aria-hidden="true"
              className="font-signature text-2xl text-foreground sm:text-3xl"
            >
              {typedName}
              {typedName.length < name.length && (
                <span className="text-primary">|</span>
              )}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-medium tracking-widest text-foreground uppercase transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/Hiteshri_Chavda_Frontend_Developer_Resume.pdf"
                  download
                  className="text-xs font-medium tracking-widest text-foreground uppercase transition-colors hover:text-primary"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-xs font-medium tracking-widest text-primary uppercase transition-colors hover:text-foreground"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="my-auto mr-6 md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="mt-4 px-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-base text-foreground hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/Hiteshri_Chavda_Frontend_Developer_Resume.pdf"
                    download
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base text-foreground hover:bg-muted"
                  >
                    Resume
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="block rounded-full bg-primary px-4 py-2 text-center text-base font-semibold text-primary-foreground"
                  >
                    Get in touch
                  </a>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
