import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function AddNewLink({ link }) {
  return (
    <Link
      to={link}
      className="text-center w-full md:min-w-44 no-underline xs:w-auto 
text-gray-200 bg-gray-900 border border-gray-700 
hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-700 
font-medium rounded-lg text-sm px-5 py-2.5 
dark:bg-gray-100 dark:text-gray-900 dark:border-gray-400 
dark:hover:bg-gray-400 dark:hover:border-gray-400 dark:focus:ring-gray-400 flex items-center justify-center gap-3"
    >
      <span>
        <FontAwesomeIcon icon={faCirclePlus} />
      </span>
      <span>Add New</span>
    </Link>
  );
}

export default AddNewLink;
