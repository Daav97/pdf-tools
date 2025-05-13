import { useState } from 'react';
import UploadButton from '../UploadButton';
import { validateAndConvertFiles } from '../../utils/FilesLogic';
import SplitFilePanel from './SplitFilePanel/SplitFilePanel';
import SplitPartsPanel from './SplitPartsPanel/SplitPartsPanel';

const SplitPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(null);

  const handleFileUpload = async (event) => {
    const incomingFile = Array.from(event.target.files);
    if (incomingFile.length === 1) {
      const { convertedFiles, errorMessage } =
        await validateAndConvertFiles(incomingFile);

      if (errorMessage) {
        //TODO: Set error message
      }

      const file = convertedFiles[0];
      const url = URL.createObjectURL(file.originalFile);

      setPdfFile({ ...file, url });
      event.target.value = null;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const incomingFiles = Array.from(e.dataTransfer.files);

    if (incomingFiles.length > 1) {
      // setToastMessage('Solo se permite subir un archivo a la vez.');
      return;
    }

    const { convertedFiles, errorMessage } =
      await validateAndConvertFiles(incomingFiles);

    if (errorMessage) {
      // setToastMessage(errorMessage);
    }

    const file = convertedFiles[0];
    const url = URL.createObjectURL(file.originalFile);

    setPdfFile({ ...file, url });
  };

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden bg-neutral-50">
      {!pdfFile ? (
        <div
          className="relative flex-1 border border-neutral-300 bg-neutral-200"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {isDraggingFile ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-2 border-neutral-500 bg-black/70">
              <p className="text-lg font-semibold text-white">
                ¡Suelta el archivo aquí!
              </p>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <UploadButton
                text={'Subir archivo'}
                multiple={false}
                onUploadCallback={handleFileUpload}
              />
              <p className="text-center text-lg text-black/50 select-none">
                o arrastra y suelta aquí
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 border border-neutral-300">
          <SplitFilePanel file={pdfFile} />
          <SplitPartsPanel />
        </div>
      )}
      <div className="min-h-4"></div>
    </div>
  );
};
export default SplitPage;
