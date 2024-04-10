import { Highlight } from "./Highlight";

type Props = {
  inheritanceAge: number;
};

export function Inheritance({ inheritanceAge }: Props) {
  return (
    <p>
      my kid/s inheritance to be managed until the age of{" "}
      <Highlight>{inheritanceAge} years old.</Highlight>
    </p>
  );
}
