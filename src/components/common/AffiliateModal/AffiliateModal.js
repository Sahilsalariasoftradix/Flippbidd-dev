import React, { useState } from "react";
import Modal from "../Modal/Modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./AffiliateModal.css";
import { IMAGES } from "../../../utils/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

const affiliateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .nonempty("Email address is required") // When the field is empty
    .email("Email address is invalid"), // When the field is not a valid email
    phone: z
    .string()
    .nonempty("Phone number is required")
    .min(7, "Phone number should be 7-15 digits"),
  companyName: z.string().optional(),
  profession: z.string().min(1, "Profession is required"),
  referralName: z.string().optional(),
  followersCount: z.string().min(1, "Followers count is required"),
  note: z.string().min(1, "Note is required"),
  socialMediaLinks: z.array(
    z.object({
      url: z.string().url("Invalid URL").or(z.literal("")).optional(),
    })
  ),
});

const AffiliateModal = ({ isOpen, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(affiliateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      profession: "",
      referralName: "",
      followersCount: "",
      note: "",
      socialMediaLinks: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMediaLinks",
  });

  const handlePhoneChange = (value) => {
    setValue("phone", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

  };
  const addSocialMediaLink = () => {
    const currentValue = watch(`socialMediaLinks.${fields.length - 1}.url`);

    // Don't add if empty
    if (!currentValue.trim()) {
      toast.error("Please enter a URL before adding");
      return;
    }

    // Validate URL format
    try {
      new URL(currentValue);
      append({ url: "" }); // Add new empty field only if current is valid
    } catch (e) {
      toast.error("Please enter a valid URL");
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSocialMediaLink();
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Format social media links array
      const socialLinks = data.socialMediaLinks
        .map((link) => link.url)
        .filter((url) => url !== "");

      const payload = {
        fullName: data.name,
        companyname: data.companyName,
        email: data.email,
        phone: data.phone,
        profession: data.profession,
        followers_count: data.followersCount,
        referralsource: data.referralName,
        code: "", // Since there's no code field in the form
        social_links: socialLinks,
        note: data.note,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/affiliated/submit`,
        payload
      );

      if (response.data) {
        toast.success("Affiliate request submitted successfully!");
        onClose();
      }
      reset();
      setValue("socialMediaLinks", [{ url: "" }]);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit affiliate request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Profession options for the dropdown
  const professionOptions = [
    "Real Estate Agent",
    "Real Estate Broker",
    "Real Estate Investor",
    "Developer",
    "Property Manager",
    "Wholesaler",
    "Lender",
    "Other",
  ];

  // Followers count options
  const followersOptions = [
    "0-500",
    "500-1000",
    "1000 - 5000",
    "5000-10000",
    "10000+",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="affiliate-modal">
      <img
        src={IMAGES.AFFILIATE_BG}
        alt="Affiliate Background"
        style={{ width: "auto", maxWidth: "100%" }}
      />
      <div className="modal-content-wrapper">
        <h2 className="modal-title">
          Become a <span className="title-colored">FlippBidd</span> Affiliate
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="affiliate-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <img
                  src={IMAGES.GRADIENT_USER}
                  alt="user"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <input
                className={`${errors.name ? "!border-red-500" : ""}`}
                type="text"
                id="name"
                placeholder="Name"
                {...register("name")}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <img
                  src={IMAGES.GRADIENT_MAIL}
                  alt="user"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <input
                type="email"
                className={`${errors.email ? "!border-red-500" : ""}`}
                id="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                <i className="icon phone-icon"></i>
              </label>
              <PhoneInput
                country={"us"}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phone",
                  required: true,
                  placeholder: "Phone",
                }}
                containerClass="phone-container"
                inputClass={`phone-input  ${
                  errors.phone ? "!border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="companyName">
                <img
                  src={IMAGES.GRADIENT_BUILDING}
                  alt="user"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                {...register("companyName")}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="profession">
                <img
                  src={IMAGES.PROFESSION_ICON}
                  alt="profession"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <select
                id="profession"
                {...register("profession")}
                className={`${errors.profession ? "!border-red-500" : ""}`}
              >
                <option value="">Select Profession</option>
                {professionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.profession && (
                <span className="error-message">
                  {errors.profession.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="referralName">
                <img
                  src={IMAGES.REFER_USER_ICON}
                  alt="referral"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <input
                type="text"
                id="referralName"
                placeholder="Enter Referral Name"
                {...register("referralName")}
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="form-row">
            <div className="form-group social-media-group">
              <label>
                <img
                  src={IMAGES.GRADIENT_LINK_ICON}
                  alt="user"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <input
                type="text"
                placeholder="Enter social media URL and press Enter"
                onKeyPress={(e) => handleKeyPress(e, fields.length)}
                {...register(`socialMediaLinks.${fields.length - 1}.url`)}
              />
              <button
                type="button"
                className="more-btn"
                onClick={addSocialMediaLink}
              >
                + More
              </button>
            </div>
          </div>

          {/* Display added social media links */}
          {fields.length > 1 && (
            <div className="grid grid-cols-2 gap-2">
              {fields.slice(0, -1).map((field, index) => (
                <div
                  key={field.id}
                  className="bg-slate-200 px-4 flex items-center py-2 gap-4 rounded-md"
                >
                  <button type="button" onClick={() => remove(index)}>
                    <img src="/images/svg/delete.svg" alt="" />
                  </button>

                  <input
                    type="text"
                    className="font-normal text-[14px] text-[#575665] text-start"
                    {...register(`socialMediaLinks.${index}.url`)}
                    disabled
                  />
                </div>
              ))}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="followersCount">
                <img
                  src={IMAGES.FOLLOWERS_ICON}
                  alt="followers"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
              <select
                className={`${errors.followersCount ? "!border-red-500" : ""}`}
                id="followersCount"
                {...register("followersCount")}
              >
                <option value="">Enter no. of Followers</option>
                {followersOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.followersCount && (
                <span className="error-message">
                  {errors.followersCount.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="note" className="!top-[22px]">
                <img
                  src="/images/svg/kitab.svg"
                  alt="About Yourself"
                  className="icon"
                />
              </label>
              <textarea
                id="note"
                className={`${errors.note ? "!border-red-500" : ""}`}
                placeholder="Write Note"
                rows="3"
                {...register("note")}
              ></textarea>
              {errors.note && (
                <span className="error-message">{errors.note.message}</span>
              )}
            </div>
          </div>

          <div className="form-submit">
            <button
              type="submit"
              className={`submit-button !w-[40%] ${
                isLoading ? " loading" : ""
              }`}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AffiliateModal;
