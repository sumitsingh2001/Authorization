import React from 'react';
import './style.scss';
import ReactDOM from 'react-dom';

interface modal {
  children?: React.ReactNode;
  onClose?: () => void;
}
interface overlay {
  children?: React.ReactNode;
  onClick?: () => void;
}
const portalElement = document.getElementById('portal');

const Modal = (props: modal) => {
  function handleOverlayClick() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <>
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay onClick={handleOverlayClick}>
            {props.children}
          </ModalOverlay>,
          portalElement
        )}
    </>
  );
};

export default Modal;

const ModalOverlay = (props: overlay) => {
  return (
    <>
      {
        <div className='overlay' {...props}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='itemss'>{props.children}</div>
          </div>
        </div>
      }
    </>
  );
};
