function SectionContainer({ label, description, children }) {
  return (
    <section>
      {label && <h1 className="text-2xl mb-1 text-slate-800 dark:text-slate-200">{label}</h1>}
      {description && <p className="mb-5 py-0">{description}</p>}

      {children}
    </section>
  );
}

export default SectionContainer;
