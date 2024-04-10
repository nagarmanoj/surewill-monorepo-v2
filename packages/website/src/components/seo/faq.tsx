import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { FAQPageJsonLd } from "next-seo";

export const FaqSeo = ({
  data: faqList,
}: {
  data: (typeof blocksValidation.faqBlockValidation._type)[];
}) => {
  return (
    <div>
      <FAQPageJsonLd
        useAppDir={true}
        mainEntity={faqList?.map((faq) => ({
          questionName: faq.question,
          acceptedAnswerText: faq.answer,
        }))}
      />
    </div>
  );
};
