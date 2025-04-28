import { useEffect, useRef, useState } from 'react';
import { validatePageSelection } from '../MergePage/MergePageLogic';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardActions from './CardActions';
import FilePreview from './FilePreview';

const UploadedFileCard = ({
  index,
  id,
  originalFile,
  deleteFileCallback,
  moveDownFileCallback,
  moveUpFileCallback,
  openPreviewCallback,
  onPageSelectionCallback,
  pageSelection,
  pageCount,
  className,
}) => {
  const [selectionMode, setSelectionMode] = useState('all');
  const [errorPageSelection, setErrorPageSelection] = useState(null);
  const selectionInputRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  useEffect(() => {
    const error = validatePageSelection(pageSelection, pageCount);
    if (error) {
      setErrorPageSelection(error);
    } else {
      setErrorPageSelection('');
    }
  }, [pageSelection, pageCount]);

  useEffect(() => {
    if (selectionMode === 'custom') {
      selectionInputRef.current.focus();
    }
  }, [selectionMode]);

  const handleOnBlurPageSelection = (e) => {
    if (e.target.value === '') {
      onPageSelectionCallback(index, '1');
    }
  };

  const handleSelectionModeChange = (e) => {
    setSelectionMode(e.target.value);
    onPageSelectionCallback(index, '');
  };

  const dndStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={dndStyles}
      className={`flex h-[290px] w-48 cursor-grab flex-col rounded-2xl bg-white shadow-md transition ${className}`}
      {...attributes}
      {...listeners}
    >
      <CardActions
        moveDownFileCallback={moveDownFileCallback}
        moveUpFileCallback={moveUpFileCallback}
        deleteFileCallback={deleteFileCallback}
      />
      <FilePreview
        file={originalFile}
        index={index}
        onOpenPreview={openPreviewCallback}
        pageCount={pageCount}
      />
      <div
        className="flex h-16 flex-col items-center justify-center gap-2 px-3 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2">
          <p
            className="text-sm text-black/60 select-none"
            title="Elige el rango de páginas a utilizar"
          >
            Páginas:
          </p>
          <select
            className="rounded border border-neutral-200 bg-neutral-100 text-sm text-black/70 select-none focus:outline-sky-300/50"
            onChange={handleSelectionModeChange}
            value={selectionMode}
          >
            <option value="all">Todas</option>
            <option value="custom">Selección</option>
          </select>
        </div>
        <div className="relative flex">
          {errorPageSelection && (
            <div className="absolute top-full left-1/2 mt-2 w-max max-w-48 -translate-x-1/2 rounded bg-red-500 px-2 py-1 text-xs text-white shadow">
              <p>{errorPageSelection}</p>
              <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-500"></div>
            </div>
          )}
          <input
            ref={selectionInputRef}
            type="text"
            className={`w-36 rounded border pl-1 text-sm text-black/70 focus:outline-sky-300/50 ${errorPageSelection ? 'border-red-300 bg-red-100 text-red-700 focus:outline-none' : 'border-neutral-200 bg-neutral-100'}`}
            hidden={selectionMode === 'all'}
            placeholder="p. ej. 1-5, 8, 11-13"
            title="Ingresa las páginas o los rangos a utilizar"
            value={pageSelection}
            onChange={(e) => onPageSelectionCallback(index, e.target.value)}
            onBlur={handleOnBlurPageSelection}
          />
        </div>
      </div>
    </li>
  );
};
export default UploadedFileCard;
