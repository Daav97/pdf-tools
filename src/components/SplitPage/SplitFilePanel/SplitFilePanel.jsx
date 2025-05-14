import { useState } from 'react';
import Toolbar from './Toolbar/Toolbar';
import Body from './Body/Body';
import Modal from '../../Modal';
import CrossIcon from '../../svg/CrossIcon';
import Footer from './Footer/Footer';

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
        <Modal closeCallback={closeExpandedFileModal}>
          <button
            onClick={closeExpandedFileModal}
            className="absolute top-0 -right-14 cursor-pointer rounded-full bg-neutral-400 shadow shadow-black/50 hover:bg-red-600"
          >
            <CrossIcon className="h-10 w-10 text-neutral-100" />
          </button>
          <div className="relative h-[92vh] w-[35vw] justify-center">
            <iframe
              src={file.url}
              className="h-full w-full rounded border-y border-neutral-200"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
export default SplitFilePanel;
