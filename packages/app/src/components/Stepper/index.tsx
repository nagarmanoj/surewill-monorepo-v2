import Link from "next/link";
import { routes } from "~/config/routes";
import { cn } from "~/libs/utils";

type Props = {
  activeStep: number;
};

const Step = ({
  text,
  isActive,
  href,
  canClick,
}: {
  text: string;
  isActive: boolean;
  href: string;
  canClick: boolean;
}) => {
  return (
    <Link href={href} className={!canClick ? "pointer-events-none" : ""}>
      <div
        className={cn(
          "mb-2 h-[12px] rounded-lg border-2 border-gray-400 bg-gray-100",
          isActive && " border-brand-green bg-stepper-pattern"
        )}
      />
      <div
        className={cn(
          "text-sm text-brand-gray",
          isActive && " text-brand-green"
        )}
      >
        {text}
      </div>
    </Link>
  );
};

export function Stepper({ activeStep }: Props) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-6">
      <Step
        text="1. Profile"
        isActive={activeStep > 0}
        href={routes.dashboard.profile}
        canClick={activeStep > 1}
      />
      <Step
        text="2. Will"
        isActive={activeStep > 1}
        href={routes.dashboard.will}
        canClick={activeStep > 2}
      />
      <Step
        text="3. Review"
        isActive={activeStep > 2}
        href={routes.dashboard.review.main}
        canClick={false}
      />
    </div>
  );
}

export function CustomStepper({ activeStep }: Props) {
  return (
    <div className="mb-8 grid grid-cols-5 gap-6">
      <Step
        text="1. Profile"
        isActive={activeStep > 0}
        href={routes.dashboard.profile}
        canClick={activeStep > 1}
      />
      <Step
        text="2. Roles"
        isActive={activeStep > 1}
        href={routes.dashboard.willCustom}
        canClick={activeStep > 2}
      />
      <Step
        text="3. Assets"
        isActive={activeStep > 2}
        href={routes.dashboard.willCustomAssets}
        canClick={activeStep > 3}
      />
      <Step
        text="4. Executor"
        isActive={activeStep > 3}
        href={routes.dashboard.willCustomExecutors}
        canClick={activeStep > 4}
      />
      <Step
        text="5. Review"
        isActive={activeStep > 4}
        href={routes.dashboard.review.custom}
        canClick={false}
      />
    </div>
  );
}
