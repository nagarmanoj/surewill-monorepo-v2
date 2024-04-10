import { Checkbox } from "~/components/ui/checkbox";
import { SUBSCRIPTION_PRICE_PER_MONTH } from "./utils";

type Props = {
  hasSubscription: boolean;
  onChecked: (checked: boolean) => void;
};

export function StorageSubscription({ hasSubscription, onChecked }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-2 md:flex-row md:gap-12">
      <div className="flex">
        <Checkbox
          checked={hasSubscription}
          onCheckedChange={onChecked}
          className="rounded-full border-2"
        />
        <div className="ml-4 md:w-[225px]">
          <div className="font-semibold text-brand-purple">Storage</div>
          <p>
            First month free then ${SUBSCRIPTION_PRICE_PER_MONTH}/month
            subscription
          </p>
        </div>
      </div>
      <p className="text-brand-gray">
        Return your original signed Will for us to safely store. Your executor
        can request the Will when needed.
      </p>
    </div>
  );
}
