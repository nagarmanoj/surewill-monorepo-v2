import { createClient } from "next-sanity";
import { StructureBuilder } from "sanity/desk";
import { ZodObject, ZodRawShape } from "zod";
import { env } from "@/env.mjs";
import { QueryParams } from "sanity";
import { notFound } from "next/navigation";

export const config = {
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "undefined",
  // useCdn: process.env.NODE_ENV === "production",
  useCdn: false,
  apiVersion: "2023-05-23",
};

const client = createClient(config);

const documentIdToTitle = (id: string) => {
  const formatted = id.replace(/([A-Z])/g, " $1");
  const toSentenceCase = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return toSentenceCase;
};

export const structureSingletons = (
  singletonTypes: Set<string>,
  S: StructureBuilder
) => {
  const singletonsArray = Array.from(singletonTypes.values());
  return singletonsArray.map((type) =>
    S.listItem()
      .title(documentIdToTitle(type))
      .id(type)
      .child(S.document().schemaType(type).documentId(type))
  );
};

export const sanityFetch = async <T extends ZodRawShape>(
  query: string,
  schema: ZodObject<T>,
  params?: QueryParams
) => {
  return client.fetch(query, params).then((data) => {
    if (!data) notFound();
    return schema.parse(data);
  });
};
