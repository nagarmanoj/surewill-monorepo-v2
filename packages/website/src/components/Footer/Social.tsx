import { schema } from "./index";

export function FooterSocial({ introColumn }: typeof schema._type) {
  return (
    <div>
      {introColumn?.description && (
        <p className="mb-6 text-base">{introColumn?.description}</p>
      )}
      <div className="flex mt-4 space-x-4">
        {introColumn?.socials?.map((social) => {
          if (!social?.url) return null;
          return (
            <a
              key={social?.href}
              href={social?.href || "#"}
              className="text-white hover:text-gray-200 dark:hover:text-white"
            >
              <img
                className="w-9 h-9"
                src={social?.url}
                alt={social?.alt || ""}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
