import React from "react";
import { IMAGES } from "../../utils/constants";
import "./SevenDayTrial.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Create validation schema with Zod
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  profession: z.string().min(1, "Please select a profession"),
  referralName: z.string().optional(),
  referralCode: z.string().optional(),
});

const SevenDayTrial = () => {
  // Set up React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      profession: "",
      referralName: "",
      referralCode: "",
    },
  });

  // Handle phone input changes
  const handlePhoneChange = (value) => {
    setValue("phone", value);
  };

  // Professions list for dropdown
  const professions = [
    { value: 1, name: "Real Estate Agent" },
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

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add API call here
  };

  return (
    <div className="seven-day-trial-page">
      {/* Main Trial Section */}
      <div className="seven-day-trial vertical">
        <div className="full-gradient-overlay"></div>

        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            <div className="d-flex align-items-center h-100">
              {/* Left side - Text content */}
              <div className="trial-text-content text-start">
                <h3 className="enjoy-text bg-gradient-to-r from-[#C830EB] via-[#C830EB] to-[#00ACDB] inline-block text-transparent bg-clip-text">
                  ENJOY A 7 DAY
                </h3>
                <div>
                <h2 className="free-trial-text bg-gradient-to-r from-[#003F79] via-[#003F79] to-[#00ACDB] inline-block text-transparent bg-clip-text">
                  FREE TRIAL
                </h2>
                </div>
                <p className="trial-description">
                  FlippBidd is a Real Estate Investment Application where
                  Investors, Wholesalers, Brokers, Acquisition and Disposition
                  specialists can Locate, Showcase and Discuss their Investment
                  Deals DIRECT!
                </p>
              </div>
            </div>{" "}
            {/* Right side - Request Trial Form */}
            <div className="flex justify-end">
              <div className="request-card custom-spacing">
                <h2>Request Trial</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group">
                    <img
                      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M16.6668 18.3333H3.3335V16.6667C3.3335 15.5616 3.77248 14.5018 4.55388 13.7204C5.33529 12.939 6.39509 12.5 7.50016 12.5H12.5002C13.6052 12.5 14.665 12.939 15.4464 13.7204C16.2278 14.5018 16.6668 15.5616 16.6668 16.6667V18.3333ZM10.0002 10.8333C9.34355 10.8333 8.69337 10.704 8.08675 10.4527C7.48012 10.2015 6.92892 9.83317 6.46463 9.36888C6.00034 8.90458 5.63204 8.35339 5.38076 7.74676C5.12949 7.14013 5.00016 6.48995 5.00016 5.83334C5.00016 5.17673 5.12949 4.52655 5.38076 3.91993C5.63204 3.3133 6.00034 2.7621 6.46463 2.29781C6.92892 1.83352 7.48012 1.46522 8.08675 1.21395C8.69337 0.962672 9.34355 0.833343 10.0002 0.833344C11.3262 0.833344 12.598 1.36013 13.5357 2.29781C14.4734 3.23549 15.0002 4.50726 15.0002 5.83334C15.0002 7.15943 14.4734 8.4312 13.5357 9.36888C12.598 10.3066 11.3262 10.8333 10.0002 10.8333V10.8333Z' fill='url(%23paint0_linear_10447_1088)'/><defs><linearGradient id='paint0_linear_10447_1088' x1='3.3335' y1='9.74843' x2='16.5308' y2='9.74843' gradientUnits='userSpaceOnUse'><stop stop-color='%23003F79'/><stop offset='0.9999' stop-color='%2300ACDB'/></linearGradient></defs></svg>"
                      alt="user"
                    />
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="Full Name"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-xs text-start -mt-1 mb-2 pl-1">{errors.fullName.message}</p>}

                  <div className="input-group">
                    <img
                      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M17.5002 15.8333H19.1668V17.5H0.833496V15.8333H2.50016V3.33333C2.50016 3.11232 2.58796 2.90036 2.74424 2.74408C2.90052 2.5878 3.11248 2.5 3.3335 2.5H11.6668C11.8878 2.5 12.0998 2.5878 12.2561 2.74408C12.4124 2.90036 12.5002 3.11232 12.5002 3.33333V15.8333H14.1668V7.5H16.6668C16.8878 7.5 17.0998 7.5878 17.2561 7.74408C17.4124 7.90036 17.5002 8.11232 17.5002 8.33333V15.8333ZM5.8335 9.16667V10.8333H9.16683V9.16667H5.8335ZM5.8335 5.83333V7.5H9.16683V5.83333H5.8335Z' fill='url(%23paint0_linear_10447_1531)'/><defs><linearGradient id='paint0_linear_10447_1531' x1='0.833496' y1='10.1415' x2='18.9798' y2='10.1415' gradientUnits='userSpaceOnUse'><stop stop-color='%23003F79'/><stop offset='0.9999' stop-color='%2300ACDB'/></linearGradient></defs></svg>"
                      alt="company"
                    />
                    <input
                      type="text"
                      {...register("companyName")}
                      placeholder="Company Name"
                    />
                  </div>
                  {errors.companyName && <p className="text-red-500 text-xs text-start -mt-1 mb-2 pl-1">{errors.companyName.message}</p>}

                  <div className="input-group">
                    <img
                      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M15.669 7.07751C16.4957 7.48012 17.432 7.59932 18.3332 7.41668V16.6667C18.3332 16.8877 18.2454 17.0997 18.0891 17.2559C17.9328 17.4122 17.7209 17.5 17.4998 17.5H2.49984C2.27882 17.5 2.06686 17.4122 1.91058 17.2559C1.7543 17.0997 1.6665 16.8877 1.6665 16.6667V3.33334C1.6665 3.11233 1.7543 2.90037 1.91058 2.74409C2.06686 2.58781 2.27882 2.50001 2.49984 2.50001H13.4165C13.3615 2.76918 13.3332 3.04834 13.3332 3.33334C13.3318 4.32339 13.6844 5.28131 14.3273 6.03418L10.0507 9.73584L4.70567 5.19834L3.62734 6.46834L10.0607 11.9308L15.669 7.07751ZM17.4998 5.83334C17.1715 5.83334 16.8464 5.76868 16.5431 5.64304C16.2398 5.51741 15.9642 5.33326 15.7321 5.10111C15.4999 4.86896 15.3158 4.59337 15.1901 4.29005C15.0645 3.98674 14.9998 3.66165 14.9998 3.33334C14.9998 3.00504 15.0645 2.67995 15.1901 2.37663C15.3158 2.07332 15.4999 1.79772 15.7321 1.56558C15.9642 1.33343 16.2398 1.14928 16.5431 1.02364C16.8464 0.898008 17.1715 0.833344 17.4998 0.833344C18.1629 0.833344 18.7988 1.09674 19.2676 1.56558C19.7364 2.03442 19.9998 2.6703 19.9998 3.33334C19.9998 3.99638 19.7364 4.63227 19.2676 5.10111C18.7988 5.56995 18.1629 5.83334 17.4998 5.83334Z' fill='url(%23paint0_linear_10447_110)'/><defs><linearGradient id='paint0_linear_10447_110' x1='1.6665' y1='9.32391' x2='19.8128' y2='9.32391' gradientUnits='userSpaceOnUse'><stop stop-color='%23003F79'/><stop offset='0.9999' stop-color='%2300ACDB'/></linearGradient></defs></svg>"
                      alt="email"
                    />
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs text-start -mt-1 mb-2 pl-1">{errors.email.message}</p>}

                  <div className="phone-input-container">
                    <PhoneInput
                      country={"us"}
                      value={register("phone").value}
                      onChange={handlePhoneChange}
                      containerClass="phone-input-wrapper"
                      inputClass="phone-input-field"
                      buttonClass="country-dropdown"
                      placeholder="Phone"
                      dropdownClass="country-dropdown-list"
                      enableSearch={true}
                      disableCountryCode={false}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs text-start -mt-1 mb-2 pl-1">{errors.phone.message}</p>}

                  <div className="input-group">
                    <img
                      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M9.16683 11.7183V16.6666H10.8335V11.7183C14.1218 12.1283 16.6668 14.9333 16.6668 18.3333H3.3335C3.33341 17.3874 3.5346 16.4523 3.92372 15.5902C4.31283 14.728 4.88096 13.9586 5.59034 13.3329C6.29973 12.7072 7.13414 12.2397 8.03814 11.9613C8.94214 11.6829 9.89503 11.6001 10.8335 11.7183V11.7183ZM10.0002 10.8333C7.23766 10.8333 5.00016 8.59581 5.00016 5.83331C5.00016 3.07081 7.23766 0.833313 10.0002 0.833313C12.7627 0.833313 15.0002 3.07081 15.0002 5.83331C15.0002 8.59581 12.7627 10.8333 10.0002 10.8333Z' fill='url(%23paint0_linear_10447_1308)'/><defs><linearGradient id='paint0_linear_10447_1308' x1='3.3335' y1='9.7484' x2='16.5308' y2='9.7484' gradientUnits='userSpaceOnUse'><stop stop-color='%23003F79'/><stop offset='0.9999' stop-color='%2300ACDB'/></linearGradient></defs></svg>"
                      alt="profession"
                    />
                    <select
                      {...register("profession")}
                    >
                      <option value="">Select Profession</option>
                      {professions.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.profession && <p className="text-red-500 text-start text-xs -mt-1 mb-2 pl-1">{errors.profession.message}</p>}

                  <div className="referral-container">
                    <div className="referral-group">
                      <div className="input-group">
                        <img
                          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M10.8335 11.7183V18.3333H3.3335C3.33341 17.3874 3.5346 16.4523 3.92372 15.5902C4.31283 14.728 4.88096 13.9586 5.59034 13.3329C6.29973 12.7072 7.13414 12.2397 8.03814 11.9613C8.94214 11.6829 9.89503 11.6001 10.8335 11.7183V11.7183ZM10.0002 10.8333C7.23766 10.8333 5.00016 8.59581 5.00016 5.83331C5.00016 3.07081 7.23766 0.833313 10.0002 0.833313C12.7627 0.833313 15.0002 3.07081 15.0002 5.83331C15.0002 8.59581 12.7627 10.8333 10.0002 10.8333ZM14.8277 16.595L17.7735 13.6491L18.9527 14.8275L14.8277 18.9525L11.881 16.0058L13.0602 14.8275L14.8268 16.595H14.8277Z' fill='url(%23paint0_linear_10447_697)'/><defs><linearGradient id='paint0_linear_10447_697' x1='3.3335' y1='10.0638' x2='18.7933' y2='10.0638' gradientUnits='userSpaceOnUse'><stop stop-color='%23003F79'/><stop offset='0.9999' stop-color='%2300ACDB'/></linearGradient></defs></svg>"
                          alt="referral"
                        />
                        <input
                          type="text"
                          {...register("referralName")}
                          placeholder="Referral Source"
                        />
                      </div>
                      <div className="input-group">
                        <img
                          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M2.49984 2.5H17.4998C17.7209 2.5 17.9328 2.5878 18.0891 2.74408C18.2454 2.90036 18.3332 3.11232 18.3332 3.33333V16.6667C18.3332 16.8877 18.2454 17.0996 18.0891 17.2559C17.9328 17.4122 17.7209 17.5 17.4998 17.5H2.49984C2.27882 17.5 2.06686 17.4122 1.91058 17.2559C1.7543 17.0996 1.6665 16.8877 1.6665 16.6667V3.33333C1.6665 3.11232 1.7543 2.90036 1.91058 2.74408C2.06686 2.5878 2.27882 2.5 2.49984 2.5V2.5ZM13.7198 12.9467L16.6665 10L13.7198 7.05333L12.5415 8.23333L14.3098 10L12.5415 11.7675L13.7198 12.9467V12.9467ZM5.68984 10L7.45817 8.2325L6.27984 7.05333L3.33317 10L6.27984 12.9467L7.45817 11.7667L5.68984 10ZM9.36984 14.1667L12.4032 5.83333H10.6298L7.5965 14.1667H9.36984Z' fill='url(%23paint0_linear_10447_1126)'/><defs><linearGradient id='paint0_linear_10447_1126' x1='1.6665' y1='10.1415' x2='18.1631' y2='10.1415' gradientUnits='userSpaceOnUse'><stop stop-color='%23003F79'/><stop offset='0.9999' stop-color='%2300ACDB'/></linearGradient></defs></svg>"
                          alt="code"
                        />
                        <input
                          type="text"
                          {...register("referralCode")}
                          placeholder="Code"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit">Send Request</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Packages Section - Now Horizontal */}
      <div className="trial-packages-section">
        <div className="package-container">
          <div className="webapp-package-card">
            <div className="package-header">
              <div className="package-title">
                <h3>WebApp Package</h3>
                <p>7 Day Trial</p>
              </div>
              <div className="package-price">
                <img
                  src={IMAGES.DOLLAR_CIRCLE}
                  alt="Free"
                  className="price-icon"
                />
              </div>
            </div>
            <div className="divider"></div>
            <div className="package-features">
              <div className="feature-item">
                <img src={IMAGES.TRIAL_CHECKBOX} alt="check" />
                <span>WebApp + PhoneApp Access</span>
              </div>
              <div className="feature-item">
                <img src={IMAGES.TRIAL_CHECKBOX} alt="check" />
                <span>Real Estate Networking</span>
              </div>
              <div className="feature-item">
                <img src={IMAGES.TRIAL_CHECKBOX} alt="check" />
                <span>National Leads Search</span>
              </div>
              <div className="feature-item">
                <img src={IMAGES.TRIAL_CHECKBOX} alt="check" />
                <span>Skiptracing and More...</span>
              </div>
            </div>
          </div>

          <div
            className="webapp-package-description"
            style={{
              backgroundImage: `url(${IMAGES.FREE_TRIAL_PACKAGE_IMAGE})`,
            }}
          >
            <h2>WebApp & PhoneApp for 7 Days of Full Access!</h2>
            <p>
              Explore Markets, Source Off-Market Deals, Find Investors, Search
              Lead Types and Network with our FlippBidd Community!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SevenDayTrial;
