import React, { useEffect } from 'react';
import './Modal.css';
import { IMAGES } from '../../../utils/constants';

const Modal = ({ isOpen, onClose, children, className }) => {
  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-container ${className || ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
        <img src={IMAGES.CLOSE_ICON} className='h-[14px] w-[14px]' alt="close" />
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 