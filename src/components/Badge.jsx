const Badge = ({ status, children }) => {
  const getColorClasses = (status) => {
    switch (status) {
      case "success":
        return "text-green-800 bg-green-100 border-green-300 dark:text-green-200 dark:bg-green-900 dark:border-green-700";
      case "warning":
        return "text-yellow-800 bg-yellow-100 border-yellow-300 dark:text-yellow-200 dark:bg-yellow-900 dark:border-yellow-700";
      case "danger":
        return "text-red-800 bg-red-100 border-red-300 dark:text-red-200 dark:bg-red-900 dark:border-red-700";
      default:
        return "text-gray-800 bg-gray-100 border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700";
    }
  };

  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getColorClasses(status)}`}>
      {children}
    </span>
  );
};

export default Badge;
