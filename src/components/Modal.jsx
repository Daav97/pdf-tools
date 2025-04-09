const Modal = ({ children, closeCallback }) => {
  return (
    <div
      className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/70"
      onClick={closeCallback}
    >
      <div
        className="relative rounded-2xl bg-neutral-100 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
