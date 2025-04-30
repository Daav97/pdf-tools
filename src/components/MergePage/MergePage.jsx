import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import UploadButton from '../UploadButton';
import { UploadedFileCard } from '../UploadedFileCard';
import {
  joinFilesNames,
  processUploadedPdfFiles,
  parsePageSelection,
  validatePDFFiles,
} from './MergePageLogic';
import Modal from '../Modal';
import CrossIcon from '../svg/CrossIcon';
import TrashIcon from '../svg/TrashIcon';
import Toast from '../Toast';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { CustomPointerSensor } from '../../lib/dnd-kit/CustomPointerSensor';
import Sortable from '../../lib/dnd-kit/Sortable';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const MergePage = () => {
  const EXTENSION = '.pdf';

  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [mergedFileName, setMergedFileName] = useState('');
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeDrag, setActiveDrag] = useState(null);

  const sensors = useSensors(
    useSensor(CustomPointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const uploadButton = useRef(null);

  const handleFileUpload = async (event) => {
    const incomingFiles = Array.from(event.target.files);

    if (incomingFiles.length > 0) {
      const convertedFiles = await validateAndConvertFiles(incomingFiles);

      setPdfFiles((prevFiles) => [...prevFiles, ...convertedFiles]);
      event.target.value = null;
    }
  };

  const handleUpdatePageSelection = (index, newPageSelection) => {
    const regex = /^[\d,\s-]*$/;
    if (!regex.test(newPageSelection.value)) {
      return;
    }

    setPdfFiles((prev) =>
      prev.map((file, i) =>
        i === index ? { ...file, pageSelection: newPageSelection } : file,
      ),
    );
  };

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingFiles(false);

    const incomingFiles = Array.from(e.dataTransfer.files);
    const convertedFiles = await validateAndConvertFiles(incomingFiles);

    setPdfFiles((prevFiles) => [...prevFiles, ...convertedFiles]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingFiles(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingFiles(false);
  };

  const validateAndConvertFiles = async (files) => {
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

    if (errorMessage) {
      setToastMessage(errorMessage);
    }

    return convertedFiles;
  };

  const handleDragStart = (event) => {
    const pdfFound = pdfFiles.find((file) => file.id === event.active.id);
    setActiveDrag(pdfFound);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = pdfFiles.findIndex((file) => file.id === active.id);
      const newIndex = pdfFiles.findIndex((file) => file.id === over.id);
      const newOrderArray = arrayMove(pdfFiles, oldIndex, newIndex);
      setPdfFiles(newOrderArray);
    }
    setActiveDrag(null);
  };

  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <div className="flex justify-between px-2 pb-1">
        <p
          className={`flex h-16 items-end font-semibold ${pdfFiles.length <= 0 && 'invisible'}`}
        >
          {`Archivos seleccionados (${pdfFiles.length}):`}
        </p>
        <div className="flex items-end gap-4" hidden={pdfFiles.length <= 0}>
          <button
            title="Añadir archivo"
            className="group mb-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-red-600 active:bg-red-700"
            onClick={() => uploadButton.current.click()}
          >
            <CrossIcon className="h-7 w-7 rotate-45 text-neutral-700 group-hover:text-white" />
          </button>
          <button
            title="Eliminar todos los archivos"
            className="group mb-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-red-600 active:bg-red-700"
            onClick={handleClearPDFFiles}
          >
            <TrashIcon className="h-6 w-6 text-neutral-700 group-hover:text-white" />
          </button>
        </div>
      </div>
      <ul
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-1 flex-wrap justify-center gap-8 overflow-auto border border-neutral-300 bg-neutral-200 p-5 ${pdfFiles.length <= 0 && 'items-center'}`}
      >
        {isDraggingFiles && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-2 border-neutral-500 bg-black/70">
            <p className="text-lg font-semibold text-white">
              ¡Suelta el archivo aquí!
            </p>
          </div>
        )}
        {!isDraggingFiles && (
          <div hidden={pdfFiles.length > 0}>
            <UploadButton
              text={'Subir archivos'}
              onUploadCallback={handleFileUpload}
              multiple={true}
              ref={uploadButton}
            />
            <p className="text-center text-lg text-black/50 select-none">
              o arrastra y suelta aquí
            </p>
          </div>
        )}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext items={pdfFiles} strategy={rectSortingStrategy}>
            <AnimatePresence>
              {pdfFiles.length > 0 &&
                pdfFiles.map((file, index) => (
                  <Sortable id={file.id} key={file.id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UploadedFileCard
                        index={index}
                        originalFile={file.originalFile}
                        deleteFileCallback={() => handleDeleteFile(index)}
                        moveDownFileCallback={() => handleMoveDownFile(index)}
                        moveUpFileCallback={() => handleMoveUpFile(index)}
                        openPreviewCallback={() =>
                          handlePreview(file.originalFile)
                        }
                        pageCount={file.pdfDocument.getPageCount()}
                        pageSelection={file.pageSelection}
                        onPageSelectionCallback={handleUpdatePageSelection}
                        className={isDraggingFiles ? 'pointer-events-none' : ''}
                      />
                    </motion.div>
                  </Sortable>
                ))}
            </AnimatePresence>
          </SortableContext>
          <DragOverlay>
            {activeDrag ? (
              <UploadedFileCard
                index={pdfFiles.findIndex((file) => file.id === activeDrag.id)}
                originalFile={activeDrag.originalFile}
                pageCount={activeDrag.pdfDocument.getPageCount()}
                pageSelection={activeDrag.pageSelection}
                className={isDraggingFiles ? 'pointer-events-none' : ''}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </ul>
      <div className="flex min-h-4 items-center justify-center">
        <button
          onClick={handleMergePdfs}
          className="m-4 h-16 w-72 cursor-pointer rounded bg-teal-400 px-4 py-2 text-xl font-medium text-white shadow select-none hover:bg-teal-500 active:bg-teal-600 disabled:cursor-auto disabled:bg-neutral-400 disabled:text-neutral-300"
          disabled={pdfFiles.length < 2}
          hidden={pdfFiles.length <= 0}
          title={
            pdfFiles.length < 2
              ? 'Agrega más archivos para unir'
              : 'Unir archivos'
          }
        >
          Unir archivos
        </button>
      </div>
      {previewFile && (
        <Modal closeCallback={closePreview}>
          <div className="relative flex flex-col gap-2">
            <button
              onClick={closePreview}
              className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-neutral-400 shadow shadow-black/50 hover:bg-red-600"
            >
              <CrossIcon className="h-6 w-6 text-neutral-100" />
            </button>
            <p className="w-full text-center font-semibold">
              {previewFile.file.name}
            </p>
            <iframe
              src={previewFile.url}
              className="h-[70vh] w-[80vw] rounded border-y border-neutral-200 lg:h-[70vh] lg:w-[50vw] 2xl:h-[85vh] 2xl:w-[35vw]"
            ></iframe>
            <br />
          </div>
        </Modal>
      )}

      {mergedPdfUrl && (
        <Modal>
          <div className="relative flex h-[70vh] w-[80vw] flex-col gap-2 lg:h-[70vh] lg:w-[50vw] 2xl:h-[85vh] 2xl:w-[35vw]">
            <button
              onClick={closeMergedPreview}
              className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-neutral-400 shadow shadow-black/50 hover:bg-red-600"
            >
              <CrossIcon className="h-6 w-6 text-neutral-100" />
            </button>
            <div className="flex max-w-3/4 items-center self-center">
              <div className="relative w-full">
                <span
                  className="pointer-events-none invisible inline-block px-2 font-semibold whitespace-pre"
                  aria-hidden="true"
                >
                  {mergedFileName || ''}
                </span>
                <input
                  title={mergedFileName}
                  value={mergedFileName}
                  onChange={handleMergedFileNameChange}
                  className="absolute top-0 left-0 w-full truncate rounded border border-neutral-300 bg-neutral-200 text-center font-semibold focus:outline-sky-300/50"
                />
              </div>
              <p className="font-semibold text-neutral-800">{EXTENSION}</p>
            </div>
            <iframe
              src={mergedPdfUrl}
              className="h-full w-full rounded border-y border-neutral-200"
            ></iframe>
            <a
              href={mergedPdfUrl}
              download={mergedFileName + EXTENSION}
              className="w-36 self-center rounded bg-sky-500 p-2 text-center font-bold text-white shadow shadow-black/30 hover:bg-sky-600 active:bg-sky-700"
            >
              Descargar
            </a>
          </div>
        </Modal>
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};
export default MergePage;
