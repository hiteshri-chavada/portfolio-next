import { client } from "@/sanity/lib/client";
import {
  CERTIFICATIONS_QUERY,
  EXPERIENCE_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
  SKILL_GROUPS_QUERY,
  type SanityCertification,
  type SanityExperience,
  type SanityProject,
  type SanitySiteSettings,
  type SanitySkillGroup,
} from "@/sanity/lib/queries";

const REVALIDATE_SECONDS = 60;

export function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
}

export function getSiteSettings(): Promise<SanitySiteSettings> {
  return client.fetch(
    SITE_SETTINGS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
}

export function getSkillGroups(): Promise<SanitySkillGroup[]> {
  return client.fetch(
    SKILL_GROUPS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
}

export function getExperience(): Promise<SanityExperience[]> {
  return client.fetch(
    EXPERIENCE_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
}

export function getCertifications(): Promise<SanityCertification[]> {
  return client.fetch(
    CERTIFICATIONS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
}
