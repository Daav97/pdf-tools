import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { joinFilesNames, parsePageSelection } from '../../utils/FilesLogic';
import Toast from '../Toast';
import ModalPreviewFile from './ModalPreviewFile';
import ModalMergedFile from './ModalMergedFile';
import Toolbar from './Toolbar';
import Body from './Body';
import Footer from './Footer';

const MergePage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [mergedFileName, setMergedFileName] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const uploadButtonRef = useRef(null);

  const handleMergePdfs = async () => {
    if (pdfFiles.length < 2) {
      setToastMessage('Sube por lo menos dos archivos a unir');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    setMergedFileName(joinFilesNames(pdfFiles));

    for (const pdfFile of pdfFiles) {
      let pagesToUse = [];

      if (pdfFile.pageSelection.value) {
        pagesToUse = parsePageSelection(
          pdfFile.pageSelection.value,
          pdfFile.pdfDocument.getPageCount(),
        );
      }

      const copiedPages = await mergedPdf.copyPages(
        pdfFile.pdfDocument,
        pagesToUse.length > 0
          ? pagesToUse
          : pdfFile.pdfDocument.getPageIndices(),
      );

      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
  };

  const handlePreview = (file) => {
    const url = URL.createObjectURL(file);
    setPreviewFile({ file, url });
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const closeMergedPreview = () => {
    setMergedPdfUrl(null);
  };

  const handleMergedFileNameChange = (event) => {
    const newName = event.target.value;

    const regex = /^[a-zA-Z0-9 _-]*$/;
    if (!regex.test(newName)) {
      return;
    }

    setMergedFileName(newName);
  };

  const handleClearPDFFiles = () => {
    setPdfFiles([]);
  };

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden bg-neutral-50">
      <Toolbar
        uploadedFilesCount={pdfFiles.length}
        onAddFile={() => uploadButtonRef.current.click()}
        onClearPdfFiles={handleClearPDFFiles}
      />
      <Body
        uploadButtonRef={uploadButtonRef}
        pdfFiles={pdfFiles}
        setPdfFiles={setPdfFiles}
        onPreviewFile={handlePreview}
        setToastMessage={setToastMessage}
      />
      <Footer
        uploadedFilesCount={pdfFiles.length}
        onMergeClick={handleMergePdfs}
      />
      {previewFile && (
        <ModalPreviewFile
          closePreview={closePreview}
          fileName={previewFile.file.name}
          fileUrl={previewFile.url}
        />
      )}

      {mergedPdfUrl && (
        <ModalMergedFile
          closeMergedPreview={closeMergedPreview}
          mergedFileName={mergedFileName}
          handleMergedFileNameChange={handleMergedFileNameChange}
          mergedPdfUrl={mergedPdfUrl}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};
export default MergePage;
