import { cn } from "~/libs/utils";

const assetPercentageInvalid = (percentage: number) => {
  if (!percentage || percentage === 100) return false;
  return true;
};

type Props = {
  assetPercentageAssigned: number;
};

export function TotalAssets({ assetPercentageAssigned }: Props) {
  return (
    <div className={cn("flex items-center justify-end")}>
      Total:
      <span
        className={cn(
          "ml-4",
          assetPercentageInvalid(assetPercentageAssigned) && "text-error",
          assetPercentageAssigned === 100 && "text-brand-green"
        )}
      >
        {assetPercentageAssigned}%
      </span>
    </div>
  );
}
