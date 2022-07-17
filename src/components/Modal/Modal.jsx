import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    const handleEscClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onClose]);

  const handleMouseClickClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleMouseClickClose}>
      <ModalDiv>
        <img src={largeImageURL} alt={''} />
      </ModalDiv>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
