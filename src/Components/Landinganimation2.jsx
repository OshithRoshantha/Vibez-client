import PropTypes from 'prop-types';

ReviewCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
const GradientOverlay = ({ position }) => (
    <div
      className={`pointer-events-none absolute inset-y-0 ${position} w-1/3 bg-gradient-to-${
        position === "left" ? "r" : "l"
      } from-white dark:from-background`}
    ></div>
  );
  
  GradientOverlay.propTypes = {
    position: PropTypes.oneOf(['left', 'right']).isRequired,
  };
  <><><GradientOverlay position="left" /><GradientOverlay position="right" /></><img
    className="rounded-full"
    width="32"
    height="32"
    alt={`${name}'s profile picture`}
    src={img} /></>
