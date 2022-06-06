import s from './Button.module.css';
import PropTypes from 'prop-types';
const ButtonLoadMore = ({ incrementPage }) => (
  <button className={s['button']} type="button" onClick={incrementPage}>
    Load more
  </button>
);

export default ButtonLoadMore;

ButtonLoadMore.propTypes = {
  incrementPage: PropTypes.func.isRequired,
};
