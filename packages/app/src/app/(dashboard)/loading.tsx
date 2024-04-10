import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="mb-8 h-8" />
      <div className="max-w-xl">
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
