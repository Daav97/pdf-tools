import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const MergePage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setPdfFiles((prevFiles) => [...prevFiles, newFile]);
      event.target.value = null;
    }
  };

  const handleMergePdfs = async () => {
    if (pdfFiles.length < 2) {
      alert('Sube por lo menos dos archivos a unir');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      await new Promise((resolve) => {
        reader.onload = async (e) => {
          const pdfBytes = e.target.result;
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(
            pdfDoc,
            pdfDoc.getPageIndices()
          );

          copiedPages.forEach((page) => mergedPdf.addPage(page));
          resolve();
        };
      });

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    }
  };

  const handlePreview = (file) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
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
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleMergePdfs}>Unir archivos</button>

      {pdfFiles.length > 0 && (
        <div>
          <h3>Archivos seleccionados:</h3>
          <ol>
            {pdfFiles.map((file, index) => (
              <li key={index}>
                <button
                  style={{ margin: '0 10px 0 0 ' }}
                  onClick={() => handlePreview(file)}
                >
                  {file.name}
                </button>
                <button onClick={() => handleMoveUpFile(index)}>subir</button>
                <button onClick={() => handleMoveDownFile(index)}>bajar</button>
                <button onClick={() => handleDeleteFile(index)}>
                  eliminar
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {previewUrl && (
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
            <iframe src={previewUrl} width="600px" height="400px"></iframe>
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
