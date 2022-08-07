import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ cbOnClick }) => {
  return (
    <button className={s.Button} type="button" onClick={cbOnClick}>
      More
    </button>
  );
};

export default Button;

Button.propTypes = {
  cbOnClick: PropTypes.func.isRequired,
};
