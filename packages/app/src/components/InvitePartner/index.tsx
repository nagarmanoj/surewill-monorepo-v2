"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SendCoupleCouponInput } from "~/app/api/emails/couple-coupon/route";
import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";
import { useSubmit } from "~/hooks/useSubmit";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { apiRoutes } from "~/config/routes";

const MAX_SEND_TRIES = 3;

type Props = {
  coupleCoupon: string;
  partnerName: string;
  willOwnerName: string;
};

export function InvitePartner({
  coupleCoupon,
  partnerName,
  willOwnerName,
}: Props) {
  const partnerInputRef = useRef<HTMLInputElement>(null);
  const { apiFetch, loading, setLoading, toast } = useSubmit();
  const [partnerEmailInput, setPartnerEmailInput] = useState("");
  const [sentCouponCount, setSendCouponCount] = useState(0);
  const [, copy] = useCopyToClipboard();

  const handleSendToPartner = async () => {
    try {
      if (!partnerEmailInput) {
        partnerInputRef.current?.focus();
        return;
      }
      setLoading(true);
      const response = await apiFetch<{}, SendCoupleCouponInput>(
        apiRoutes.sendCoupon,
        {
          method: "POST",
          payload: {
            partnerName,
            partnerEmail: partnerEmailInput,
            couponCode: coupleCoupon,
            willOwnerName,
          },
        }
      );
      if (response.success) {
        toast.success("Coupon sent to your partner");
        setSendCouponCount((prevCount) => prevCount + 1);
        setPartnerEmailInput("");
      } else {
        const errorMessage =
          typeof response.error === "string"
            ? response.error
            : "Unable to send coupon to your partner";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = sentCouponCount >= MAX_SEND_TRIES;

  return (
    <div className="z-10 mb-8">
      <h3 className="mb-2 text-2xl font-semibold">Invite your Partner</h3>
      <p className="mb-4 text-brand-gray">
        Your partner can complete their Will at no extra cost using the coupon
        provided.
      </p>
      <div className="mb-6 flex flex-col gap-6 sm:max-w-[575px] sm:flex-row">
        <Input
          placeholder="Email Address"
          value={partnerEmailInput}
          onChange={(event) => setPartnerEmailInput(event.target.value)}
          disabled={isDisabled}
          ref={partnerInputRef}
          type="email"
        />
        <Button
          rightIcon={<ArrowRight />}
          loading={loading}
          variant="outline"
          onClick={handleSendToPartner}
          disabled={isDisabled}
        >
          Email partner
        </Button>
      </div>
      <button
        className="items-align flex w-fit rounded-md border-2 border-dashed border-brand-gray-light px-4 py-1 text-lg font-semibold"
        onClick={() => {
          copy(coupleCoupon);
          toast.success("Coupon copied to clipboard");
        }}
      >
        <div className="mr-2 tracking-wider">{coupleCoupon}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </button>
    </div>
  );
}
