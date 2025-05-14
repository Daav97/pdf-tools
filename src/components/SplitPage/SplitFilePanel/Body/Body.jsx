import FileCover from './FileCover';

const Body = ({ showFilePreview, file }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="h-[95%] w-[60%] overflow-hidden rounded-md shadow-md">
        {showFilePreview ? (
          <iframe src={file.url} className="h-full w-full" />
        ) : (
          <FileCover
            fileName={file.originalFile.name}
            pagesCount={file.pdfDocument.getPageCount()}
          />
        )}
      </div>
    </div>
  );
};
export default Body;
