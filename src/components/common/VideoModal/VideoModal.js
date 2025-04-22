import React from 'react';
import Modal from '../Modal/Modal';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="video-modal">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
};

export default VideoModal; 