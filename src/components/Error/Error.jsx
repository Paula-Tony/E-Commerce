function Error({ error }) {
  return (
    <>
      <div
        className="flex items-center justify-center gap-3 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
        role="alert"
      >
        <i className="fa-solid fa-circle-exclamation fa-2x mt-1"></i>
        <span className="text-3xl font-medium">{error}</span>
      </div>
    </>
  );
}

export default Error;
