import { z } from "zod";

import { seoArticleSeoBlockValidation } from "./article/validation";
import { seoOrganizationBlockValidation } from "./Organization/validation";
import { seoBasicBlockValidation } from "./basic/validation";
import { seoLocalBusinessBlockValidation } from "./localBusiness/validation";
import { seoProductBlockValidation } from "./product/validation";

export const seoListBlockValidation = z
  .array(
    z.union([
      seoBasicBlockValidation,
      seoOrganizationBlockValidation,
      seoLocalBusinessBlockValidation,
      seoProductBlockValidation,
      seoArticleSeoBlockValidation,
    ])
  )
  .nullable()
  .optional();
