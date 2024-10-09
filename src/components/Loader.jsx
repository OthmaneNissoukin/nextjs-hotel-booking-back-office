import styles from "./loader.module.css";

function Loader({ label }) {
  return (
    <div className="flex gap-5 flex-col items-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ">
      <span class={styles.loader}></span>
      {label && <span>{label}</span>}
    </div>
  );
}

export default Loader;
