const ThumbLabel = ({ children, className }) => {
  return (
    <p
      className={`absolute text-neutral-100 transition-opacity duration-200 select-none ${className}`}
    >
      {children}
    </p>
  );
};
export default ThumbLabel;
