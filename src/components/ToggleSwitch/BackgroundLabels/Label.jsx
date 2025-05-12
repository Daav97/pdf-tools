const Label = ({ className, children }) => {
  return (
    <span
      className={`w-1/2 truncate text-center text-gray-500 select-none ${className}`}
    >
      {children}
    </span>
  );
};
export default Label;
