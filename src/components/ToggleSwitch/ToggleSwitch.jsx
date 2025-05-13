import BackGroundLabels from './BackgroundLabels/BackGroundLabels';
import Thumb from './Thumb/Thumb';

const ToggleSwitch = ({
  isLeft = true,
  onToggle,
  leftLabel = 'Left',
  rightLabel = 'Right',
}) => {
  return (
    <div
      className="relative flex h-12 w-36 cursor-pointer items-center rounded-full bg-gray-300 p-2"
      onClick={onToggle}
      role="switch"
    >
      <Thumb isLeft={isLeft} leftLabel={leftLabel} rightLabel={rightLabel} />
      <BackGroundLabels
        isLeft={isLeft}
        leftLabel={leftLabel}
        rightLabel={rightLabel}
      />
    </div>
  );
};
export default ToggleSwitch;
