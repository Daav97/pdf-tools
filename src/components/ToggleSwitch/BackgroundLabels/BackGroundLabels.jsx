import Label from './Label';

const BackGroundLabels = ({ isLeft, leftLabel, rightLabel }) => {
  return (
    <div className="absolute box-border flex w-11/12 justify-between rounded-full text-sm font-semibold">
      <Label
        className={
          isLeft ? 'opacity-0 transition-opacity duration-200' : 'opacity-100'
        }
      >
        {leftLabel}
      </Label>
      <Label
        className={
          !isLeft ? 'opacity-0 transition-opacity duration-200' : 'opacity-100'
        }
      >
        {rightLabel}
      </Label>
    </div>
  );
};
export default BackGroundLabels;
