import { useState } from 'react';
import Toolbar from './Toolbar/Toolbar';
import Body from './Body/Body';

const SplitFilePanel = ({ file }) => {
  const [showFilePreview, setShowFilePreview] = useState(true);

  const handleFileDisplayButton = () => {
    setShowFilePreview((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-200">
      <div className="flex flex-1">
        <Toolbar
          onFileDisplayButton={handleFileDisplayButton}
          showFilePreview={showFilePreview}
        />
        <Body showFilePreview={showFilePreview} file={file} />
      </div>
      {/* Footer */}
      <div className="h-20 bg-purple-100"></div>
    </div>
  );
};
export default SplitFilePanel;
