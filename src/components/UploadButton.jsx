const UploadButton = ({
  text = 'Upload',
  onChangeCallback,
  multiple = false,
  accept = 'application/pdf',
}) => {
  return (
    <div className="flex">
      <label
        htmlFor="inputFile"
        className="m-5 flex h-10 w-64 cursor-pointer justify-center rounded bg-red-700 px-4 py-2 font-medium text-white shadow select-none hover:bg-red-800 active:bg-red-900"
      >
        {text}
      </label>
      <input
        id="inputFile"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChangeCallback}
        className="hidden"
      />
    </div>
  );
};
export default UploadButton;
