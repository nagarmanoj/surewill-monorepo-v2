import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { apiFetch } from "~/libs/fetch";

export function useSubmit() {
  const [loading, setLoading] = useState(false);
  const { push, refresh } = useRouter();

  return {
    apiFetch,
    loading,
    setLoading,
    push,
    refresh,
    toast,
  };
}
