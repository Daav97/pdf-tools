import Modal from '../Modal';
import CrossIcon from '../svg/CrossIcon';

const ModalPreviewFile = ({ closePreview, fileName, fileUrl }) => {
  return (
    <Modal closeCallback={closePreview}>
      <div className="relative flex flex-col gap-2">
        <button
          onClick={closePreview}
          className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-neutral-400 shadow shadow-black/50 hover:bg-red-600"
        >
          <CrossIcon className="h-6 w-6 text-neutral-100" />
        </button>
        <p className="w-full text-center font-semibold">{fileName}</p>
        <iframe
          src={fileUrl}
          className="h-[70vh] w-[80vw] rounded border-y border-neutral-200 lg:h-[70vh] lg:w-[50vw] 2xl:h-[85vh] 2xl:w-[35vw]"
        />
        <br />
      </div>
    </Modal>
  );
};
export default ModalPreviewFile;
