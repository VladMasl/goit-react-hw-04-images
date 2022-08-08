import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalContainer = document.getElementById('modal');

function Modal({ ElementImgModal, onClose }) {
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleModalClose);
    return () => {
      const body = document.querySelector('body');
      body.style.overflow = 'auto';

      window.removeEventListener('keydown', handleModalClose);
    };
  });

  const handleModalClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const modalClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
      return;
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={modalClose}>
      <div className={s.Modal} onClick={handleModalClose}>
        <img src={ElementImgModal.largeImageURL} alt="" />
      </div>
    </div>,
    modalContainer
  );
}

Modal.propTypes = {
  ElementImgModal: PropTypes.object.isRequired,
};

export default Modal;
