import { blocksValidation } from "@/schemas/objects/blocks/validation";

export const TestimonialCard = (
  testimonial: typeof blocksValidation.TestimonialBlockValidation._type
) => {
  return (
    <div>
      <p className="text-xl text-brand-gray">{testimonial?.detail}</p>
      <p className="text-right text-brand-green text-xl font-light mt-5">
        {testimonial?.name}
      </p>
    </div>
  );
};
