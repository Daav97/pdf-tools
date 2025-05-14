const ToolbarButton = ({ children, onClick, title = '' }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-500 hover:text-white active:bg-neutral-500 active:text-teal-300"
    >
      {children}
    </button>
  );
};
export default ToolbarButton;
