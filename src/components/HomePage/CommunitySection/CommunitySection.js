import React from 'react';
import { IMAGES } from '../../../utils/constants';
import './CommunitySection.css';

const CommunitySection = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      image: IMAGES.DEMO_PROPERTY_BG,
      title: 'Real Estate Wholesaling and Networking'
    },
    {
      id: 2,
      image: IMAGES.DEMO_PROPERTY_BG,
      title: 'FlippBidd HOT $185M From Dec 2023'
    },
    {
      id: 3,
      image: IMAGES.DEMO_PROPERTY_BG,
      title: 'Real Estate Wholesaling and Networking'
    },
    {
      id: 4,
      image: IMAGES.DEMO_PROPERTY_BG,
      title: 'Real Estate Wholesaling and Networking'
    }
  ];

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
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-image-container">
                <img src={testimonial.image} alt={testimonial.title} className="testimonial-image" />
                <div className="play-button">
                  <i className="fas fa-play"></i>
                </div>
              </div>
              <p className="testimonial-title">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection; 