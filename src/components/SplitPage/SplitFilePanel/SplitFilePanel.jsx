import { useState } from 'react';
import Toolbar from './Toolbar/Toolbar';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import ModalExpandedFilePreview from './ModalExpandedFilePreview';

const SplitFilePanel = ({
  file,
  clearPdfFileCallback,
  replacePdfFileCallback,
}) => {
  const [showFilePreview, setShowFilePreview] = useState(true);
  const [isFilePreviewExpanded, setIsFilePreviewExpanded] = useState(false);

  const handleFileDisplayButton = () => {
    setShowFilePreview((prev) => !prev);
  };

  const handleExpandButton = () => {
    setIsFilePreviewExpanded(true);
  };

  const closeExpandedFileModal = () => {
    setIsFilePreviewExpanded(false);
  };

  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-400">
      <div className="flex flex-1">
        <Toolbar
          onExpandButtonClick={handleExpandButton}
          onFileDisplayButtonClick={handleFileDisplayButton}
          showFilePreview={showFilePreview}
          clearPdfFileCallback={clearPdfFileCallback}
          replacePdfFileCallback={replacePdfFileCallback}
        />
        <Body showFilePreview={showFilePreview} file={file} />
      </div>
      <Footer />
      {isFilePreviewExpanded && (
        <ModalExpandedFilePreview
          closeExpandedFileModal={closeExpandedFileModal}
          fileUrl={file.url}
        />
      )}
    </div>
  );
};
export default SplitFilePanel;
