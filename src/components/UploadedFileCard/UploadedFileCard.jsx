import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardActions from './CardActions';
import FilePreview from './FilePreview';
import PageSelectionControl from './PageSelectionControl';

const UploadedFileCard = ({
  index,
  id,
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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const dndStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={dndStyles}
      className={`flex h-[290px] w-48 cursor-grab flex-col rounded-2xl bg-white shadow-md transition ${className}`}
      {...attributes}
      {...listeners}
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
