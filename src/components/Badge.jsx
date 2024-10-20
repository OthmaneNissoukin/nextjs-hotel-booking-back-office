const Badge = ({ status, children }) => {
  const getColorClasses = (status) => {
    switch (status) {
      case "success":
        return "text-green-800 bg-green-200 border-green-400 dark:text-green-100 dark:bg-green-700 dark:border-green-600";
      case "warning":
        return "text-yellow-800 bg-yellow-200 border-yellow-400 dark:text-yellow-100 dark:bg-yellow-700 dark:border-yellow-600";
      case "danger":
        return "text-red-800 bg-red-200 border-red-400 dark:text-red-100 dark:bg-red-700 dark:border-red-600";
      case "secondary":
        return "text-purple-800 bg-purple-200 border-purple-400 dark:text-purple-100 dark:bg-purple-700 dark:border-purple-600";
      case "info":
        return "text-blue-800 bg-blue-200 border-blue-400 dark:text-blue-100 dark:bg-blue-700 dark:border-blue-600";
      case "neutral":
        return "text-gray-800 bg-gray-200 border-gray-400 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600";
      default:
        return "text-gray-800 bg-gray-200 border-gray-400 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600";
    }
  };

  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getColorClasses(status)}`}>
      {children}
    </span>
  );
};

export default Badge;
