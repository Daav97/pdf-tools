import Modal from '../../Modal';
import CrossIcon from '../../svg/CrossIcon';

const ModalExpandedFilePreview = ({ closeExpandedFileModal, fileUrl }) => {
  return (
    <Modal closeCallback={closeExpandedFileModal}>
      <button
        onClick={closeExpandedFileModal}
        className="absolute top-0 -right-14 cursor-pointer rounded-full bg-neutral-400 shadow shadow-black/50 hover:bg-red-600"
      >
        <CrossIcon className="h-10 w-10 text-neutral-100" />
      </button>
      <div className="relative h-[92vh] w-[35vw] justify-center">
        <iframe
          src={fileUrl}
          className="h-full w-full rounded border-y border-neutral-200"
        />
      </div>
    </Modal>
  );
};
export default ModalExpandedFilePreview;
