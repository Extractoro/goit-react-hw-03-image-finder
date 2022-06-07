import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, tags } = this.props;

    return createPortal(
      <div className={s['backdrop']} onClick={this.handleBackdropClose}>
        <div className={s['modal']}>
          <img className={s['modal-img']} src={largeImage} alt="" />
          <p className={s['modal-p']}>Description: {tags}</p>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
