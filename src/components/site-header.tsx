"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  FolderKanban,
  Mail,
  Menu,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks as defaultNavLinks } from "@/lib/data";

interface SiteHeaderProps {
  name?: string;
  role?: string;
  navLinks?: readonly { label: string; href: string }[];
}

const mobileNavIcons: Record<string, typeof User> = {
  "#about": User,
  "#skills": Sparkles,
  "#experience": Briefcase,
  "#projects": FolderKanban,
  "#contact": Mail,
};

export function SiteHeader({
  name = "Hiteshri Chavda",
  role = "Frontend Developer",
  navLinks = defaultNavLinks,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks
        .map((link) => link.href.replace("#", ""))
        .filter(Boolean);
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-sm bg-background/95" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-stretch justify-between px-6 sm:h-20">
        {/* Left: Brand Name & Profile */}
        <div className="flex items-center">
          <a
            href="#hero"
            className="flex items-center py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <SiteLogo name={name} role={role} />
          </a>
        </div>

        {/* Right: Desktop Navigation Links & Full Square Get in touch CTA */}
        <div className="hidden items-stretch md:flex">
          <nav aria-label="Primary" className="flex items-center pr-6 lg:pr-8">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 -bottom-px h-0.5 bg-primary transition-transform duration-200 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}

              <li>
                <a
                  href="/Hiteshri_Chavda_Frontend_Developer_Resume.pdf"
                  download
                  className="group flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground"
                >
                  <FileText className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Full Square Flush Get in touch CTA Button */}
          <a
            href="#contact"
            className="group relative flex items-center justify-center gap-2 border-l border-r border-border bg-primary px-6 sm:px-8 font-mono text-xs font-bold tracking-widest text-primary-foreground uppercase transition-all duration-200 hover:bg-primary/90"
          >
            <span>Get in touch</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Mobile Hamburger & Drawer */}
        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[85vw] max-w-sm flex-col justify-between p-6 sm:w-80"
            >
              <div>
                <SheetHeader className="pb-6 text-left border-b border-border/60">
                  <SheetTitle>
                    <SiteLogo name={name} role={role} />
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation List */}
                <nav aria-label="Mobile" className="mt-6">
                  <p className="mb-3 font-mono text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Navigation
                  </p>
                  <ul className="flex flex-col space-y-1">
                    {navLinks.map((link) => {
                      const Icon = mobileNavIcons[link.href] ?? ArrowUpRight;
                      return (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3 px-3.5 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                          >
                            <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                            <span className="flex-1">{link.label}</span>
                            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        </li>
                      );
                    })}
                    <li>
                      <a
                        href="/Hiteshri_Chavda_Frontend_Developer_Resume.pdf"
                        download
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 px-3.5 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <FileText className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="flex-1">Resume</span>
                        <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-6 border-t border-border/60">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-none bg-primary py-3 font-mono text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-sm transition-opacity hover:opacity-90"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
