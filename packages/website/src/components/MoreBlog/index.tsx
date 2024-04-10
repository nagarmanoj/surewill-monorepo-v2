"use client";

import { blocksValidation } from "@/schemas/objects/blocks/validation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { z } from "zod";
import { BlogCardBlock } from "../blocks/blogCard";

const schema = z.object({
  blogs: z.array(blocksValidation.blogBlockValidation),
});

export const MoreBlogs = ({ blogs }: typeof schema._type) => {
  return (
    <Swiper
      className="!overflow-visible"
      breakpoints={{
        0: {
          slidesPerView: 1.5,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
    >
      {blogs?.map((blog) => (
        <SwiperSlide key={blog._id}>
          <Link href={`/blog/${blog.slug.current}`}>
            <BlogCardBlock theme="light" {...blog} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
