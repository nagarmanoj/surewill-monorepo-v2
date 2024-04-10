import { BreadcrumbJsonLd } from "next-seo";

interface BreadcrumbSeoProps {
  list: { name: string; url: string }[];
}
export const BreadcrumbSeo = ({ list }: BreadcrumbSeoProps) => {
  return (
    <div>
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={list?.map((item, index) => ({
          position: index + 1,
          name: item.name,
          item: `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}${item.url}`,
        }))}
      />
    </div>
  );
};
