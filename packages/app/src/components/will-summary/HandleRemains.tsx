import { Highlight } from "./Highlight";

type Props = {
  cremated: boolean | null;
};

export function HandleRemains({ cremated }: Props) {
  if (cremated === null) {
    return (
      <div>
        <p>
          <Highlight>undecided</Highlight> on burial or cremation
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>
        to be <Highlight>{cremated ? "Cremated" : "Buried"}</Highlight>
      </p>
    </div>
  );
}
