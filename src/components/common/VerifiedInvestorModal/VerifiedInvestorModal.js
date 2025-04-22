import React, { useState } from "react";
import Modal from "../Modal/Modal";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "./VerifiedInvestorModal.css";
import { IMAGES } from "../../../utils/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";

// Define validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .nonempty("Email address is required") // When the field is empty
    .email("Email address is invalid"), // When the field is not a valid email
  phone: z
    .string()
    .nonempty("Phone number is required")
    .min(7, "Phone number should be 7-15 digits"),
  companyName: z.string().min(1, "Company name is required"),
  profession: z.string().min(1, "Please select a profession"),
  referralName: z.string().optional(),
  propertyAddress: z.string().min(1, "Property address is required"),
  transactionDate: z.string().min(1, "Transaction date is required"),
  purchasePrice: z.string().min(1, "Purchase price is required"),
  soldPrice: z.string().min(1, "Sold price is required"),
  areasOfInterest: z.string().min(1, "Areas of interest is required"),
  aboutYourself: z.string().min(1, "Please tell us about yourself"),
  socialMediaLinks: z.array(
    z.object({
      url: z.string().url("Invalid URL").or(z.literal("")).optional(),
    })
  ),
});

const libraries = ["places"];

const VerifiedInvestorModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchBox, setSearchBox] = useState(null);
  const [address, setAddress] = useState("");
  const [isValidGoogleAddress, setIsValidGoogleAddress] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const ReadOnlyInput = React.forwardRef(
    ({ value, onClick, placeholder, className }, ref) => (
      <input
        type="text"
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        className={className}
        readOnly
        ref={ref}
      />
    )
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      profession: "",
      referralName: "",
      propertyAddress: "",
      transactionDate: "",
      purchasePrice: "",
      soldPrice: "",
      areasOfInterest: "",
      aboutYourself: "",
      socialMediaLinks: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMediaLinks",
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSocialMediaLink();
    }
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

  const onSubmit = async (data) => {
    if (!isValidGoogleAddress) {
      toast.error("Please select a valid address from the suggestions");
      return;
    }

    setIsLoading(true);
    try {
      // Format social media links array
      const socialLinks = data.socialMediaLinks
        .map((link) => link.url)
        .filter((url) => {
          // Filter out empty strings and validate URLs
          if (!url) return false;
          try {
            new URL(url); // This will throw an error if URL is invalid
            return true;
          } catch (e) {
            return false;
          }
        });

      const payload = {
        fullName: data.name,
        companyname: data.companyName,
        email: data.email,
        phone: data.phone,
        social_links: socialLinks,
        address: data.propertyAddress,
        transaction_date: data.transactionDate,
        purchase_price: data.purchasePrice,
        sold_price: data.soldPrice,
        area_of_interest: data.areasOfInterest,
        note: data.aboutYourself,
        profession: data.profession,
        referralsource: data.referralName,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/verified_investor/submit`,
        payload
      );

      if (response.data) {
        toast.success("Verified investor request submitted successfully!");
        onClose();
        reset();
        setAddress("");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit verified investor request. Please try again."
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

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setAddress(place.formatted_address);
        setValue("propertyAddress", place.formatted_address, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setIsValidGoogleAddress(true);
      }
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="verified-investor-modal"
    >
      <div className="modal-header-gradient">
        <div className="image-container">
          <img
            src="/images/png/investor_verified_image.png"
            alt="Verified Investor"
            className="investor-verified-image"
          />
        </div>
      </div>

      <div className="modal-content-wrapper">
        <h2 className="modal-title">
          <span className="title-colored">Verified Investor</span> Request
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="investor-form">
          <div className="form-row">
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="name">
                  <img
                    src={IMAGES.GRADIENT_USER}
                    alt="Person"
                    className="icon"
                  />
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className={`${errors.name ? "!border-red-500" : ""}`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="error-message-verified-investor">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="email">
                  <img
                    src={IMAGES.GRADIENT_MAIL}
                    alt="Person"
                    className="icon"
                  />
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className={`${errors.email ? "!border-red-500" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="error-message-verified-investor">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="icon phone-icon"></i>
                </label>
                <PhoneInput
                  country={"us"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    placeholder: "Phone",
                  }}
                  containerClass={`phone-container`}
                  inputClass={`phone-input  ${
                    errors.phone ? "!border-red-500" : ""
                  }`}
                  onChange={(value) =>
                    setValue("phone", value, {
                      shouldValidate: true,
                    })
                  }
                />
              </div>
              {errors.phone && (
                <p className="error-message-verified-investor">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="form-group">
                <label htmlFor="companyName">
                  <img
                    src="/images/svg/building-fill.svg"
                    alt="Building"
                    className="icon"
                  />
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company Name"
                  className={`${errors.companyName ? "!border-red-500" : ""}`}
                  {...register("companyName")}
                />
              </div>
              {errors.companyName && (
                <p className="error-message-verified-investor">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="profession">
                  <img
                    src="/images/svg/person.svg"
                    alt="Profession"
                    className="icon"
                  />
                </label>
                <select
                  id="profession"
                  className={`${errors.profession ? "!border-red-500" : ""}`}
                  {...register("profession")}
                >
                  <option value="">Select Profession</option>
                  {professionOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {errors.profession && (
                <p className="error-message-verified-investor">
                  {errors.profession.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="form-group">
                <label htmlFor="referralName">
                  <img
                    src="/images/svg/person-tick.svg"
                    alt="Referral Name"
                    className="icon"
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
          </div>

          {/* Social Media Links */}
          <div className="form-row">
            <div className="form-group social-media-group">
              <label htmlFor="socialMedia">
                <img
                  src="/images/svg/linking.svg"
                  alt="Social Media"
                  className="icon"
                />
              </label>
              <input
                type="text"
                id="socialMedia"
                placeholder="Enter social media URL and press Enter"
                className={`${
                  errors.socialMediaLinks ? "!border-red-500" : ""
                }`}
                onKeyPress={handleKeyPress}
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

          {/* Property Information */}
          <div className="form-row">
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="propertyAddress">
                  <img
                    src="/images/svg/location.svg"
                    alt="Property Address"
                    className="icon"
                  />
                </label>
                <div className="w-full">
                  <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                  >
                    <input
                      type="text"
                      id="propertyAddress"
                      placeholder="Enter Property Address"
                      className={`${
                        errors.propertyAddress ? "!border-red-500" : ""
                      }`}
                      {...register("propertyAddress")}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setValue("propertyAddress", e.target.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                  </StandaloneSearchBox>
                </div>
              </div>
              {errors.propertyAddress && (
                <p className="error-message-verified-investor">
                  {errors.propertyAddress.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="transactionDate" className="z-10">
                  <img
                    src="/images/svg/calender-new.svg"
                    alt="Transaction Date"
                    className="icon"
                  />
                </label>
                <DatePicker
                  id="transactionDate"
                  selected={
                    watch("transactionDate")
                      ? new Date(watch("transactionDate"))
                      : null
                  }
                  onChange={(date) =>
                    setValue(
                      "transactionDate",
                      date ? date.toISOString().split("T")[0] : "",
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    )
                  }
                  maxDate={new Date()}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select Transaction Date"
                  className={`w-full ${
                    errors.transactionDate ? "!border-red-500" : ""
                  }`}
                  isClearable
                  onClear={() => setValue("transactionDate", "")}
                  customInput={
                    <ReadOnlyInput
                      className={`w-full ${
                        errors.transactionDate ? "!border-red-500" : ""
                      }`}
                      placeholder="Select Transaction Date"
                    />
                  }
                />
              </div>
              {errors.transactionDate && (
                <p className="error-message-verified-investor">
                  {errors.transactionDate.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="purchasePrice">
                  <img
                    src="/images/svg/dolla.svg"
                    alt="Purchase Price"
                    className="icon"
                  />
                </label>
                <input
                  type="number"
                  id="purchasePrice"
                  placeholder="Enter Purchase Price"
                  className={`${errors.purchasePrice ? "!border-red-500" : ""}`}
                  {...register("purchasePrice")}
                />
              </div>
              {errors.purchasePrice && (
                <p className="error-message-verified-investor">
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="w-full">
              <div className="form-group">
                <label htmlFor="soldPrice">
                  <img
                    src="/images/svg/tag.svg"
                    alt="Sold Price"
                    className="icon"
                  />
                </label>
                <input
                  type="number"
                  id="soldPrice"
                  placeholder="Enter Sold Price"
                  className={`${errors.soldPrice ? "!border-red-500" : ""}`}
                  {...register("soldPrice")}
                />
              </div>
              {errors.soldPrice && (
                <p className="error-message-verified-investor">
                  {errors.soldPrice.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="form-group">
                <label htmlFor="areasOfInterest">
                  <img
                    src="/images/svg/intrest.svg"
                    alt="Areas Of Interest"
                    className="icon"
                  />
                </label>
                <input
                  type="text"
                  id="areasOfInterest"
                  placeholder="Areas of Interest"
                  className={`${
                    errors.areasOfInterest ? "!border-red-500" : ""
                  }`}
                  {...register("areasOfInterest")}
                />
              </div>
              {errors.areasOfInterest && (
                <p className="error-message-verified-investor">
                  {errors.areasOfInterest.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="w-full">
              <div className="form-group full-width">
                <label htmlFor="aboutYourself" className="!top-[22px]">
                  <img
                    src="/images/svg/kitab.svg"
                    alt="About Yourself"
                    className="icon"
                  />
                </label>
                <textarea
                  id="aboutYourself"
                  placeholder="Tell us a little about yourself."
                  className={`${errors.aboutYourself ? "!border-red-500" : ""}`}
                  {...register("aboutYourself")}
                  rows="3"
                ></textarea>
              </div>
              {errors.aboutYourself && (
                <p className="error-message-verified-investor">
                  {errors.aboutYourself.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-submit">
            <button
              type="submit"
              className={`submit-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VerifiedInvestorModal;
