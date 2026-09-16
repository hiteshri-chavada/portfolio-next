import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issueDate", title: "Issue date", type: "string" }),
    defineField({ name: "credentialId", title: "Credential ID", type: "string" }),
    defineField({ name: "credentialUrl", title: "Credential URL", type: "url" }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (r) => r.required().integer(),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "issuer" },
  },
});
