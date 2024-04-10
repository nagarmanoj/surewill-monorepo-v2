"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { apiRoutes } from "~/config/routes";

type Props = {
  willId: string;
};

export function DownloadWillButton({ willId }: Props) {
  const [loading, setLoading] = useState(false);

  const onDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2_500);
  };

  return (
    <form
      method="GET"
      action={`${apiRoutes.download}/${willId}`}
      onSubmit={onDownload}
    >
      <Button
        variant="primary"
        className="relative z-10 w-full justify-between"
        loading={loading}
        rightIcon={<Download />}
        type="submit"
      >
        Download your Will
      </Button>
    </form>
  );
}
