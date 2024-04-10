"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useSubmit } from "~/hooks/useSubmit";

export function DeleteTestData({ willId }: { willId: string }) {
  const { refresh } = useRouter();
  const { apiFetch, loading, setLoading } = useSubmit();
  const handleDelete = async () => {
    setLoading(true);
    await apiFetch<{}, {}>(`/api/wills/${willId}/test`, {
      method: "DELETE",
    });
    setLoading(false);
    refresh();
  };
  return (
    <Button
      variant="primary"
      className="mt-8 bg-red-500 hover:bg-red-500/80"
      onClick={handleDelete}
      loading={loading}
    >
      Delete test data and start again
    </Button>
  );
}
