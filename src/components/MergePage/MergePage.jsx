import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import UploadButton from '../UploadButton';
import UploadedFileCard from '../UploadedFileCard';
import { convertToPdfDocument, parsePageSelection } from './MergePageLogic';

const MergePage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const handleFileUpload = async (event) => {
    const incomingFiles = Array.from(event.target.files);

    if (incomingFiles.length > 0) {
      // Original files are mapped into objects that holds both the original file and the converted PDFDocument file
      const mappedIncomingFiles = await Promise.all(
        incomingFiles.map(async (file) => {
          const pdfDoc = await convertToPdfDocument(file);
          const id = Date.now() + file.name;
          return {
            id,
            originalFile: file,
            pdfDocument: pdfDoc,
            pageSelection: '',
          };
        }),
      );

      setPdfFiles((prevFiles) => [...prevFiles, ...mappedIncomingFiles]);
      event.target.value = null;
    }
  };

  const handleUpdatePageSelection = (index, newValue) => {
    const regex = /^[\d,\s-]*$/;
    if (!regex.test(newValue)) {
      return;
    }

    setPdfFiles((prev) =>
      prev.map((file, i) =>
        i === index ? { ...file, pageSelection: newValue } : file,
      ),
    );
  };

  const handleMergePdfs = async () => {
    if (pdfFiles.length < 2) {
      alert('Sube por lo menos dos archivos a unir');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      let pagesToUse = [];

      if (pdfFile.pageSelection) {
        pagesToUse = parsePageSelection(
          pdfFile.pageSelection,
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

  const handleMoveUpFile = (index) => {
    if (index === 0) return;

    setPdfFiles((prevFiles) => {
      const newOrder = [...prevFiles];

      const [file] = newOrder.splice(index, 1);
      newOrder.splice(index - 1, 0, file);

      return newOrder;
    });
  };

  const handleMoveDownFile = (index) => {
    if (index === pdfFiles.length - 1) return;

    setPdfFiles((prevFiles) => {
      const newFiles = [...prevFiles];

      const [file] = newFiles.splice(index, 1);
      newFiles.splice(index + 1, 0, file);

      return newFiles;
    });
  };

  const handleDeleteFile = (index) => {
    setPdfFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);

      return newFiles;
    });
  };

  return (
    <div>
      <UploadButton
        text={'Subir archivos'}
        onUploadCallback={handleFileUpload}
        multiple={true}
      />
      <button
        onClick={handleMergePdfs}
        className="m-5 h-10 w-64 cursor-pointer rounded bg-teal-400 px-4 py-2 font-medium text-white shadow select-none hover:bg-teal-500 active:bg-teal-600 disabled:cursor-auto disabled:bg-neutral-400 disabled:text-neutral-300"
      >
        Unir archivos
      </button>

      {pdfFiles.length > 0 && (
        <div>
          <h3>Archivos seleccionados:</h3>
          <ul className="flex h-[600px] flex-wrap justify-center gap-8 overflow-y-auto bg-neutral-200 p-5">
            {pdfFiles.map((file, index) => (
              <UploadedFileCard
                index={index}
                originalFile={file.originalFile}
                key={file.id}
                deleteFileCallback={() => handleDeleteFile(index)}
                moveDownFileCallback={() => handleMoveDownFile(index)}
                moveUpFileCallback={() => handleMoveUpFile(index)}
                openPreviewCallback={() => handlePreview(file.originalFile)}
                pageCount={file.pdfDocument.getPageCount()}
                pageSelection={file.pageSelection}
                onPageSelectionCallback={handleUpdatePageSelection}
              />
            ))}
          </ul>
        </div>
      )}

      {previewFile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closePreview}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {previewFile.file.name}
            <iframe src={previewFile.url} width="600px" height="400px"></iframe>
            <br />
            <button onClick={closePreview}>Cerrar</button>
          </div>
        </div>
      )}

      {mergedPdfUrl && (
        <div>
          <iframe src={mergedPdfUrl} width="500px" height="600px"></iframe>
          <a href={mergedPdfUrl} download="modified.pdf">
            Descargar
          </a>
        </div>
      )}
    </div>
  );
};
export default MergePage;
