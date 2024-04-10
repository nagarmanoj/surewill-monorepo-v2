"use client";

import { Button } from "~/components/ui/button";
import { useSubmit } from "~/hooks/useSubmit";
import { routes } from "~/config/routes";

type Props = {
  willId: string;
};

export function ConfirmStartAgain({ willId }: Props) {
  const { loading, setLoading, apiFetch, toast, push } = useSubmit();

  const handleClick = async () => {
    setLoading(true);
    const response = await apiFetch(`/api/wills/${willId}/delete`, {
      method: "POST",
    });
    if (response.success) {
      push(routes.dashboard.main);
    } else {
      toast.error("Unable to start new will");
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} loading={loading}>
      Yes, I&apos;m sure
    </Button>
  );
}
