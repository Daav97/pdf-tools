import CardActions from './CardActions';
import FilePreview from './FilePreview';
import PageSelectionControl from './PageSelectionControl';

const UploadedFileCard = ({
  index,
  originalFile,
  deleteFileCallback,
  moveDownFileCallback,
  moveUpFileCallback,
  openPreviewCallback,
  onPageSelectionCallback,
  pageSelection,
  pageCount,
  className,
}) => {
  return (
    <li
      className={`flex h-[290px] w-48 cursor-grab flex-col rounded-2xl bg-white shadow-md transition ${className}`}
    >
      <CardActions
        moveDownFileCallback={moveDownFileCallback}
        moveUpFileCallback={moveUpFileCallback}
        deleteFileCallback={deleteFileCallback}
      />
      <FilePreview
        file={originalFile}
        index={index}
        onOpenPreview={openPreviewCallback}
        pageCount={pageCount}
      />
      <PageSelectionControl
        index={index}
        pageSelection={pageSelection}
        pageCount={pageCount}
        onPageSelectionCallback={onPageSelectionCallback}
      />
    </li>
  );
};
export default UploadedFileCard;
