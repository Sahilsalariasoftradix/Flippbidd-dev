import React, { useState, useEffect } from "react";
import "./PropertySearch.css";
import { IMAGES } from "../../utils/constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// eslint-disable-next-line
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schema
const propertySearchSchema = z.object({
  address: z.string().min(1, "Property address is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  profession: z.string().min(1, "Please select your profession"),
});

// Common function to get professions data
const getProfessionsData = () => {
  return [
    { id: 1, name: "Real Estate Agent" },
    { id: 2, name: "Real Estate Broker" },
    { id: 3, name: "Investor" },
    { id: 4, name: "Property Manager" },
    { id: 5, name: "Appraiser" },
    { id: 6, name: "Home Inspector" },
    { id: 7, name: "Mortgage Broker" },
    { id: 8, name: "Contractor" },
    { id: 9, name: "Developer" },
    { id: 10, name: "Other" },
  ];
};

const PropertySearch = () => {
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  // eslint-disable-next-line
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  // eslint-disable-next-line
  const [address, setAddress] = useState("");
  const professions = getProfessionsData();

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySearchSchema),
    defaultValues: {
      address: "",
      fullName: "",
      email: "",
      phone: "",
      profession: "",
    },
  });

  // Get the search address from localStorage if available
  useEffect(() => {
    const searchAddress = localStorage.getItem("searchAddress");
    if (searchAddress) {
      setValue("address", searchAddress);
      // Clear the localStorage after using it
      localStorage.removeItem("searchAddress");
    }
    // eslint-disable-next-line
  }, [setValue]);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onSubmit = (data) => {
    // Form is already validated by React Hook Form
    setToast({
      visible: true,
      message: "Form submitted successfully!",
      type: "success",
    });
    console.log("Form data:", data);
  };

  return (
    <div className="property-search ">
      {toast.visible && (
        <div
          className={`toast-notification ${toast.type} ${toast.visible ? "show" : ""
            }`}
        >
          {toast.message}
        </div>
      )}
      <img
        src={IMAGES.SEARCH_PROPERTY_BG}
        alt="Property Seaerch"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />

      <div className="container grid grid-cols-2 gap-20">
        <div className="non-editable">
          <div className="features-container !ml-0">
            <h1 className="get-free-title">GET FREE</h1>
            <p className="get-free-subtitle">
              Property Comps, ARV's and AVM's Direct to your Email.
              <br />
              Download FlippBidd For Additional
            </p>
            <ul className="features-list">
              <li className="feature-row custom-feature-row ">
                <img src={IMAGES.MULTI_GRADIENT_CHECKBOX} alt="check" />
                <span>Property Data</span>
              </li>
              <li className="feature-row custom-feature-row">
                <img src={IMAGES.MULTI_GRADIENT_CHECKBOX} alt="check" />
                <span>Ownership Data</span>
              </li>
              <li className="feature-row custom-feature-row">
                <img src={IMAGES.MULTI_GRADIENT_CHECKBOX} alt="check" />
                <span>Mortgage Data</span>
              </li>
              <li className="feature-row custom-feature-row">
                <img src={IMAGES.MULTI_GRADIENT_CHECKBOX} alt="check" />
                <span>Foreclosure Data</span>
              </li>
              <li className="feature-row custom-feature-row">
                <img src={IMAGES.MULTI_GRADIENT_CHECKBOX} alt="check" />
                <span>MLS Data</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="request-card">
          <div className="non-editable">
            <h2>Request Property Values</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <img src={IMAGES.GRADIENT_LOCATION} alt="location" />
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Enter Property Address"
                  className={errors.address ? "border-red-500" : ""}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-[-5px] text-start">
                  {errors.address.message}
                </p>
              )}
              <div className="input-group">
                <img src={IMAGES.GRADIENT_USER} alt="user" />
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Full Name"
                  className={errors.fullName ? "border-red-500" : ""}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-[-5px] text-start">
                  {errors.fullName.message}
                </p>
              )}
              <div className="input-group">
                <img src={IMAGES.GRADIENT_MAIL} alt="email" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className={errors.email ? "border-red-500" : ""}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-[-5px] text-start">
                  {errors.email.message}
                </p>
              )}
              <div className="phone-input-container">
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setValue("phone", value);
                  }}
                  containerClass={`phone-input-wrapper ${errors.phone ? "border-red-500" : ""
                    }`}
                  inputClass="phone-input-field"
                  buttonClass="country-dropdown"
                  placeholder="Phone"
                  dropdownClass="country-dropdown-list"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-[-5px] text-start">
                  {errors.phone.message}
                </p>
              )}
              <div className="input-group">
                <img src={IMAGES.GRADIENT_USER} alt="profession" />
                <select
                  {...register("profession")}
                  // value={profession}
                  // onChange={(e) => {
                  //   setProfession(e.target.value);
                  //   setValue('profession', e.target.value);
                  // }}
                  className={errors.profession ? "border-red-500" : ""}
                >
                  <option value="">Select Profession</option>
                  {professions.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.profession && (
                <p className="text-red-500 text-sm mt-[-5px] text-start">
                  {errors.profession.message}
                </p>
              )}
              <p>
                FlippBidd will send you the ARV High Values, Average values and
                Low values to your email.
              </p>
              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
