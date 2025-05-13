import FileIcon from '../../../svg/FileIcon';

const FileCover = ({ fileName, pagesCount }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-white">
      <h1 className="mt-6 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
        {fileName}
      </h1>
      <FileIcon className="h-[65%] w-[65%] text-neutral-700" />
      <p className="mb-6 text-lg font-light text-nowrap md:text-xl lg:text-2xl">{`${pagesCount} página${pagesCount !== 1 ? 's' : ''}`}</p>
    </div>
  );
};
export default FileCover;
