import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const MergePage = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setPdfFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleMergePdfs = async () => {
    if (pdfFiles.length <= 0) {
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

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleMergePdfs}>Modify PDF</button>
      {mergedPdfUrl && (
        <div>
          <iframe src={mergedPdfUrl} width="500px" height="600px"></iframe>
          <a href={mergedPdfUrl} download="modified.pdf">
            Download Modified PDF
          </a>
        </div>
      )}
    </div>
  );
};
export default MergePage;
