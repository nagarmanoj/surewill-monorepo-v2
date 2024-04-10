import { WillCreationType } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  CouponCheckoutInput,
  CouponCheckoutResponseBody,
} from "~/app/api/billing/coupons/checkout/types";
import { useSubmit } from "~/hooks/useSubmit";
import { apiRoutes, routes } from "~/config/routes";
import { getCheckoutUrlWithParams } from "~/utils/tracking";

type Props = {
  willId: string;
  coupleCouponIdApplied: string;
  coupleCouponApplied: string;
  willType: WillCreationType;
  productName: string;
};

export function FreeCheckout({
  willId,
  coupleCouponApplied,
  coupleCouponIdApplied,
  willType,
  productName,
}: Props) {
  const { apiFetch, loading, setLoading, toast, push } = useSubmit();

  const handleClick = async () => {
    setLoading(true);
    const response = await apiFetch<
      CouponCheckoutResponseBody,
      CouponCheckoutInput
    >(apiRoutes.billing.couponCheckout, {
      method: "POST",
      payload: {
        coupleCouponIdApplied,
        willId,
      },
    });
    if (response.success) {
      const checkoutSuccessUrl = getCheckoutUrlWithParams({
        baseUrl: routes.dashboard.billing.checkoutCouponComplete,
        productName,
        willType,
      });
      push(`${checkoutSuccessUrl}&coupleCouponApplied=${coupleCouponApplied}`);
    } else {
      toast.error("Unable to checkout using coupon.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        className="w-full"
        onClick={handleClick}
        rightIcon={<ArrowRight />}
        loading={loading}
      >
        Get your Will for free
      </Button>
    </div>
  );
}
