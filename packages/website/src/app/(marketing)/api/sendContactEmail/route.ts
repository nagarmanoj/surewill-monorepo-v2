import { groq } from "next-sanity";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sanityFetch } from "~/libs/sanity";
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
  process.env.MANDRILL_API_KEY
);
const pageQuery = groq`
  *[_type == 'siteSettings'] [0] {
    adminEmailList[]
  }
`;
const schema = z.object({
  adminEmailList: z.array(z.string()),
});

export async function POST(request: Request) {
  const { adminEmailList } = await sanityFetch(pageQuery, schema);
  try {
    const data = await request.json();
    if (!data?.text) {
      throw new Error("text is required");
    }
    if (!data?.email) {
      throw new Error("email is required");
    }
    if (!data?.firstName) {
      throw new Error("firstName is required");
    }
    if (!data?.lastName) {
      throw new Error("lastName is required");
    }
    if (typeof data?.text !== "string") {
      throw new Error("text have to be text");
    }

    if (!adminEmailList || adminEmailList?.length === 0)
      return NextResponse.json({
        message: "admin email is empty",
      });

    const response = await mailchimpClient.messages.send({
      message: {
        from_email: "no-reply@surewill.com.au",
        subject: `New Contact from ${data?.firstName} ${data?.lastName}`,
        text: data?.text,
        to: adminEmailList?.map((email) => ({
          email: email,
          type: "to",
        })),
      },
    });
    console.log("mailchimp", response);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message });
  }
}
