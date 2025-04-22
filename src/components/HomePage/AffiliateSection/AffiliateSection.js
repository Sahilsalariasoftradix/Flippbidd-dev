import React, { useState } from "react";
import AffiliateModal from "../../common/AffiliateModal/AffiliateModal";
import "./AffiliateSection.css";

const AffiliateSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const socialIcons = [
    {
      id: 1,
      name: "TikTok",
      image: "/images/png/tiktok_ic.png",
      link: "https://www.tiktok.com",
    },
    {
      id: 2,
      name: "Facebook",
      image: "/images/png/fb_ic.png",
      link: process.env.REACT_APP_FLIPPBID_FACEBOOK_URL,
    },
    {
      id: 3,
      name: "Messenger",
      image: "/images/png/massanger_ic.png",
      link: process.env.REACT_APP_FLIPPBID_FACEBOOK_URL,
    },
    {
      id: 4,
      name: "Instagram",
      image: "/images/png/instagram_ic.png",
      link: process.env.REACT_APP_FLIPPBID_INSTAGRAM_URL,
    },
    {
      id: 5,
      name: "WhatsApp",
      image: "/images/png/whats_app_ic.png",
      link: process.env.REACT_APP_FLIPPBID_WHATSAPP_URL,
    },
    {
      id: 6,
      name: "X",
      image: "/images/png/x_ic.png",
      link: process.env.REACT_APP_FLIPPBID_TWITTER_URL,
    },
  ];

  return (
    <section className="affiliate-section-wrapper">
      <div className="gradient-line"></div>
      <div className="affiliate-bg-container">
        <img
          src="/images/png/grow_community_bg.png"
          alt="Community Background"
          className="affiliate-bg-image"
        />
        {/* <div className="affiliate-overlay"></div> */}
        <section className="affiliate-section">
          <div className="container">
            <div className="affiliate-content">
              <div className="affiliate-text">
                <h2 className="affiliate-title">
                  Let's Grow our
                  <br />
                  Community Together
                </h2>
                <p className="font-semibold bg-gradient-to-r from-[#00ACDB] via-[#A6F0F7] to-[#FDE3FA] inline-block text-transparent bg-clip-text">
                  Inquire about our Affiliate Program Today.
                </p>

                <div className="flex gap-4 items-center">
                  <div className="affiliate-buttons">
                    <button
                      className="btn-become-affiliate"
                      onClick={openModal}
                    >
                      <p className="bg-gradient-to-r from-[#003F79] via-[#00ACDB] to-[#00ACDB] inline-block text-transparent bg-clip-text"> Become a FlippBidd Affiliate</p>
                    </button>
                  </div>

                  <a
                    href="mailto:LetsNetwork@FlippBidd.com"
                    className="btn-email h-[38px] border border-white border-solid"
                  >
                    <div>
                      <img src="/images/svg/mail_ic.svg" alt="Email" />
                    </div>
                    <a href="mailto:LetsNetwork@FlippBidd.com">LetsNetwork@FlippBidd.com</a>
                  </a>
                </div>
              </div>

              <div className="social-icons flex-col">
  {/* Top 3 icons */}
  <div className="top-icons flex gap-4 mb-4">
    {socialIcons.slice(0, 3).map((icon) => (
      <a
        key={icon.id}
        href={icon.link}
        className="social-icon-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="social-icon !shadow-none !h-[64px] !w-[64px]">
          <img src={icon.image} className="!h-[64px] !w-[64px]"  alt={icon.name} />
        </div>
      </a>
    ))}
  </div>

  {/* Remaining icons */}
  <div className="bottom-icons flex gap-4">
    {socialIcons.slice(3).map((icon) => (
      <a
        key={icon.id}
        href={icon.link}
        className="social-icon-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="social-icon !shadow-none !h-[64px] !w-[64px]">
          <img src={icon.image} className="!h-[64px] !w-[64px]" alt={icon.name} />
        </div>
      </a>
    ))}
  </div>
</div>

            </div>
          </div>
        </section>
      </div>

      {/* Affiliate Modal */}
      <AffiliateModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default AffiliateSection;
