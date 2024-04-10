"use client";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";

import Image from "next/image";

interface RichTextProps {
  data: any;
}

export const RichText = ({ data }: RichTextProps) => {
  return (
    <div className="portableText">
      <PortableText
        value={data}
        components={{
          types: {
            image: (props) => {
              const { value } = props;

              const imgUrl = urlBuilder({
                projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
                dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
              })
                .image(value)
                .fit("max")
                .auto("format")
                .url();

              return (
                <Image
                  className="my-3"
                  width={1024}
                  height={1024}
                  alt={value.alt}
                  src={imgUrl}
                  sizes="100vw"
                  priority={false}
                />
              );
            },
          },
          block: {
            h1: ({ children }) => (
              <h1 className="text-6xl font-semibold my-3">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-5xl font-semibold my-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-4xl leading-10 font-semibold my-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-3xl leading-8 font-semibold my-3">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-2xl leading-7 font-semibold my-3">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-xl leading-6 font-semibold my-3">
                {children}
              </h6>
            ),
            normal: ({ children }) => (
              <p className="text-lg leading-6 my-2">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50">
                <p className="text-xl italic font-medium leading-relaxed text-gray-900">
                  &quot;{children}&quot;
                </p>
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc pl-5 my-3">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal pl-7 my-3">{children}</ol>
            ),
          },
          marks: {
            link: ({ children, value }) => {
              if (value?.href)
                return (
                  <a
                    className="underline"
                    href={value?.href}
                    target={value?.target || "_self"}
                  >
                    {children}
                  </a>
                );
              return children;
            },
          },
        }}
      />
    </div>
  );
};
