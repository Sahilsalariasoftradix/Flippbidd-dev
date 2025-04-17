import React, { useState } from "react";
import "./SubmitProperty.css";
import { IMAGES } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  // Define Zod schemas for validation
  const sellerInfoSchema = z.object({
    sellerName: z.string().min(1, { message: "Seller Name is required" }),
    companyName: z.string().min(1, { message: "Company Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
  });

  const propertyInfoSchema = z.object({
    propertyAddress: z
      .string()
      .min(1, { message: "Property Address is required" }),
    cloudLink: z.string().optional(),
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

  const onPropertyInfoSubmit = (data) => {
    // Here you can use both sellerData and property data
    const completeFormData = {
      ...sellerData,
      ...data,
    };

    // You can log or send the complete data to your API
    console.log("Complete form data:", completeFormData);

    toast.success("Form submitted successfully!");
    resetPropertyForm();
    setCurrentView("sellerInfo");
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

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    // Release object URL to prevent memory leak
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

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
                              type="email"
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
                          <div className="form-group">
                            <label>
                              <i className="fas fa-phone-alt"></i>
                            </label>
                            <input
                              type="tel"
                              className={`form-control ${
                                sellerErrors.phone ? "!border-red-500" : ""
                              }`}
                              placeholder="Phone"
                              {...registerSeller("phone")}
                            />
                          </div>
                          {sellerErrors.phone && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
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
                            <input
                              type="text"
                              className={`form-control ${
                                propertyErrors.propertyAddress
                                  ? "!border-red-500"
                                  : ""
                              }`}
                              placeholder="Enter Your Property Address"
                              {...registerProperty("propertyAddress")}
                            />
                          </div>
                          {propertyErrors.propertyAddress && (
                            <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                              {propertyErrors.propertyAddress.message}
                            </div>
                          )}
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
                                  <option value="">Select Sale Type</option>
                                  <option>Contract Assignment</option>
                                  <option>Note</option>
                                  <option>REO</option>
                                  <option>Short Sale</option>
                                  <option>Straight Deal</option>
                                  <option>Subject To</option>
                                  <option>Wholesale</option>
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
                                  <option value="">Select Asset Type</option>
                                  <option>Single Family</option>
                                  <option>Multi Family</option>
                                  <option>Commercial</option>
                                  <option>Development</option>
                                  <option>Land</option>
                                  <option>Other</option>
                                </select>
                              </div>
                              {propertyErrors.assetType && (
                                <div className="text-red-500 mt-[-10px] mb-[5px] text-[13px] ">
                                  {propertyErrors.assetType.message}
                                </div>
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
                                  className="absolute inset-0 w-0 h-0 opacity-0 overflow-hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={handleFileChange}
                                  {...registerProperty("propertyImages")}
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
                              className="btn btn-primary-gradient"
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default SubmitProperty;
