import React, { useState, useEffect } from "react";
import "./SubmitProperty.css";
import { IMAGES } from "../../utils/constants";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import toast from "react-hot-toast";
// import VoiceNote from "../../components/common/Audio/VoiceNote";

const libraries = ["places"];

// Define the FeatureListItem component
const FeatureListItem = ({ imageSrc, text }) => (
  <li className="feature-row custom-feature-row">
    <img src={imageSrc} alt="check" />
    <span>{text}</span>
  </li>
);

const SubmitProperty = () => {
  const [currentView, setCurrentView] = useState("sellerInfo");
  const [sellerData, setSellerData] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [address, setAddress] = useState("");
  const [searchBox, setSearchBox] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  // eslint-disable-next-line 
  const [hasDeletedAudio, setHasDeletedAudio] = useState(false);
  const [validPlaceSelected, setValidPlaceSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  console.log(audioFile);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setAddress(place.formatted_address);
        setValidPlaceSelected(true);
        setValue("propertyAddress", place.formatted_address, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  };

  // Define Zod schemas for validation
  const sellerInfoSchema = z.object({
    sellerName: z.string().min(1, { message: "Seller Name is required" }),
    companyName: z.string().min(1, { message: "Company Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    // phone: z
    //   .string()
    //   .regex(/^\d{11}$/, "Phone number must be 7-15 digits")
    //   .optional(),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .min(7, "Phone number should be 7-15 digits"),
  });
  const driveLinkRegex = /^(https?:\/\/)?(www\.)?(drive\.google\.com\/.+)$/;

  const propertyInfoSchema = z.object({
    propertyAddress: z
      .string()
      .min(1, { message: "Property Address is required" }),
    cloudLink: z
      .string()
      .regex(driveLinkRegex, "Invalid Google Drive URL")
      .or(z.literal("")) // allow empty string
      .optional(),
    saleType: z.string().min(1, { message: "Sale Type is required" }),
    propertyPrice: z.string().min(1, { message: "Property Price is required" }),
    beds: z.string().min(1, { message: "Number of Beds is required" }),
    baths: z.string().min(1, { message: "Number of Baths is required" }),
    totalSqFt: z.string().min(1, { message: "Total Sq Ft Area is required" }),
    assetType: z.string().min(1, { message: "Asset Type is required" }),
    propertyImages: z.any().optional(),
  });

  // Setup React Hook Form for seller info
  const {
    register: registerSeller,
    handleSubmit: handleSubmitSeller,
    formState: { errors: sellerErrors },
    reset: resetSellerForm,
    setValue,
  } = useForm({
    resolver: zodResolver(sellerInfoSchema),
    defaultValues: sellerData || {
      sellerName: "",
      companyName: "",
      email: "",
      phone: "",
    },
  });

  // Setup React Hook Form for property info
  const {
    register: registerProperty,
    handleSubmit: handleSubmitProperty,
    formState: { errors: propertyErrors },
    reset: resetPropertyForm,
  } = useForm({
    resolver: zodResolver(propertyInfoSchema),
    defaultValues: {
      propertyAddress: "",
      cloudLink: "",
      saleType: "",
      propertyPrice: "",
      beds: "",
      baths: "",
      totalSqFt: "",
      assetType: "",
    },
  });
  const [phone, setPhone] = useState("");
  const onSellerInfoSubmit = (data) => {
    // Store seller data separately
    setSellerData(data);
    // Reset property form to ensure no data leaks between forms
    resetPropertyForm();
    // Switch view
    setCurrentView("propertyInfo");
  };

  const handleBackClick = () => {
    // When going back, reset the seller form with stored data
    resetSellerForm(sellerData);
    setCurrentView("sellerInfo");
  };

  const onPropertyInfoSubmit = async (data) => {
    if (!validPlaceSelected) {
      toast.error("Please select a valid place");
      return;
    }
    try {
      setLoading(true);
      // Create FormData object
      const formData = new FormData();

      // Add seller info
      formData.append("seller_name", sellerData.sellerName);
      formData.append("company_name", sellerData.companyName);
      formData.append("email", sellerData.email);

      // Split phone into country code and number
      const phoneNumber = sellerData.phone;
      const countryCode = phoneNumber.substring(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.substring(phoneNumber.length - 10);

      formData.append("country_code", countryCode);
      formData.append("mobile_number", mobileNumber);

      // Add property info
      formData.append("address", data.propertyAddress);
      formData.append("gallery_link", data.cloudLink || "");
      formData.append("price", data.propertyPrice);
      formData.append("asset_type", data.assetType);
      formData.append("sale_type", data.saleType);
      formData.append("no_of_beds", data.beds);
      formData.append("no_of_baths", data.baths);
      formData.append("propery_area", data.totalSqFt);

      // Add static values
      formData.append("is_available_to_sell", "1");
      formData.append(
        "token",
        "STATIC_TOKEN_yyu673gb@!hjhxz@jjkah76wyggg378gyggmkjjd12sds@!knl"
      );

      // Get lat/lng from the Places API result
      if (searchBox) {
        const places = searchBox.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          formData.append("lat", lat.toString());
          formData.append("lang", lng.toString());
        }
      }

      // Add audio file if exists
      if (audioFile) {
        formData.append("audio_file", audioFile);
      }

      // Add images if any
      if (uploadedImages.length > 0) {
        uploadedImages.forEach((img, index) => {
          console.log("Appending image:", img.file.name); // Debug log
          formData.append("property_pic[]", img.file);
        });
      }

      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Make API call
      const response = await fetch(process.env.REACT_APP_CREATE_PROPERTY_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Property submitted successfully!");
        resetPropertyForm();
        setCurrentView("sellerInfo");
        setUploadedImages([]);
        setAudioSrc(null);
      } else {
        toast.error(result.message || "Failed to submit property");
      }
      resetPropertyForm();
      resetSellerForm();
      setPhone("");
      setLoading(false);
      setAudioFile(null);
      setAddress("");
    } catch (error) {
      console.error("Error submitting property:", error);
      toast.error("Failed to submit property. Please try again.");
      setLoading(false);
    }
  };

  const handleIntegerInput = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, "");
    e.target.value = filteredValue;
  };

  // File upload handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + uploadedImages.length > 2) {
      toast.error("Maximum 2 images allowed");
      return;
    }

    // Validate file types - only accept PNG, JPG, and JPEG
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Only PNG, JPG, and JPEG image formats are allowed");
      return;
    }

    // Log the files being processed
    console.log(
      "Files selected:",
      files.map((f) => f.name)
    );

    const newImages = files.map((file) => {
      console.log("Processing file:", file.name, "Type:", file.type); // Debug log
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });

    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    // Release object URL to prevent memory leak
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  // Add a useEffect to handle object URL creation and cleanup
  useEffect(() => {
    // Create object URL when audioFile changes
    if (audioFile) {
      const objectUrl = URL.createObjectURL(audioFile);
      setAudioSrc(objectUrl);

      // Cleanup function to revoke the URL when component unmounts or audioFile changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setAudioSrc(null);
    }
  }, [audioFile]);

  useEffect(() => {
    // Initialize audio recording
    async function setupRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        window.recordingStream = stream;
      } catch (err) {
        console.error("Error accessing microphone:", err);
        toast.error("Could not access microphone. Please check permissions.");
      }
    }

    // Set up recording when component mounts
    setupRecording();

    // Clean up when component unmounts
    return () => {
      if (window.recordingStream) {
        window.recordingStream.getTracks().forEach((track) => track.stop());
      }
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="submit-property-page"
      style={{
        background: `url(${IMAGES.SUBMIT_PROPERTY_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="non-editable">
        <div className="submit-property-hero">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-40">
              <div className="">
                <div className="upload-property-content !bg-transparent !p-0">
                  <div className="upload-property-title">
                    <img
                      className="w-[340px]"
                      src={IMAGES.UPLOAD_PROPERTY_BG}
                      alt="Upload Property"
                    />
                  </div>
                  <div className="property-description">
                    <p>
                      FlippBidd is a Real Estate Investment Application where
                      Investors, Wholesalers, Brokers, Acquisition and
                      Disposition specialists can Locate, Showcase and Discuss
                      their Investment Deals DIRECT!
                    </p>
                  </div>
                  <div className="property-features">
                    <ul className="features-list">
                      {[
                        "Download for free",
                        "Find off-market deals",
                        "Market Cash buyers",
                        "Request Contracts",
                        "Unlimited Property Data",
                        "Unlimited Calls & Emails",
                        "Direct Access to Contract Holders",
                        "Live Chat, Text and App Notifications",
                      ].map((feature, index) => (
                        <FeatureListItem
                          key={index}
                          imageSrc={IMAGES.MULTI_GRADIENT_CHECKBOX}
                          text={feature}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="seller-info-card">
                  <div className="seller-info-card-header">
                    <img
                      src="/images/png/sell_info_card_first_bg.png"
                      alt="Seller Info Card"
                      className="seller-info-top-image"
                    />
                  </div>

                  <div className="seller-info-form">
                    {currentView === "sellerInfo" ? (
                      <>
                        <h3>Seller Info</h3>
                        <form onSubmit={handleSubmitSeller(onSellerInfoSubmit)}>
                          <div className="form-group">
                            <label>
                              <img
                                src={IMAGES.GRADIENT_USER}
                                alt="user"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                sellerErrors.sellerName ? "!border-red-500" : ""
                              }`}
                              placeholder="Seller Name"
                              {...registerSeller("sellerName")}
                            />
                          </div>
                          {sellerErrors.sellerName && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                              {sellerErrors.sellerName.message}
                            </div>
                          )}
                          <div className="form-group">
                            <label>
                              <img
                                src={IMAGES.GRADIENT_BUILDING}
                                alt="company"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                sellerErrors.companyName
                                  ? "!border-red-500"
                                  : ""
                              }`}
                              placeholder="Company Name"
                              {...registerSeller("companyName")}
                            />
                          </div>
                          {sellerErrors.companyName && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                              {sellerErrors.companyName.message}
                            </div>
                          )}
                          <div className="form-group">
                            <label>
                              <img
                                src={IMAGES.GRADIENT_MAIL}
                                alt="mail"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                sellerErrors.email ? "!border-red-500" : ""
                              }`}
                              placeholder="Email"
                              {...registerSeller("email")}
                            />
                          </div>
                          {sellerErrors.email && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                              {sellerErrors.email.message}
                            </div>
                          )}
                          <div className="phone-input-container">
                            <PhoneInput
                              country={"us"}
                              value={phone}
                              onChange={(value) => {
                                setPhone(value);
                                setValue("phone", value, {
                                  shouldValidate: true,
                                });
                              }}
                              containerClass={`phone-input-wrapper`}
                              inputClass={` ${
                                sellerErrors.phone ? "!border-red-500" : ""
                              } phone-input-field`}
                              buttonClass="country-dropdown"
                              placeholder="Phone"
                              dropdownClass="country-dropdown-list"
                            />
                          </div>
                          {sellerErrors.phone && (
                            <div className="text-red-500 !mt-[-2px] !mb-[5px] text-[13px] ">
                              {sellerErrors.phone.message}
                            </div>
                          )}
                          <div className="form-group text-center">
                            <button
                              type="submit"
                              className="btn btn-primary-gradient next-btn"
                            >
                              Next
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <h3>Property Info</h3>
                        <form
                          onSubmit={handleSubmitProperty(onPropertyInfoSubmit)}
                        >
                          <div className="form-group">
                            <label>
                              <img
                                src={IMAGES.GRADIENT_BUILDING}
                                alt="company"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </label>
                            <div className="w-full">
                              <StandaloneSearchBox
                                onLoad={onLoad}
                                onPlacesChanged={onPlacesChanged}
                              >
                                <input
                                  type="text"
                                  className={`form-control ${
                                    propertyErrors.propertyAddress
                                      ? "!border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Enter Your Property Address"
                                  {...registerProperty("propertyAddress")}
                                  value={address}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                    setValidPlaceSelected(false);
                                    setValue(
                                      "propertyAddress",
                                      e.target.value,
                                      {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      }
                                    );
                                  }}
                                />
                              </StandaloneSearchBox>
                            </div>
                          </div>
                          {propertyErrors.propertyAddress && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                              {propertyErrors.propertyAddress.message}
                            </div>
                          )}
                          <div className="w-full">
                            <div className="form-group">
                              <label>
                                <img
                                  src={IMAGES.GRADIENT_LINK_ICON}
                                  alt="link"
                                  style={{ width: "20px", height: "20px" }}
                                />
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Cloud Link (Optional)"
                                {...registerProperty("cloudLink")}
                              />
                            </div>
                          </div>
                          {propertyErrors.cloudLink && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                              {propertyErrors.cloudLink.message}
                            </div>
                          )}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "10px",
                            }}
                          >
                            <div>
                              <div className="form-group">
                                <label>
                                  <img
                                    src={IMAGES.GRADIENT_ASSET_TYPE}
                                    alt="sale type"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </label>
                                <select
                                  className={`form-control !bg-transparent !py-[14px] ${
                                    propertyErrors.saleType
                                      ? "!border-red-500"
                                      : ""
                                  }`}
                                  {...registerProperty("saleType")}
                                >
                                  <option selected value="">
                                    Select Sale Type
                                  </option>
                                  <option
                                    data-sale_type="Contract Assignment"
                                    value="6"
                                  >
                                    Contract Assignment
                                  </option>
                                  <option data-sale_type="Note" value="4">
                                    Note
                                  </option>
                                  <option data-sale_type="REO" value="3">
                                    REO
                                  </option>
                                  <option data-sale_type="Short Sale" value="2">
                                    Short Sale
                                  </option>
                                  <option
                                    data-sale_type="Straight Deal"
                                    value="1"
                                  >
                                    Straight Deal
                                  </option>
                                  <option data-sale_type="Subject To" value="5">
                                    Subject To
                                  </option>
                                  <option data-sale_type="Wholesale" value="7">
                                    Wholesale
                                  </option>
                                </select>
                              </div>
                              {propertyErrors.saleType && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.saleType.message}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="form-group">
                                <label>
                                  <img
                                    src={IMAGES.DOLLAR_ICON}
                                    alt="dollar"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    propertyErrors.propertyPrice
                                      ? "!border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Enter Property Price"
                                  {...registerProperty("propertyPrice")}
                                  onInput={handleIntegerInput}
                                />
                              </div>
                              {propertyErrors.propertyPrice && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.propertyPrice.message}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="form-group">
                                <label>
                                  <img
                                    src={IMAGES.GRADIENT_BED}
                                    alt="bed"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    propertyErrors.beds ? "!border-red-500" : ""
                                  }`}
                                  placeholder="Enter no. of Beds"
                                  {...registerProperty("beds")}
                                  onInput={handleIntegerInput}
                                />
                              </div>
                              {propertyErrors.beds && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.beds.message}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="form-group">
                                <label>
                                  <img
                                    src={IMAGES.GRADIENT_BATH}
                                    alt="bath"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    propertyErrors.baths
                                      ? "!border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Enter no. of Baths"
                                  {...registerProperty("baths")}
                                  onInput={handleIntegerInput}
                                />
                              </div>
                              {propertyErrors.baths && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.baths.message}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="form-group">
                                <label>
                                  <img
                                    src={IMAGES.GRADIENT_SQ_FT}
                                    alt="sq ft"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    propertyErrors.totalSqFt
                                      ? "!border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Enter Total sq Ft. Area"
                                  {...registerProperty("totalSqFt")}
                                  onInput={handleIntegerInput}
                                />
                              </div>
                              {propertyErrors.totalSqFt && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.totalSqFt.message}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="form-group">
                                <label>
                                  <img
                                    src={IMAGES.GRADIENT_ASSET_TYPE}
                                    alt="asset type"
                                    style={{ width: "20px", height: "20px" }}
                                  />
                                </label>
                                <select
                                  className={`form-control !bg-transparent !py-[14px] ${
                                    propertyErrors.assetType
                                      ? "!border-red-500"
                                      : ""
                                  }`}
                                  {...registerProperty("assetType")}
                                >
                                  <option selected value="">
                                    Select Asset Type
                                  </option>
                                  <option
                                    data-asset_type="Single Family"
                                    value="4"
                                  >
                                    Single Family
                                  </option>
                                  <option
                                    data-asset_type="Multi Family"
                                    value="6"
                                  >
                                    Multi Family
                                  </option>
                                  <option data-asset_type="Mixed Use" value="7">
                                    Mixed Use
                                  </option>
                                  <option
                                    data-asset_type="Commercial"
                                    value="8"
                                  >
                                    Commercial
                                  </option>
                                  <option data-asset_type="Land" value="9">
                                    Land
                                  </option>
                                  <option data-asset_type="Other" value="11">
                                    Other
                                  </option>
                                  <option
                                    data-asset_type="Development"
                                    value="12"
                                  >
                                    Development
                                  </option>
                                  <option data-asset_type="Note" value="26">
                                    Note
                                  </option>
                                  <option data-asset_type="SFR" value="28">
                                    SFR
                                  </option>
                                  <option data-asset_type="MFR" value="29">
                                    MFR
                                  </option>
                                  <option data-asset_type="CONDO" value="30">
                                    CONDO
                                  </option>
                                  <option data-asset_type="MOBILE" value="31">
                                    MOBILE
                                  </option>
                                </select>
                              </div>
                              {propertyErrors.assetType && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.assetType.message}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="w-full mb-3">
                            <div className="audio-recorder-container border border-gray-300 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {/* <img
                                    src={IMAGES.RECORD_ICON}
                                    alt="audio"
                                 className="h-[30px] w-[30px]"
                                  /> */}
                                  <span className="text-[#777681]">
                                    {audioSrc
                                      ? "Audio Recording"
                                      : "Record Property Description"}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  {!audioSrc ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const mediaRecorder = new MediaRecorder(
                                          window.recordingStream
                                        );
                                        const chunks = [];

                                        mediaRecorder.ondataavailable = (e) => {
                                          chunks.push(e.data);
                                        };

                                        mediaRecorder.onstop = () => {
                                          const blob = new Blob(chunks, {
                                            type: "audio/webm",
                                          });
                                          const file = new File(
                                            [blob],
                                            "audio-message.webm",
                                            { type: "audio/webm" }
                                          );
                                          setAudioFile(file);
                                        };

                                        mediaRecorder.start();

                                        window.currentRecorder = mediaRecorder;
                                        document
                                          .getElementById("recording-status")
                                          .classList.remove("hidden");
                                        document
                                          .getElementById("start-recording")
                                          .classList.add("hidden");
                                        document
                                          .getElementById("stop-recording")
                                          .classList.remove("hidden");
                                      }}
                                      id="start-recording"
                                      className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-8 h-8"
                                    >
                                      <span className="material-icons text-lg">
                                        <img
                                          src={IMAGES.RECORD_ICON}
                                          alt="record"
                                        />
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const audioElement =
                                          document.getElementById(
                                            "recorded-audio"
                                          );
                                        if (audioElement.paused) {
                                          audioElement.play();
                                          document.getElementById(
                                            "play-pause-icon"
                                          ).innerHTML = `<img src="${IMAGES.PAUSE_ICON}" alt="pause" />`;
                                        } else {
                                          audioElement.pause();
                                          document.getElementById(
                                            "play-pause-icon"
                                          ).innerHTML = `<img src="${IMAGES.PLAY_ICON}" alt="play" />`;
                                        }
                                      }}
                                      className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-8 h-8"
                                    >
                                      <span
                                        className="material-icons text-lg"
                                        id="play-pause-icon"
                                      >
                                        <img
                                          src={IMAGES.PLAY_ICON}
                                          alt="play"
                                        />
                                      </span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    id="stop-recording"
                                    className="flex items-center justify-center bg-red-500 text-white rounded-full w-8 h-8 hidden"
                                    onClick={() => {
                                      if (window.currentRecorder) {
                                        window.currentRecorder.stop();
                                        document
                                          .getElementById("recording-status")
                                          .classList.add("hidden");
                                        document
                                          .getElementById("stop-recording")
                                          .classList.add("hidden");
                                        document
                                          .getElementById("start-recording")
                                          .classList.remove("hidden");
                                      }
                                    }}
                                  >
                                    <span className="material-icons text-lg">
                                      <img src={IMAGES.STOP_ICON} alt="stop" />
                                    </span>
                                  </button>

                                  {audioSrc && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setAudioFile(null);
                                        setAudioSrc(null);
                                        setHasDeletedAudio(true);
                                      }}
                                      className="flex items-center justify-center text-white rounded-full w-8 h-8"
                                    >
                                      <img
                                        src={IMAGES.DELETE_ICON}
                                        alt="delete"
                                      />
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div
                                id="recording-status"
                                className="flex items-center gap-2 mt-2 hidden"
                              >
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-red-500">
                                  Recording...
                                </span>
                              </div>

                              {audioSrc && (
                                <audio
                                  id="recorded-audio"
                                  src={audioSrc}
                                  className="hidden"
                                  onPlay={() => {
                                    document.getElementById(
                                      "play-pause-icon"
                                    ).innerHTML = `<img src="${IMAGES.STOP_ICON}" alt="pause" />`;
                                  }}
                                  onPause={() => {
                                    document.getElementById(
                                      "play-pause-icon"
                                    ).innerHTML = `<img src="${IMAGES.PLAY_ICON}" alt="play" />`;
                                  }}
                                  onEnded={() => {
                                    document.getElementById(
                                      "play-pause-icon"
                                    ).innerHTML = `<img src="${IMAGES.PLAY_ICON}" alt="play" />`;
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label></label>
                            <div className="w-full">
                              <div className=" border border-gray-300 rounded-lg p-6 text-center  relative">
                                <input
                                  type="file"
                                  id="property-images"
                                  name="property_pic[]"
                                  className="absolute inset-0 w-0 h-0 opacity-0 overflow-hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={handleFileChange}
                                />
                                <label
                                  htmlFor="property-images"
                                  className="flex flex-row gap-2 items-center cursor-pointer text-blue-500"
                                >
                                  <span className="text-2xl ">
                                    {" "}
                                    <img
                                      src={IMAGES.GRADIENT_UPLOAD}
                                      alt="upload"
                                      style={{ width: "20px", height: "20px" }}
                                    />
                                  </span>
                                  <span className="font-normal text-[#777681]">
                                    Upload Property Image
                                  </span>
                                </label>
                              </div>
                              <div className="text-gray-500 text-end text-xs mt-2">
                                Max 2 images
                              </div>

                              {uploadedImages.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {uploadedImages.map((img, index) => (
                                    <div
                                      key={index}
                                      className="w-24 h-24 relative rounded overflow-hidden"
                                    >
                                      <img
                                        src={img.preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        onClick={() => removeImage(index)}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className="form-group text-center"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span
                              style={{
                                width: "80px",
                                cursor: "pointer",
                                color: "#007bff",
                                textAlign: "left",
                              }}
                              onClick={handleBackClick}
                            >
                              &larr; Back
                            </span>
                            <button
                              type="submit"
                              className={`btn btn-primary-gradient ${
                                loading && "loading"
                              }`}
                              style={{ flexGrow: 1, marginLeft: "10px" }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProperty;
