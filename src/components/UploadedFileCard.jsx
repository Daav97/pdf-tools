import FileIcon from './svg/FileIcon';
import LeftIcon from './svg/LeftIcon';
import RightIcon from './svg/RightIcon';
import CrossIcon from './svg/CrossIcon';
import { useState } from 'react';

const UploadedFileCard = ({
  index,
  file,
  deleteFileCallback,
  moveDownFileCallback,
  moveUpFileCallback,
  openPreviewCallback,
}) => {
  const [pageSelection, setPageSelection] = useState({ start: 1, end: '-' });

  const handlePageSelection = (position, newValue) => {
    setPageSelection((prev) => {
      return { ...prev, [position]: newValue };
    });
  };

  return (
    <li
      className="flex h-64 w-48 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white transition hover:scale-105"
      onClick={() => openPreviewCallback(file)}
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
            <LeftIcon height="16px" width="16px" />
          </button>
          <button
            title="Mover a la derecha"
            onClick={(e) => {
              e.stopPropagation();
              moveDownFileCallback();
            }}
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-neutral-300 hover:bg-neutral-400"
          >
            <RightIcon height="16px" width="16px" />
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
          <CrossIcon height="20px" width="20px" />
        </button>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-3 pt-4">
        <p className="absolute top-0 left-0 ml-[13.5px] text-sm font-light text-black/70">
          {`#${index + 1}`}
        </p>
        <p
          title={file.name}
          className="w-full justify-center overflow-hidden text-center text-ellipsis select-none"
        >
          {file.name}
        </p>
        <FileIcon height="110" fill="#404040" />
        <p className="text-sm font-light">130 páginas</p>
      </div>
      <div
        className="flex h-10 cursor-default items-center justify-between px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-black/60">Selección:</p>
        <input
          type="text"
          className="w-10 rounded border border-neutral-200 bg-neutral-100 pl-1 text-sm"
          onChange={(e) => handlePageSelection('start', e.target.value)}
          value={pageSelection.start}
        />
        <p>/</p>
        <input
          type="text"
          className="w-10 rounded border border-neutral-200 bg-neutral-100 pl-1 text-sm"
          onChange={(e) => handlePageSelection('end', e.target.value)}
          value={pageSelection.end}
        />
      </div>
    </li>
  );
};
export default UploadedFileCard;
