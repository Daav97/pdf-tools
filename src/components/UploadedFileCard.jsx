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
  pageCount,
}) => {
  const [pagesSelection, setPagesSelection] = useState({
    start: 1,
    end: pageCount,
  });

  const handlePagesSelection = (position, newValue) => {
    const regex = /^$|^[1-9]\d*$/;
    if (regex.test(newValue)) {
      setPagesSelection((prev) => ({ ...prev, [position]: newValue }));
    }
  };

  return (
    <li
      className="flex h-[270px] w-48 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white transition hover:scale-105"
      onClick={() => openPreviewCallback(file.originalFile)}
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
          title={file.originalFile.name}
          className="w-full justify-center overflow-hidden text-center font-medium text-ellipsis select-none"
        >
          {file.originalFile.name}
        </p>
        <FileIcon className="h-28 text-neutral-700" />
        <p className="text-sm text-black/60 select-none">{`${pageCount} ${pageCount === 1 ? 'página' : 'páginas'}`}</p>
      </div>
      <div
        className="flex h-10 cursor-default items-center justify-between px-3 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-black/60 select-none">Selección:</p>
        <input
          type="text"
          className="w-10 rounded border border-neutral-200 bg-neutral-100 pl-1 text-sm text-black/70"
          onChange={(e) => handlePagesSelection('start', e.target.value)}
          value={pagesSelection.start}
        />
        <p className="select-none">/</p>
        <input
          type="text"
          className="w-10 rounded border border-neutral-200 bg-neutral-100 pl-1 text-sm text-black/70"
          onChange={(e) => handlePagesSelection('end', e.target.value)}
          value={pagesSelection.end}
        />
      </div>
    </li>
  );
};
export default UploadedFileCard;
