import { useState } from 'react';
import './App.css';
import MergePage from './components/MergePage/MergePage';
import ToggleSwitch from './components/ToggleSwitch/ToggleSwitch';
import SplitPage from './components/SplitPage/SplitPage';

function App() {
  const [isMergeMode, setIsMergeMode] = useState(true);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-neutral-50">
      <div className="flex flex-col flex-wrap items-start px-2 pt-2 sm:flex-row sm:items-center">
        <div className="flex-1">
          <ToggleSwitch
            isLeft={isMergeMode}
            onToggle={() => setIsMergeMode((prev) => !prev)}
            leftLabel="Unir"
            rightLabel="Separar"
          />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="text-center text-nowrap text-red-700 text-shadow-sm sm:text-xl md:text-2xl lg:text-3xl">
            {isMergeMode ? 'UNIR ARCHIVOS PDF' : 'SEPARAR ARCHIVOS PDF'}
          </span>
        </div>
        <div className="flex flex-1 justify-end">
          <p>Config</p>
        </div>
      </div>
      <p className="hidden p-2 text-center text-lg font-light sm:block">
        {isMergeMode
          ? 'Sube los archivos a unir, elige un orden adecuado y configura la selección de páginas de cada archivo si es necesario.'
          : 'Sube el archivo a separar.'}
      </p>
      {isMergeMode ? <MergePage /> : <SplitPage />}
    </div>
  );
}

export default App;
