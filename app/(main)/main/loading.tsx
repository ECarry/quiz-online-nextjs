import { MainPageSkeleton } from "@/components/skeleton";

const loading = () => {
  return (
    <div className="p-6">
      <MainPageSkeleton />
    </div>
  );
};

export default loading;
