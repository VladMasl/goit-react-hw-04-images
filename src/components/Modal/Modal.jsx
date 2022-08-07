import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalContainer = document.getElementById('modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalClose);
  }

  handleModalClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  modalClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
      return;
    }
  };

  render() {
    const { ElementImgModal } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.modalClose}>
        <div className={s.Modal} onClick={this.handleModalClose}>
          <img src={ElementImgModal.largeImageURL} alt="" />
        </div>
      </div>,
      modalContainer
    );
  }
}

export default Modal;

Modal.propTypes = {
 
  ElementImgModal: PropTypes.object.isRequired,
};