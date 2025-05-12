import ThumbLabel from './ThumbLabel';

const Thumb = ({ isLeft, leftLabel, rightLabel }) => {
  return (
    <div
      className={`z-10 h-11/12 w-1/2 items-center justify-center overflow-hidden rounded-full shadow-md transition-all duration-300 ${
        isLeft ? 'translate-x-0 bg-teal-500' : 'translate-x-full bg-red-600'
      }`}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <ThumbLabel
          className={
            isLeft ? 'font-semibold opacity-100 text-shadow-md' : 'opacity-0'
          }
        >
          {leftLabel}
        </ThumbLabel>
        <ThumbLabel
          className={
            isLeft ? 'opacity-0' : 'font-semibold opacity-100 text-shadow-md'
          }
        >
          {rightLabel}
        </ThumbLabel>
      </div>
    </div>
  );
};
export default Thumb;
