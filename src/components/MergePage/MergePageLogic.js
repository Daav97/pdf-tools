import { PDFDocument } from 'pdf-lib';

//Converts original PDF File into a PDFDocument from pdf-lib
export const convertToPdfDocument = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  return await PDFDocument.load(arrayBuffer);
};
