const UploadButton = ({
  text = 'Upload',
  onUploadCallback,
  multiple = false,
  accept = 'application/pdf',
  ref = null,
  hidden = false,
}) => {
  return (
    <div className="flex" hidden={hidden}>
      <label
        htmlFor="inputFile"
        className="m-5 flex h-16 w-72 cursor-pointer items-center justify-center rounded bg-red-700 px-4 py-2 font-medium text-white shadow select-none hover:bg-red-800 active:bg-red-900"
      >
        <p className="text-xl">{text}</p>
      </label>
      <input
        id="inputFile"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onUploadCallback}
        className="hidden"
        ref={ref}
      />
    </div>
  );
};
export default UploadButton;
