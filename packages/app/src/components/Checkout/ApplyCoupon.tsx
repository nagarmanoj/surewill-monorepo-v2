import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useSubmit } from "~/hooks/useSubmit";
import { apiRoutes } from "~/config/routes";
import type {
  ValidateCouponInput,
  ValidateCouponResponseBody,
} from "~/app/api/billing/coupons/validate/types";

type Props = {
  onApplyCoupon: ({ id, code }: { id: string; code: string }) => void;
};

export function ApplyCoupon({ onApplyCoupon }: Props) {
  const { apiFetch, loading, setLoading, toast } = useSubmit();
  const [hasApplied, setHasApplied] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  const handleApplyCode = async () => {
    setLoading(true);
    const response = await apiFetch<
      ValidateCouponResponseBody,
      ValidateCouponInput
    >(apiRoutes.billing.validateCoupon, {
      method: "POST",
      payload: {
        coupon: codeInput,
      },
    });
    if (response.success && response.data.valid) {
      toast.success("Coupon applied");
      setHasApplied(true);
      onApplyCoupon({
        id: response.data.couponId,
        code: response.data.couponCode,
      });
    } else {
      toast.error("Coupon not valid");
    }
    setLoading(false);
  };

  return (
    <div className="mb-8 flex flex-col items-end gap-4 sm:max-w-sm sm:flex-row">
      <div className="w-full">
        <Label className="text-brand-gray">Coupon</Label>
        <Input
          placeholder="Code"
          className="min-w-[210px] uppercase placeholder:normal-case"
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          disabled={hasApplied}
        />
      </div>
      <Button
        variant="outline"
        className="w-[210px] text-base font-semibold"
        onClick={handleApplyCode}
        loading={loading}
        disabled={!codeInput}
      >
        Apply Coupon
      </Button>
    </div>
  );
}
