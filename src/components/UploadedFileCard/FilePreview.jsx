import FileIcon from '../svg/FileIcon';

const FilePreview = ({ file, onOpenPreview, pageCount, index }) => {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-3 pt-4">
      <p className="absolute top-0 left-0 ml-[13.5px] text-sm font-light text-black/70 select-none">
        {`#${index + 1}`}
      </p>
      <p
        title={file.name}
        className="w-full justify-center overflow-hidden text-center font-medium text-ellipsis select-none"
      >
        {file.name}
      </p>
      <div className="cursor-pointer" onClick={() => onOpenPreview(file)}>
        <FileIcon className="h-28 text-neutral-700" />
      </div>
      <p className="text-sm text-black/60 select-none">{`${pageCount} ${pageCount === 1 ? 'página' : 'páginas'}`}</p>
    </div>
  );
};
export default FilePreview;
