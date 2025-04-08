import FileIcon from './svg/FileIcon';
import LeftIcon from './svg/LeftIcon';
import RightIcon from './svg/RightIcon';
import CrossIcon from './svg/CrossIcon';
import { useState } from 'react';

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
}) => {
  const [selectionMode, setSelectionMode] = useState('custom');

  const handleSelectionModeChange = (e) => {
    setSelectionMode(e.target.value);
    onPageSelectionCallback(index, '');
  };

  return (
    <li
      className="flex h-[290px] w-48 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white transition hover:scale-105"
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
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-neutral-300 hover:bg-neutral-400"
          >
            <LeftIcon className="h-4 w-4 text-neutral-700" />
          </button>
          <button
            title="Mover a la derecha"
            onClick={(e) => {
              e.stopPropagation();
              moveDownFileCallback();
            }}
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-neutral-300 hover:bg-neutral-400"
          >
            <RightIcon className="h-4 w-4 text-neutral-700" />
          </button>
        </div>
        <button
          title="Eliminar archivo"
          onClick={(e) => {
            e.stopPropagation();
            deleteFileCallback();
          }}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-neutral-300 hover:bg-neutral-400"
        >
          <CrossIcon className="h-5 w-5 text-neutral-700" />
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
            className="rounded border border-neutral-200 bg-neutral-100 text-sm text-black/70"
            onChange={handleSelectionModeChange}
            value={selectionMode}
          >
            <option value="all">Todas</option>
            <option value="custom">Selección</option>
          </select>
        </div>
        <input
          type="text"
          className="w-36 rounded border border-neutral-200 bg-neutral-100 pl-1 text-sm text-black/70"
          hidden={selectionMode === 'all'}
          placeholder="p. ej. 1-5, 8, 11-13"
          title="Ingresa las páginas o los rangos a utilizar"
          value={pageSelection}
          onChange={(e) => onPageSelectionCallback(index, e.target.value)}
        />
      </div>
    </li>
  );
};
export default UploadedFileCard;
