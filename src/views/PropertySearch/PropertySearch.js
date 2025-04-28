import React, { useState, useEffect } from "react";
import "./PropertySearch.css";
import { IMAGES } from "../../utils/constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

// Define validation schema
const propertySearchSchema = z.object({
  address: z.string().min(1, "Property address is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email address."),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .min(7, "Phone number should be 7-15 digits"),
  profession: z.string().min(1, "Please select your profession"),
});

// Common function to get professions data
const getProfessionsData = () => {
  return [
    { id: 1, name: "Investor" },
    { id: 2, name: "Wholesaler" },
    { id: 4, name: "Realtor" },
    { id: 5, name: "Broker" },
    { id: 6, name: "Real Estate Specialist" },
    { id: 7, name: "Acquisitions Rep" },
    { id: 8, name: "Dispositions Rep" },
    { id: 12, name: "Real Estate Enthusiast" },
    { id: 13, name: "Academic Student" }
  ];
};

const PropertySearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [searchBox, setSearchBox] = useState(null);
  const [isValidGoogleAddress, setIsValidGoogleAddress] = useState(false);
  const professions = getProfessionsData();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setAddress(place.formatted_address);
        setValue("address", place.formatted_address, { shouldValidate: true });
        setIsValidGoogleAddress(true);
      }
    }
  };

  // Get the search address from localStorage if available
  useEffect(() => {
    const searchAddress = localStorage.getItem("searchAddress");
    if (searchAddress) {
      setAddress(searchAddress);
      setValue("address", searchAddress);
      setIsValidGoogleAddress(true);
      // Clear the localStorage after using it
      localStorage.removeItem("searchAddress");
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!isValidGoogleAddress) {
      toast.error("Please select a valid address from the suggestions");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        fullname: data.fullName,
        email: data.email,
        phone: data.phone,
        profession: data.profession,
        address: data.address,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/getcomps/property`,
        payload
      );

      if (response.data) {
        if (response.data.success === true) {
          toast.success(
            "Property data submitted successfully! We'll contact you soon."
          );
          reset(); // Reset form
          setPhone(""); // Reset phone input value
          setAddress("");
        } else {
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to submit property data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-search">
      <img
        src={IMAGES.SEARCH_PROPERTY_BG}
        alt="Property Search"
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

      <div className="container grid grid-cols-2 gap-20 !mt-[100px]">
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
              <div
                className={`input-group ${errors.address ? "!border-red-500" : ""
                  }`}
              >
                <img src={IMAGES.GRADIENT_LOCATION} alt="location" />
                <div className="w-full">
                  <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                  >
                    <input
                      type="text"
                      placeholder="Enter Property Address"
                      className={`w-full ${errors.address ? "!border-red-500" : ""
                        }`}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setValue("address", e.target.value, {
                          shouldValidate: true,
                        });
                        setIsValidGoogleAddress(false);
                      }}
                    />
                  </StandaloneSearchBox>
                </div>
              </div>
              {errors.address && (
                <p className="text-red-500 !text-xs mt-[-5px] text-start">
                  {errors.address.message}
                </p>
              )}
              <div
                className={`input-group ${errors.fullName ? "!border-red-500" : ""
                  }`}
              >
                <img src={IMAGES.GRADIENT_USER} alt="user" />
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 !text-xs mt-[-5px] text-start">
                  {errors.fullName.message}
                </p>
              )}
              <div
                className={`input-group ${errors.email ? "!border-red-500" : ""
                  }`}
              >
                <img src={IMAGES.GRADIENT_MAIL} alt="email" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className={errors.email ? "!border-red-500" : ""}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 !text-xs mt-[-5px] text-start">
                  {errors.email.message}
                </p>
              )}
              <div className="phone-input-container">
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setValue("phone", value, { shouldValidate: true });
                  }}
                  containerClass={`phone-input-wrapper`}
                  inputClass={` ${errors.phone ? "!border-red-500" : ""
                    } phone-input-field`}
                  buttonClass="country-dropdown"
                  placeholder="Phone"
                  dropdownClass="country-dropdown-list"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 !text-xs mt-[-5px] text-start">
                  {errors.phone.message}
                </p>
              )}
              <div
                className={`input-group ${errors.profession ? "!border-red-500" : ""
                  }`}
              >
                <img src={IMAGES.GRADIENT_USER} alt="profession" />
                <select
                  {...register("profession")}
                  className={errors.profession ? "!border-red-500" : ""}
                >
                  <option value="">Select Profession</option>
                  {professions.map((prof) => (
                    <option key={prof.id} value={prof.name}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.profession && (
                <p className="text-red-500 !text-xs mt-[-5px] text-start">
                  {errors.profession.message}
                </p>
              )}
              <p>
                FlippBidd will send you the ARV High Values, Average values and
                Low values to your email.
              </p>
              <button
                type="submit"
                className={isLoading ? "loading" : ""}
                disabled={isLoading}
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
