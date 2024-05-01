import { Skeleton } from "@/components/ui/skeleton";

export const MainPageSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-[150px] rounded-full" />
        <Skeleton className="h-10 w-[120px] rounded-full" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {
          // map 20 times
          Array.from(Array(12).keys()).map((_, i) => (
            <div className="space-y-2" key={i}>
              <Skeleton className="w-full aspect-video rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-3 w-[50px]" />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export const PostListPageSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-6 p-4 md:p-6">
      {Array.from(Array(8).keys()).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-white rounded-lg shadow-md overflow-hidden dark:bg-black/90 p-4"
        >
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-7 w-[300px] md:w-[500px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      ))}
    </section>
  );
};

export const PracticePageSkeleton = () => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Skeleton className="h-8 w-[300px]" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
      </div>
    </div>
  );
};
