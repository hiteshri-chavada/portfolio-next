import type { SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { skillGroup } from "./skillGroup";
import { experience } from "./experience";
import { certification } from "./certification";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, project, skillGroup, experience, certification],
};
