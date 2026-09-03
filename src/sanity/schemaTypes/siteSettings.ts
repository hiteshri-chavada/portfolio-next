import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phone", title: "Phone", type: "string", validation: (r) => r.required() }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "github", title: "GitHub URL", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "summary",
      title: "Summary (About section)",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (Hero subtitle)",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "object",
      fields: [
        defineField({ name: "degree", title: "Degree", type: "string", validation: (r) => r.required() }),
        defineField({ name: "institution", title: "Institution", type: "string", validation: (r) => r.required() }),
        defineField({ name: "detail", title: "Detail", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
