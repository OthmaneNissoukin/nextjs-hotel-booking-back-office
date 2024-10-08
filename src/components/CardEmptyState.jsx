import { faFolderBlank } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardEmptyState({ children }) {
  return (
    <div className="h-full flex items-center justify-center gap-5 flex-col">
      <span>
        <FontAwesomeIcon className="text-5xl text-gray-800 dark:text-gray-100" icon={faFolderBlank} />
      </span>
      <span>{children}</span>
    </div>
  );
}

export default CardEmptyState;
