import CrossIcon from '../svg/CrossIcon';
import TrashIcon from '../svg/TrashIcon';

const Toolbar = ({ uploadedFilesCount, onAddFile, onClearPdfFiles }) => {
  return (
    <div className="flex w-full justify-between px-2 pb-1">
      <p
        className={`flex h-16 items-end font-semibold ${uploadedFilesCount <= 0 && 'invisible'}`}
      >
        {`Archivos seleccionados (${uploadedFilesCount}):`}
      </p>
      <div
        className="flex flex-wrap items-end gap-4"
        hidden={uploadedFilesCount <= 0}
      >
        <button
          title="Añadir archivo"
          className="group mb-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-red-600 active:bg-red-700"
          onClick={onAddFile}
        >
          <CrossIcon className="h-7 w-7 rotate-45 text-neutral-700 group-hover:text-white" />
        </button>
        <button
          title="Eliminar todos los archivos"
          className="group mb-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-red-600 active:bg-red-700"
          onClick={onClearPdfFiles}
        >
          <TrashIcon className="h-6 w-6 text-neutral-700 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};
export default Toolbar;
