import Modal from '../../../Modal';
import CrossIcon from '../../../svg/CrossIcon';

const ModalSplitInfo = ({ closeCallback }) => {
  return (
    <Modal closeCallback={closeCallback}>
      <div className="flex h-64 w-sm flex-col overflow-y-auto xl:w-md 2xl:w-xl">
        <div className="flex w-full items-center justify-between">
          <p className="font-bold">
            Agrega páginas y/o rangos para la separación:
          </p>
          <button onClick={closeCallback}>
            <CrossIcon className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        <div className="mt-4">
          <p className="mt-2">
            Utiliza comas ( , ) para separar páginas individuales y/o rangos.
          </p>
          <p>Utiliza guiones ( - ) para definir un rango de páginas.</p>
          <p className="mt-6 mb-2 font-light underline">Ejemplos:</p>
          <ul className="list-inside list-disc font-light">
            <li>1, 3, 5 selecciona las páginas 1, 3 y 5. </li>
            <li>2-4 selecciona las páginas 2, 3 y 4.</li>
            <li>
              1, 4-6, 9 selecciona la página 1, las páginas 4 a 6 y la página 9.
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default ModalSplitInfo;
