import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-600 mb-4">404</h1>
        <p className="text-xl text-gray-800 dark:text-gray-200 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
