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
