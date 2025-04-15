import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="animate-fade-in-out fixed bottom-4 left-1/2 z-50 max-w-96 -translate-x-1/2 rounded bg-red-600/90 px-4 py-3 text-white shadow-lg xl:right-4 xl:left-auto xl:translate-x-0">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
