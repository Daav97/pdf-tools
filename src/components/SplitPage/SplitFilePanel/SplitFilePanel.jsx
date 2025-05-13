import { useState } from 'react';
import Toolbar from './Toolbar/Toolbar';

const SplitFilePanel = ({ file }) => {
  const [showFilePreview, setShowFilePreview] = useState(true);

  const handleFileDisplayButton = () => {
    setShowFilePreview((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-200">
      <div className="flex flex-1">
        <Toolbar onFileDisplayButton={handleFileDisplayButton} />
        {/* Body */}
        <div className="flex flex-1 items-center justify-center">
          {/* Preview */}
          <div className="h-[95%] w-[60%] overflow-hidden rounded-md shadow-md">
            {showFilePreview ? (
              <iframe src={file.url} className="h-full w-full"></iframe>
            ) : (
              <div className="h-full w-full bg-white"></div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="h-20 bg-purple-100"></div>
    </div>
  );
};
export default SplitFilePanel;
