import ArrowIcon from '../svg/ArrowIcon';
import CrossIcon from '../svg/CrossIcon';

const CardActions = ({
  moveUpFileCallback,
  moveDownFileCallback,
  deleteFileCallback,
}) => {
  return (
    <div className="flex h-10 items-center justify-between px-3">
      <div className="flex gap-2">
        <button
          title="Mover a la izquierda"
          onClick={(e) => {
            e.stopPropagation();
            moveUpFileCallback();
          }}
          className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-600"
        >
          <ArrowIcon className="h-5 w-5 text-neutral-700 hover:text-white" />
        </button>
        <button
          title="Mover a la derecha"
          onClick={(e) => {
            e.stopPropagation();
            moveDownFileCallback();
          }}
          className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-600 hover:text-white"
        >
          <ArrowIcon className="h-5 w-5 rotate-180 text-neutral-700 hover:text-white" />
        </button>
      </div>
      <button
        title="Eliminar archivo"
        onClick={(e) => {
          e.stopPropagation();
          deleteFileCallback();
        }}
        className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-red-600"
      >
        <CrossIcon className="h-5 w-5 text-neutral-700 hover:text-white" />
      </button>
    </div>
  );
};
export default CardActions;
