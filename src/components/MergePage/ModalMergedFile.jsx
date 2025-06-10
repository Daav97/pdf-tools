import Modal from '../Modal';
import CrossIcon from '../svg/CrossIcon';

const EXTENSION = '.pdf';
const ModalMergedFile = ({
  closeMergedPreview,
  mergedFileName,
  handleMergedFileNameChange,
  mergedPdfUrl,
}) => {
  return (
    <Modal>
      <div className="relative flex h-[70vh] w-[80vw] flex-col gap-2 lg:h-[70vh] lg:w-[50vw] 2xl:h-[85vh] 2xl:w-[35vw]">
        <button
          onClick={closeMergedPreview}
          className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-neutral-400 shadow shadow-black/50 hover:bg-red-600"
        >
          <CrossIcon className="h-6 w-6 text-neutral-100" />
        </button>
        <div className="flex max-w-1/2 items-center self-center sm:max-w-3/4">
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
              onFocus={(e) => e.target.select()}
              className="absolute top-0 left-0 w-full truncate rounded border border-neutral-300 bg-neutral-200 text-center font-semibold focus:outline-sky-300/50"
            />
          </div>
          <p className="font-semibold text-neutral-800">{EXTENSION}</p>
        </div>
        <iframe
          src={mergedPdfUrl}
          className="h-full w-full rounded border-y border-neutral-200"
        />
        <a
          href={mergedPdfUrl}
          download={mergedFileName + EXTENSION}
          className="w-36 self-center rounded bg-sky-500 p-2 text-center font-bold text-white shadow shadow-black/30 hover:bg-sky-600 active:bg-sky-700"
        >
          Descargar
        </a>
      </div>
    </Modal>
  );
};
export default ModalMergedFile;
