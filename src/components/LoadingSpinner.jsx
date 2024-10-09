import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoadingSpinner() {
  return <FontAwesomeIcon icon={faSpinner} spinPulse />;
}

export default LoadingSpinner;
