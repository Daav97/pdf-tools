const Footer = ({ uploadedFilesCount, onMergeClick }) => {
  return (
    <div className="flex min-h-4 items-center justify-center">
      <button
        onClick={onMergeClick}
        className="m-4 h-16 w-72 cursor-pointer rounded bg-teal-400 px-4 py-2 text-xl font-medium text-white shadow select-none hover:bg-teal-500 active:bg-teal-600 disabled:cursor-auto disabled:bg-neutral-400 disabled:text-neutral-300"
        disabled={uploadedFilesCount < 2}
        hidden={uploadedFilesCount <= 0}
        title={
          uploadedFilesCount < 2
            ? 'Agrega más archivos para unir'
            : 'Unir archivos'
        }
      >
        Unir archivos
      </button>
    </div>
  );
};
export default Footer;
