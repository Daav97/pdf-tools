import ClosedEye from '../../../svg/ClosedEye';
import CrossIcon from '../../../svg/CrossIcon';
import ExpandIcon from '../../../svg/ExpandIcon';
import OpenedEye from '../../../svg/Openedeye';
import SwapIcon from '../../../svg/SwapIcon';
import ToolbarButton from './ToolbarButton';

const Toolbar = ({
  onFileDisplayButtonClick,
  showFilePreview,
  onExpandButtonClick,
  clearPdfFileCallback,
}) => {
  return (
    <div className="flex w-18 flex-col items-center justify-between bg-neutral-400 py-4">
      <div className="flex flex-col gap-4">
        <ToolbarButton
          title="Mostrar/Ocultar previsualización"
          onClick={onFileDisplayButtonClick}
        >
          {showFilePreview ? (
            <ClosedEye className="h-8 w-8" />
          ) : (
            <OpenedEye className="h-8 w-8" />
          )}
        </ToolbarButton>

        <ToolbarButton
          title="Expandir previsualización"
          onClick={onExpandButtonClick}
        >
          <ExpandIcon className="h-7 w-7" />
        </ToolbarButton>
      </div>

      <div className="flex flex-col gap-4">
        <ToolbarButton title="Reemplazar archivo">
          <label htmlFor="inputFileButton" className="cursor-pointer">
            <SwapIcon className="h-7 w-7" />
          </label>
          <input
            type="file"
            id="inputFileButton"
            className="hidden"
            accept="application/pdf"
            multiple={false}
          />
        </ToolbarButton>
        <ToolbarButton title="Cerrar archivo" onClick={clearPdfFileCallback}>
          <CrossIcon className="h-9 w-9" />
        </ToolbarButton>
      </div>
    </div>
  );
};
export default Toolbar;
