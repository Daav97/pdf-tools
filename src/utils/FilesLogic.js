import { PDFDocument } from 'pdf-lib';

//Converts original PDF File into a PDFDocument from pdf-lib
export const convertToPdfDocument = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  return await PDFDocument.load(arrayBuffer);
};

/**
 * Parses a page selection string (e.g., "1, 3-5, 7") into an array of page numbers.
 * Handles both single page numbers and ranges (e.g., "1" or "3-5").
 * If the string contains invalid page numbers or ranges they won't be parsed.
 *
 * @param {string} selection - The page selection string, which can include individual page numbers and ranges.
 * @returns {number[]} An array of page numbers represented in the selection string.
 */
export const parsePageSelection = (selection, totalPages) => {
  const pages = new Set();

  selection
    .split(',')
    .map((part) => part.trim())
    .forEach((part) => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) pages.add(i - 1);
        }
      } else {
        const page = Number(part);
        if (page >= 1 && page <= totalPages) pages.add(page - 1);
      }
    });

  return Array.from(pages).sort((a, b) => a - b);
};

export const validatePageSelection = (selectionString, maxPage) => {
  const parts = selectionString.split(',').map((part) => part.trim());

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map((p) => p.trim());
      if (start === '' || end === '') {
        return 'Rango mal configurado';
      }

      if (start > end) {
        return 'Rango mal configurado, el inicio no puede ser mayor al final';
      }
      if (end > maxPage) {
        return 'Una de las páginas del rango excede el total de páginas';
      }
    } else {
      if (part > maxPage) {
        return 'La página seleccionada está fuera del límite de páginas';
      }
    }
  }
};

export const joinFilesNames = (files) => {
  return files
    .map(({ originalFile }) => originalFile.name)
    .map((name) => name.split('.')[0])
    .join('_');
};

const DEFAULT_PAGE_SELECTION = {
  mode: 'All',
  value: '',
};

/**
 * Processes a list of files and attempts to convert valid PDF files
 * into structured internal objects, separating successful and failed ones.
 *
 * @async
 * @function
 * @param {File[]} files - List of uploaded files to process.
 * @returns {Promise<[Array<Object>, Array<string>]>} A promise that resolves to a tuple containing:
 *   - An array of successfully processed PDF file objects.
 *   - An array of file names that failed to process.
 *
 * Each successful object includes:
 *   - `id`: A unique identifier based on timestamp and file name.
 *   - `originalFile`: The original uploaded file.
 *   - `pdfDocument`: The parsed PDF document.
 *   - `pageSelection`: A object containing the page selection mode and a value with an initially empty string for page selection.
 */
export const processUploadedPdfFiles = async (files) => {
  const results = await Promise.allSettled(
    files.map(async (file) => {
      try {
        const pdfDoc = await convertToPdfDocument(file);
        const id = Date.now() + file.name;
        return {
          id,
          originalFile: file,
          pdfDocument: pdfDoc,
          pageSelection: DEFAULT_PAGE_SELECTION,
        };
      } catch (error) {
        throw { error, file };
      }
    }),
  );

  const successfulFiles = [];
  const failedFiles = [];
  const encryptedFiles = [];

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      successfulFiles.push(result.value);
    } else {
      const { error, file } = result.reason;

      if (error?.message?.includes('is encrypted')) {
        encryptedFiles.push(file.name);
      } else {
        failedFiles.push(file.name);
      }
      console.error(`Error al procesar ${file.name}:`, result.reason);
    }
  });

  return [successfulFiles, failedFiles, encryptedFiles];
};

export const isPdfFile = (file) => file.type === 'application/pdf';

export const validatePDFFiles = (files) => {
  const validFiles = [];
  const invalidFiles = [];

  files.forEach((file) => {
    if (isPdfFile(file)) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file.name);
    }
  });
  return [validFiles, invalidFiles];
};

export const validateAndConvertFiles = async (files) => {
  const [validPDFFiles, invalidFiles] = validatePDFFiles(files);
  let errorMessage = '';

  if (invalidFiles.length > 0) {
    errorMessage += `
    Los siguientes archivos no son archivos PDF válidos: ${invalidFiles.join(', ')}
    . `;
  }

  const [convertedFiles, failedFiles, encryptedFiles] =
    await processUploadedPdfFiles(validPDFFiles);

  if (encryptedFiles.length > 0) {
    errorMessage += `Los siguientes archivos tienen contraseña: ${encryptedFiles.join(', ')}. `;
  }

  if (failedFiles.length > 0) {
    errorMessage += `No fue posible procesar los archivos: ${failedFiles.join(', ')}. `;
  }

  return { convertedFiles, errorMessage: errorMessage.trim() || null };
};
