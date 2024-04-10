import { blocksValidation } from "../../../schemas/objects/blocks/validation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const CtaBlock = (cta: typeof blocksValidation.linkValidation._type) => {
  return (
    <>
      {cta?.title && cta?.href && (
        <Link href={cta?.href} target={cta?.target || "_self"}>
          <Button
            id={cta?.id || undefined}
            className=""
            variant={cta?.buttonVaraint as any}
            rightIcon={<ArrowRight />}
          >
            {cta?.title}
          </Button>
        </Link>
      )}
      {cta?.title && !cta?.href && (
        <Button
          id={cta?.id || undefined}
          variant={(cta?.buttonVaraint as any) || "primary"}
          rightIcon={<ArrowRight />}
        >
          {cta?.title}
        </Button>
      )}
    </>
  );
};
