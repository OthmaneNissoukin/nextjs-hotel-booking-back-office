export default function DashboardSkeleton() {
  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="flex space-x-4">
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Skeleton for each card */}
        {Array(3)
          .fill()
          .map((_, index) => (
            <div key={index} className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 w-24 bg-gray-400 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
      </div>

      {/* Reasons for Cancel & Top Countries Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
            <div className="h-16 w-16 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
        <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Activity List */}
        <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
        </div>

        {/* Another Activity or Stats Section */}
        <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
