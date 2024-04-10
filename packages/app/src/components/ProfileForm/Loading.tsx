import { Skeleton } from "~/components/ui/skeleton";

export function ProfileFormLoading() {
  return (
    <>
      <Skeleton className="h-8 mb-8" />
      <div className="max-w-xl">
        <Skeleton className="h-12 mb-8" />
        <Skeleton className="h-8 mb-4" />
        <Skeleton className="h-8 mb-4" />
        <Skeleton className="h-8 mb-4" />
        <Skeleton className="h-8 mb-4" />
        <Skeleton className="h-8 mb-4" />
        <Skeleton className="h-8 mb-4" />
      </div>
    </>
  );
}
