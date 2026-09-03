// All content (profile, skills, experience, projects, certifications) now
// lives in Sanity (see src/sanity) and is fetched directly by section
// components. This file only keeps structural, non-content config.

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;
