export default function FormSkeleton() {
  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Form Header */}
      <div className="mb-6">
        <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Skeleton for each form field */}
        {Array(4)
          .fill()
          .map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}

        {/* Textarea */}
        <div className="space-y-2">
          <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end mt-6">
          <div className="h-10 w-24 bg-blue-400 dark:bg-blue-600 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
