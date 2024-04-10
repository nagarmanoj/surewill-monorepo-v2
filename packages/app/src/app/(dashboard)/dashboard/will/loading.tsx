import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingWill() {
  return (
    <>
      <Skeleton className="mb-8 h-8" />
      <div className="max-w-form-3">
        <Skeleton className="mb-8 h-12" />
        <Skeleton className="mb-4 h-8" />
        <Skeleton className="mb-4 h-8" />
        <Skeleton className="mb-4 h-8" />
        <Skeleton className="mb-4 h-8" />
        <Skeleton className="mb-4 h-8" />
        <Skeleton className="mb-4 h-8" />
      </div>
    </>
  );
}
