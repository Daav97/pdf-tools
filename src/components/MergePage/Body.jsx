import {
  closestCenter,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import UploadButton from '../UploadButton';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import Sortable from '../../lib/dnd-kit/Sortable';
import { CustomPointerSensor } from '../../lib/dnd-kit/CustomPointerSensor';
import { useState } from 'react';
import { UploadedFileCard } from '../UploadedFileCard';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { validateAndConvertFiles } from '../../utils/FilesLogic';

const Body = ({
  uploadButtonRef,
  pdfFiles,
  setPdfFiles,
  onPreviewFile,
  setToastMessage,
}) => {
  const [activeDrag, setActiveDrag] = useState(null);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);

  const sensors = useSensors(
    useSensor(CustomPointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingFiles(false);

    const incomingFiles = Array.from(e.dataTransfer.files);
    const { convertedFiles, errorMessage } =
      await validateAndConvertFiles(incomingFiles);

    if (errorMessage) {
      setToastMessage(errorMessage);
    }

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

  const handleFileUpload = async (event) => {
    const incomingFiles = Array.from(event.target.files);

    if (incomingFiles.length > 0) {
      const { convertedFiles, errorMessage } =
        await validateAndConvertFiles(incomingFiles);

      if (errorMessage) {
        setToastMessage(errorMessage);
      }

      setPdfFiles((prevFiles) => [...prevFiles, ...convertedFiles]);
      event.target.value = null;
    }
  };

  const handleDeleteFile = (index) => {
    setPdfFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);

      return newFiles;
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

  const handleMoveUpFile = (index) => {
    if (index === 0) return;

    setPdfFiles((prevFiles) => {
      const newOrder = [...prevFiles];

      const [file] = newOrder.splice(index, 1);
      newOrder.splice(index - 1, 0, file);

      return newOrder;
    });
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

  return (
    <ul
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`relative flex flex-1 flex-wrap justify-center gap-8 overflow-auto border border-neutral-300 bg-neutral-200 p-5 ${pdfFiles.length <= 0 && 'items-center'}`}
    >
      {isDraggingFiles ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-2 border-neutral-500 bg-black/70">
          <p className="text-lg font-semibold text-white">
            ¡Suelta el archivo aquí!
          </p>
        </div>
      ) : (
        <div
          hidden={pdfFiles.length > 0}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <UploadButton
            text={'Subir archivos'}
            onUploadCallback={handleFileUpload}
            multiple={true}
            ref={uploadButtonRef}
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
                        onPreviewFile(file.originalFile)
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
  );
};
export default Body;
