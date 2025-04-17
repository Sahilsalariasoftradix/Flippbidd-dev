import React from 'react';
import Modal from '../Modal/Modal';
import PhoneInput from 'react-phone-input-2';
import DatePicker from 'react-datepicker';
import 'react-phone-input-2/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import './VerifiedInvestorModal.css';
import { IMAGES } from '../../../utils/constants';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  profession: z.string().min(1, 'Please select a profession'),
  referralName: z.string().optional(),
  propertyAddress: z.string().min(1, 'Property address is required'),
  transactionDate: z.string().min(1, 'Transaction date is required'),
  purchasePrice: z.string().min(1, 'Purchase price is required'),
  soldPrice: z.string().min(1, 'Sold price is required'),
  areasOfInterest: z.string().min(1, 'Areas of interest is required'),
  aboutYourself: z.string().min(1, 'Please tell us about yourself'),
  socialMediaLinks: z.array(
    z.object({
      url: z.string().min(1, 'Social media URL is required')
    })
  )
});

const VerifiedInvestorModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      companyName: '',
      profession: '',
      referralName: '',
      propertyAddress: '',
      transactionDate: '',
      purchasePrice: '',
      soldPrice: '',
      areasOfInterest: '',
      aboutYourself: '',
      socialMediaLinks: [{ url: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialMediaLinks'
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      append({ url: '' });
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  // Profession options for the dropdown
  const professionOptions = [
    'Real Estate Agent',
    'Real Estate Broker',
    'Real Estate Investor',
    'Developer',
    'Property Manager',
    'Wholesaler',
    'Lender',
    'Other'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="verified-investor-modal">
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
            <div className='w-full'>

            <div className="form-group">
              <label htmlFor="name">
                <img src={IMAGES.GRADIENT_USER} alt="Person" className="icon" />
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className={`${errors.name ? '!border-red-500' : ''}`}
                {...register('name')}
              />
            </div>
              {errors.name && <p className="error-message-verified-investor">{errors.name.message}</p>}
            </div>
            <div className='w-full'>

            <div className="form-group">
              <label htmlFor="email">
                <img src={IMAGES.GRADIENT_MAIL} alt="Person" className="icon" />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`${errors.email ? '!border-red-500' : ''}`}
                {...register('email')}
              />
            </div>
              {errors.email && <p className="error-message-verified-investor">{errors.email.message}</p>}
            </div>
          </div>

          <div className="form-row">
         <div className='w-full'>
         <div className="form-group">
              <label htmlFor="phone">
                <i className="icon phone-icon"></i>
              </label>
              <PhoneInput
                country={'us'}
                inputProps={{
                  name: 'phone',
                  required: true,
                  placeholder: 'Phone'
                }}
                containerClass={`phone-container`}
                inputClass={`phone-input  ${errors.phone ? '!border-red-500' : ''}`}
                onChange={(value) => setValue('phone', value)}
              />
            </div>
              {errors.phone && <p className="error-message-verified-investor">{errors.phone.message}</p>}
         </div>

          <div className='w-full'>
          <div className="form-group">
              <label htmlFor="companyName">
                <img src="/images/png/building-fill.png" alt="Building" className="icon" />
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                className={`${errors.companyName ? '!border-red-500' : ''}`}
                {...register('companyName')}
              />
            </div>
              {errors.companyName && <p className="error-message-verified-investor">{errors.companyName.message}</p>}
          </div>
          </div>

          <div className="form-row">
          <div className='w-full'>

            <div className="form-group">
              <label htmlFor="profession">
                <img src="/images/png/person-profession-icon.png" alt="Profession" className="icon" />
              </label>
              <select
                id="profession"
                className={`${errors.profession ? '!border-red-500' : ''}`}
                {...register('profession')}
              >
                <option value="">Select Profession</option>
                {professionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
              {errors.profession && <p className="error-message-verified-investor">{errors.profession.message}</p>}
          </div>

          <div className='w-full'>
          <div className="form-group">
              <label htmlFor="referralName">
                <img src="/images/png/person-referral-icon.png" alt="Referral Name" className="icon" />
              </label>
              <input
                type="text"
                id="referralName"
                placeholder="Enter Referral Name"
                {...register('referralName')}
              />
            </div>

          </div>
          </div>

          {/* Social Media Links */}
          <div className="form-row">
            <div className="form-group social-media-group">
              <label htmlFor="socialMedia">
                <img src="/images/png/social-link-icon.png" alt="Social Media" className="icon" />
              </label>
              <input
                type="text"
                id="socialMedia"
                placeholder="Enter social media URL and press Enter"
                className={`${errors.socialMediaLinks ? '!border-red-500' : ''}`}
                onKeyPress={handleKeyPress}
                {...register(`socialMediaLinks.${fields.length - 1}.url`)}
              />
              <button type="button" className="more-btn" onClick={() => append({ url: '' })}>+ More</button>
            </div>
          </div>

          {fields.length > 1 && (
            <div className="grid grid-cols-2 gap-2">
              {fields.slice(0, -1).map((field, index) => (
                <div key={field.id} className="bg-slate-200 px-4 flex items-center py-2 gap-4 rounded-md">
                  <button type="button" onClick={() => remove(index)}><img src="/images/svg/delete.svg" alt="" /></button>
                  <input
                    type="text"
                    className='font-normal text-[14px] text-[#575665] text-start'
                    {...register(`socialMediaLinks.${index}.url`)}
                    disabled
                  />
                </div>
              ))}
            </div>
          )}

          {/* Property Information */}
          <div className="form-row">
          <div className='w-full'>
          <div className="form-group">
              <label htmlFor="propertyAddress">
                <img src="/images/png/location-icon.png" alt="Property Address" className="icon" />
              </label>
              <input
                type="text"
                id="propertyAddress"
                placeholder="Enter Property Address"
                className={`${errors.propertyAddress ? '!border-red-500' : ''}`}
                {...register('propertyAddress')}
              />
            </div>
              {errors.propertyAddress && <p className="error-message-verified-investor">{errors.propertyAddress.message}</p>}
          </div>
          </div>

          <div className="form-row">
            <div className='w-full'>

            <div className="form-group">
              <label htmlFor="transactionDate" className='z-10'>
                <img src="/images/png/calendar-2-fill.png" alt="Transaction Date" className="icon" />
              </label>
              <DatePicker
                id="transactionDate"
                selected={watch('transactionDate') ? new Date(watch('transactionDate')) : null}
                onChange={(date) => setValue('transactionDate', date ? date.toISOString().split('T')[0] : '')}
                dateFormat="MM/dd/yyyy"
                placeholderText="Enter Transaction Date"
                className={`w-full ${errors.transactionDate ? '!border-red-500' : ''}`}
                isClearable
                onClear={() => setValue('transactionDate', '')}
              />
            </div>
              {errors.transactionDate && <p className="error-message-verified-investor">{errors.transactionDate.message}</p>}
            </div>
            <div className='w-full'>
            <div className="form-group">
              <label htmlFor="purchasePrice">
                <img src="/images/png/money-dollar-circle-fill.png" alt="Purchase Price" className="icon" />
              </label>
              <input
                type="text"
                id="purchasePrice"
                placeholder="Enter Purchase Price"
                className={`${errors.purchasePrice ? '!border-red-500' : ''}`}
                {...register('purchasePrice')}
              />
            </div>
              {errors.purchasePrice && <p className="error-message-verified-investor">{errors.purchasePrice.message}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className='w-full'>

            <div className="form-group">
              <label htmlFor="soldPrice">
                <img src="/images/png/price-tag-3-fill.png" alt="Sold Price" className="icon" />
              </label>
              <input
                type="text"
                id="soldPrice"
                placeholder="Enter Sold Price"
                className={`${errors.soldPrice ? '!border-red-500' : ''}`}
                {...register('soldPrice')}
              />
            </div>
              {errors.soldPrice && <p className="error-message-verified-investor">{errors.soldPrice.message}</p>}
            </div>

           <div className='w-full'>
           <div className="form-group">
              <label htmlFor="areasOfInterest">
                <img src="/images/png/area-icon.png" alt="Areas Of Interest" className="icon" />
              </label>
              <input
                type="text"
                id="areasOfInterest"
                placeholder="Areas of Interest"
                className={`${errors.areasOfInterest ? '!border-red-500' : ''}`}
                {...register('areasOfInterest')}
              />
            </div>
              {errors.areasOfInterest && <p className="error-message-verified-investor">{errors.areasOfInterest.message}</p>}
           </div>
          </div>

          <div className="form-row">
          <div className='w-full'>
          <div className="form-group full-width">
              <label htmlFor="aboutYourself" className='!top-[22px]'>
                <img src="/images/png/note-write-icon.png" alt="About Yourself" className="icon" />
              </label>
              <textarea
                id="aboutYourself"
                placeholder="Tell us a little about yourself."
                className={`${errors.aboutYourself ? '!border-red-500' : ''}`}
                {...register('aboutYourself')}
                rows="3"
              ></textarea>
            </div>
              {errors.aboutYourself && <p className="error-message-verified-investor">{errors.aboutYourself.message}</p>}
          </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-button">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VerifiedInvestorModal; 