import { z } from "zod";

export const seoOrganizationBlockValidation = z.object({
  _type: z.literal("organizationSeoBlock"),
  name: z.string(),
  legalName: z.string().optional().nullable(),
  url: z.string(),
  logo: z.string(),
});
