import { GetStartedButton } from "~/components/GetStartedButton";
import Image from "next/image";

type Props = {
  title: string;
  price: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function PricingOption({
  title,
  price,
  description,
  image,
  imageAlt,
}: Props) {
  return (
    <div className="flex justify-between h-full bg-brand-blue-1/30 p-5 border-2 border-white/10 rounded-xl text-white">
      <div>
        <h4 className="text-2xl mb-2 font-semibold">{title}</h4>
        <p className="text-xl mb-6">{price}</p>
        <p className="mb-10">{description}</p>
        <div>
          <GetStartedButton />
        </div>
      </div>
      {image && (
        <div className="flex-1 relative min-w-[40%]">
          <div className="relative w-[120%] h-[120%]">
            <Image src={image} alt={imageAlt || ""} fill />
          </div>
        </div>
      )}
    </div>
  );
}
