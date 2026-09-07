import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    name,
    description,
    tags,
    link
  }
`);

export type SanityProject = {
  _id: string;
  name: string;
  description: string;
  tags: string[] | null;
  link: string | null;
};

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    name,
    role,
    location,
    email,
    phone,
    linkedin,
    github,
    summary,
    tagline,
    education,
    navLinks[]{ label, href }
  }
`);

export type SanityNavLink = {
  label: string;
  href: string;
};

export type SanitySiteSettings = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  tagline: string;
  education: {
    degree: string;
    institution: string;
    detail: string | null;
  } | null;
  navLinks: SanityNavLink[] | null;
};

export const SKILL_GROUPS_QUERY = defineQuery(`
  *[_type == "skillGroup"] | order(order asc) {
    title,
    skills
  }
`);

export type SanitySkillGroup = {
  title: string;
  skills: string[] | null;
};

export const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience"] | order(order asc) {
    _id,
    role,
    company,
    period,
    points
  }
`);

export type SanityExperience = {
  _id: string;
  role: string;
  company: string;
  period: string;
  points: string[] | null;
};
