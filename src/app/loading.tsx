import LoadingSpinner from "@/components/LoadingSpinner";

function loading() {
  return (
    <div className="flex items-center p-10 justify-center bg-gray-50 dark:bg-gray-900 min-h-screen w-full">
      <LoadingSpinner />
    </div>
  );
}

export default loading;
