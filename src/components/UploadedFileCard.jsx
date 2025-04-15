import FileIcon from './svg/FileIcon';
import ArrowIcon from './svg/ArrowIcon';
import CrossIcon from './svg/CrossIcon';
import { useEffect, useRef, useState } from 'react';
import { validatePageSelection } from './MergePage/MergePageLogic';

const UploadedFileCard = ({
  index,
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

  return (
    <li
      className={`flex h-[290px] w-48 cursor-pointer flex-col rounded-2xl bg-white shadow-md transition hover:scale-105 ${className}`}
      onClick={() => openPreviewCallback(originalFile)}
    >
      <div className="flex h-10 items-center justify-between px-3">
        <div className="flex gap-2">
          <button
            title="Mover a la izquierda"
            onClick={(e) => {
              e.stopPropagation();
              moveUpFileCallback();
            }}
            className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-600"
          >
            <ArrowIcon className="h-5 w-5 text-neutral-700 hover:text-white" />
          </button>
          <button
            title="Mover a la derecha"
            onClick={(e) => {
              e.stopPropagation();
              moveDownFileCallback();
            }}
            className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-600 hover:text-white"
          >
            <ArrowIcon className="h-5 w-5 rotate-180 text-neutral-700 hover:text-white" />
          </button>
        </div>
        <button
          title="Eliminar archivo"
          onClick={(e) => {
            e.stopPropagation();
            deleteFileCallback();
          }}
          className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-red-600"
        >
          <CrossIcon className="h-5 w-5 text-neutral-700 hover:text-white" />
        </button>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-3 pt-4">
        <p className="absolute top-0 left-0 ml-[13.5px] text-sm font-light text-black/70 select-none">
          {`#${index + 1}`}
        </p>
        <p
          title={originalFile.name}
          className="w-full justify-center overflow-hidden text-center font-medium text-ellipsis select-none"
        >
          {originalFile.name}
        </p>
        <FileIcon className="h-28 text-neutral-700" />
        <p className="text-sm text-black/60 select-none">{`${pageCount} ${pageCount === 1 ? 'página' : 'páginas'}`}</p>
      </div>
      <div
        className="flex h-16 cursor-default flex-col items-center justify-center gap-2 px-3 pb-2"
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
