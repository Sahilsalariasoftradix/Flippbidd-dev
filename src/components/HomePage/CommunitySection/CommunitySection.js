import React, { useState } from 'react';
import VideoModal from '../../common/VideoModal/VideoModal';
import './CommunitySection.css';

const CommunitySection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sample testimonials data with YouTube video IDs
  const testimonials = [
    {
      id: 1,
      videoId: 'rSuP0kUpUp4',
      title: 'Real Estate Wholesaling and Networking'
    },
    {
      id: 2,
      videoId: 'UTex8-YvlDg',
      title: 'FlippBidd HOT $185M From Dec 2023'
    },
    {
      id: 3,
      videoId: 'zVlH1-5_mOg',
      title: 'Real Estate Wholesaling and Networking'
    },
    {
      id: 4,
      videoId: '5x0zx76UhmE',
      title: 'Real Estate Wholesaling and Networking'
    }
  ];

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const getYouTubeThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <section className="community-section">
      <div className="container">
        <h2 className="section-title">
          See what our <span className="highlight">FlippBidd</span> Community is Saying
        </h2>
        
        <div className="view-videos">
          <a href="/" className="view-videos-link">VIEW VIDEOS BELOW</a>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card"
              onClick={() => handleVideoClick(testimonial.videoId)}
            >
              <div className="testimonial-image-container">
                <img 
                  src={getYouTubeThumbnail(testimonial.videoId)} 
                  alt={testimonial.title} 
                  className="testimonial-image"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail if maxresdefault is not available
                    e.target.src = `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="play-button">
                  <i className="fas fa-play"></i>
                </div>
              </div>
              <p className="testimonial-title">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>

      <VideoModal 
        isOpen={!!selectedVideo}
        onClose={handleCloseVideo}
        videoId={selectedVideo}
      />
    </section>
  );
};

export default CommunitySection; 