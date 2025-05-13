const SplitFilePanel = ({ file }) => {
  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-200">
      <div className="flex flex-1">
        {/* Tools */}
        <div className="flex w-18 flex-col items-center gap-2 bg-cyan-100">
          <button className="w-16 cursor-pointer overflow-hidden rounded bg-black text-white">
            Ocultar
          </button>
          <button className="w-16 cursor-pointer overflow-hidden rounded bg-black text-white">
            Expandir
          </button>
          <div className="w-16 overflow-hidden rounded bg-black text-white">
            <label htmlFor="inputFileButton" className="cursor-pointer">
              Reemplazar
            </label>
            <input
              type="file"
              id="inputFileButton"
              className="hidden"
              accept="application/pdf"
              multiple={false}
            />
          </div>
          <button className="w-16 cursor-pointer overflow-hidden rounded bg-black text-white">
            Eliminar
          </button>
        </div>
        {/* Body */}
        <div className="flex flex-1 items-center justify-center bg-blue-100">
          {/* Preview */}
          <div className="h-[95%] w-[60%]">
            <iframe
              src={file.url}
              className="h-full w-full rounded border-y border-neutral-200"
            ></iframe>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="h-20 bg-purple-100"></div>
    </div>
  );
};
export default SplitFilePanel;
