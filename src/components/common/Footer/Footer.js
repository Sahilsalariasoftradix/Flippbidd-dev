import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { IMAGES, ROUTES } from "../../../utils/constants";
import "./Footer.css";
import toast from "react-hot-toast";

const newsletterSchema = z.object({
  email: z
    .string()
    .nonempty("Email address is required") // When the field is empty
    .email("Email address is invalid"), // When the field is not a valid email
});

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/email/submit`,
        {
          email: data.email,
        }
      );

      if (response.status === 200) {
        toast.success("Thank you for subscribing to our newsletter!");
        reset();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to subscribe. Please try again."
      );
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use inline style for the background image
  const footerBackgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}${IMAGES.FOOTER_BG})`,
    backgroundPosition: "bottom right",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: 0.5,
    zIndex: 0,
    pointerEvents: "none",
  };

  return (
    <footer className="footer">
      <div className="non-editable">
        <div className="footer-background" style={footerBackgroundStyle}></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo-section">
              <div className="logo">
                <Link to={ROUTES.HOME}>
                  <img
                    src={`${process.env.PUBLIC_URL}${IMAGES.FOOTER_LOGO}`}
                    alt="FlippBidd Logo"
                    className="logo-img"
                  />
                </Link>
              </div>
              <p className="footer-description">
                FlippBidd is the ultimate real estate investment platform,
                providing nationwide off-market leads, financial services, and
                data-driven insights to empower investors.
              </p>
              <div className="social-icons">
                <a
                  target="_blank"
                  href={process.env.REACT_APP_FLIPPBID_FACEBOOK_URL}
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                  style={{ backgroundColor: "#00ACDB", color: "white" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  target="_blank"
                  href={process.env.REACT_APP_FLIPPBID_LINKEDIN_URL}
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                  style={{ backgroundColor: "#00ACDB", color: "white" }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  target="_blank"
                  href={process.env.REACT_APP_FLIPPBID_INSTAGRAM_URL}
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                  style={{ backgroundColor: "#00ACDB", color: "white" }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  target="_blank"
                  href={process.env.REACT_APP_FLIPPBID_YOUTUBE_URL}
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="YouTube"
                  style={{ backgroundColor: "#00ACDB", color: "white" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
                {/* <a target='_blank' href={process.env.REACT_APP_FLIPPBID_TIKTOK_URL} rel="noopener noreferrer" className="social-icon" aria-label="TikTok" style={{ backgroundColor: '#00ACDB', color: 'white' }}>
                <i className="fab fa-tiktok"></i>
              </a> */}
              </div>
            </div>

            <div className="footer-links-section">
              <div className="quick-links">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.SEVEN_DAY_TRIAL}>7 Day Trial</Link>
                  </li>
                  <li>
                    <a
                      href={process.env.REACT_APP_FLIPPBID_CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a Demo
                    </a>
                  </li>
                  <li>
                    <Link to={ROUTES.SUBMIT_PROPERTY}>Submit Property</Link>
                  </li>
                </ul>
              </div>

              <div className="contact-info">
                <h3>Get in Touch</h3>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>New York, NY</p>
                </div>
                <div className="contact-item">
                  <i className="far fa-calendar-alt"></i>
                  <p>
                    <a
                      href={process.env.REACT_APP_FLIPPBID_CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {process.env.REACT_APP_FLIPPBID_CALENDLY_URL}
                    </a>
                  </p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <a href="tel:+18383683257">+1 838-368-3257</a>
                </div>
              </div>

              <div className="newsletter">
                <h3>Get our Weekly Email Updates</h3>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="newsletter-form"
                >
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="!text-black"
                    {...register("email")}
                  />
                  <button className={isLoading ? "loading" : ""} type="submit">
                    Send
                  </button>
                </form>
                {errors.email && (
                  <div className="text-red-500 text-xs -mt-4">
                    {errors.email.message}
                  </div>
                )}
                <div className="app-downloads">
                  <a
                    target="_blank"
                    href={process.env.REACT_APP_FLIPPBID_APPLE_STORE_URL}
                    rel="noopener noreferrer"
                    className="app-download-button"
                    aria-label="Download on App Store"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}${IMAGES.APPLE_STORE}`}
                      alt="Download on App Store"
                    />
                  </a>
                  <a
                    target="_blank"
                    href={process.env.REACT_APP_FLIPPBID_GOOGLE_PLAY_URL}
                    className="app-download-button"
                    rel="noopener noreferrer"
                    aria-label="Get it on Google Play"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}${IMAGES.GOOGLE_PLAY}`}
                      alt="Get it on Google Play"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>© Copyright {new Date().getFullYear()} FlippBidd App</p>
              <div className="footer-bottom-links">
                <Link to={ROUTES.TERMS_OF_USE}>Terms & Conditions</Link>
                <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
                <Link to={ROUTES.BILLING_TERMS}>
                  Cancellation & Refund Policy
                </Link>
              </div>
            </div>
            <div className="footer-bottom-right">
              <Link to="#">Contact Sales</Link>
              <Link to="#">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
