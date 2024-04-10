import { getIntroNameAndAddress, Will } from "../utils";

type Props = {
  will: Will;
};

export function IntroNameAndAddress({ will }: Props) {
  return (
    <p className="mb-6">
      THIS WILL is made by me {getIntroNameAndAddress(will)}.
    </p>
  );
}
