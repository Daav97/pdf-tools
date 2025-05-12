import { useEffect, useRef } from 'react';
import { validatePageSelection } from '../../utils/FilesLogic';

const DEFAULT_SELECTION_VALUE_ON_BLUR = '1';

const PageSelectionControl = ({
  index,
  pageSelection,
  pageCount,
  onPageSelectionCallback,
}) => {
  const selectionInputRef = useRef(null);
  const errorPageSelection = validatePageSelection(
    pageSelection.value,
    pageCount,
  );

  useEffect(() => {
    if (pageSelection.mode === 'custom') {
      selectionInputRef.current.focus();
    }
  }, [pageSelection.mode]);

  const handleSelectionModeChange = (e) => {
    // When the selection mode changes its value, notify the parent component by calling the callback function, sending the new mode an reseting the value.
    onPageSelectionCallback(index, { mode: e.target.value, value: '' });
  };

  const handleOnBlurPageSelection = (e) => {
    //If the value is empty when the input lost focus, a default value is asigned
    if (e.target.value === '') {
      onPageSelectionCallback(index, {
        ...pageSelection,
        value: DEFAULT_SELECTION_VALUE_ON_BLUR,
      });
    }
  };

  const handleSelectionChange = (e) => {
    onPageSelectionCallback(index, { ...pageSelection, value: e.target.value });
  };

  return (
    <div
      className="flex h-16 flex-col items-center justify-center gap-2 px-3 pb-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-2">
        <p
          className="text-sm text-black/60 select-none"
          title="Elige el rango de páginas a utilizar"
        >
          Páginas:
        </p>
        <select
          className="rounded border border-neutral-200 bg-neutral-100 text-sm text-black/70 select-none focus:outline-sky-300/50"
          onChange={handleSelectionModeChange}
          value={pageSelection.mode}
        >
          <option value="all">Todas</option>
          <option value="custom">Selección</option>
        </select>
      </div>
      <div className="relative flex">
        {errorPageSelection && (
          <div className="absolute top-full left-1/2 mt-2 w-max max-w-48 -translate-x-1/2 rounded bg-red-500 px-2 py-1 text-xs text-white shadow">
            <p>{errorPageSelection}</p>
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-500"></div>
          </div>
        )}
        {pageSelection.mode === 'custom' && (
          <input
            ref={selectionInputRef}
            type="text"
            className={`w-36 rounded border pl-1 text-sm text-black/70 focus:outline-sky-300/50 ${errorPageSelection ? 'border-red-300 bg-red-100 text-red-700 focus:outline-none' : 'border-neutral-200 bg-neutral-100'}`}
            placeholder="p. ej. 1-5, 8, 11-13"
            title="Ingresa las páginas o los rangos a utilizar"
            value={pageSelection.value}
            onChange={handleSelectionChange}
            onBlur={handleOnBlurPageSelection}
          />
        )}
      </div>
    </div>
  );
};
export default PageSelectionControl;
