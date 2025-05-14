import { useState } from 'react';
import CrossIcon from '../../../svg/CrossIcon';

const Footer = () => {
  const [newSplitValue, setNewSplitValue] = useState('');

  const handleSplitInput = (event) => {
    setNewSplitValue(event.target.value);
  };

  return (
    <div className="flex h-20 flex-col bg-neutral-300 py-2 pr-2 pl-14">
      <span className="text-md font-light text-neutral-900">
        Ingresa las páginas y/o los rangos a utilizar en la separación:
      </span>
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 bg-emerald-200">
          <span className="absolute top-1/2 -left-6 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-neutral-400 bg-neutral-100 text-neutral-600 hover:scale-110">
            i
          </span>
          <input
            className="h-9 w-full rounded border border-neutral-400 bg-neutral-100 p-1 pr-7 text-neutral-800 focus:outline-none"
            placeholder="p. ej. 1-5, 8, 11-13"
            onChange={handleSplitInput}
            type="text"
            value={newSplitValue}
          />
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer text-neutral-400"
            onClick={() => setNewSplitValue('')}
          >
            {newSplitValue !== '' && <CrossIcon className="h-8 w-8" />}
          </button>
        </div>

        <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-teal-500 p-1 text-white hover:bg-teal-600 active:bg-teal-700">
          <CrossIcon className="rotate-45" />
        </button>
      </div>
    </div>
  );
};
export default Footer;
