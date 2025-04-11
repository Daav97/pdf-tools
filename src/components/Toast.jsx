import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="animate-fade-in-out fixed right-4 bottom-4 z-50 max-w-96 rounded bg-red-600/90 px-4 py-3 text-white shadow-lg">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
