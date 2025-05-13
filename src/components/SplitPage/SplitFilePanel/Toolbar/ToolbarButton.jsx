const ToolbarButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-600 hover:text-white active:bg-neutral-600 active:text-teal-300"
    >
      {children}
    </button>
  );
};
export default ToolbarButton;
