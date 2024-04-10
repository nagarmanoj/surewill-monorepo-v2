import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingBilling() {
  return (
    <div className="max-w-3xl">
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
      <Skeleton className="h-8 mb-4" />
    </div>
  );
}
