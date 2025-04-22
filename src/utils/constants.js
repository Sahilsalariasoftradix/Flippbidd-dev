// Color Constants
export const COLORS = {
  PRIMARY: '#0275d8',
  SECONDARY: '#5cb85c',
  WHITE: '#ffffff',
  BLACK: '#000000',
  LIGHT_GRAY: '#f8f9fa',
  DARK_GRAY: '#343a40',
  DEMO_TEXT: '#00ACDB',
  DEMO_BG: '#CCF1F7',
  GRADIENT_START: '#003F79',
  GRADIENT_END: '#00ACDB',
};
export const getDisplayArea = function(data) {
  const area = data?.area;
  const bldgSize = data?.bldgsize;

  if (area === '0' && (bldgSize === '0' || !bldgSize)) {
    return '0';
  } else if (area && area !== '0' && area !== '') {
    return area;
  } else if (bldgSize && bldgSize !== '0' && bldgSize !== '') {
    return bldgSize;
  } else {
    return 'N/A';
  }
};

// Image Paths
export const IMAGES = {
  LOGO: '/images/png/logo_ic.png',
  FOOTER_LOGO: '/images/svg/footer_logo_ic.svg',
  HOME_BG: '/images/png/home_img_bg.png',
  FEATURE_BG: '/images/png/new-bidd.png',
  POLYGON_BG: '/images/png/polygon-search.png',
  DEMO_PROPERTY_BG: '/images/png/demo_property_bg.png',
  BIG_FLIPPBIDD_IC: '/images/png/big_flippbidd_ic.png',
  DOLLAR_ICON: '/images/svg/dollor_ic.svg',
  BLUE_TICK: '/images/svg/blue_tick_ic.svg',
  GRADIENT_TICK: '/images/svg/gradient_tick_ic.svg',
  LEAD_ZOLO: '/images/svg/lead_zolo.svg',
  US_PROBATE: '/images/png/us_probate_leads_ic.png',
  VIDEO_CALL_BG: '/images/svg/vidio_call_bg.svg',
  APPLE_STORE: '/images/svg/apple_appstore_ic.svg',
  GOOGLE_PLAY: '/images/svg/google_playstore_ic.svg',
  SHOWER_ICON: '/images/png/shower_ic.png',
  SQUARE_FOOT_ICON: '/images/png/square_foot_ic.png',
  LOCATION_ICON: '/images/svg/location_ic.svg',
  MULTI_GRADIENT_CHECKBOX: '/images/png/mutli_gradient_check_box_ic.png',
  VERIFIED_INVESTOR_BG: '/images/png/verified_inspector_dummy_place_bg.png',
  FOOTER_BG: '/images/png/fotter_home_bg.png',
  FLIPPBIDD_PRO_BG: '/images/png/flippbidd_pro_service_bg.png',
  NATIONAL_LENDERS_BG: '/images/png/national_lender_bg.png',
  PERSON_ACHIEVEMENT: '/images/svg/person_achivement_ic.svg',
  NATIONAL_LENDER_ICON: '/images/svg/national_lender_saving_ic.svg',
  GRADIENT_MAIL: '/images/svg/gradient_mail_ic.svg',
  GRADIENT_LOCATION: '/images/svg/gradient_location_ic.svg',
  GRADIENT_USER: '/images/svg/gradient_user_ic.svg',
  GRADIENT_BUILDING: '/images/svg/building_ic.svg',
  GRADIENT_LINK_ICON: '/images/svg/link_ic.svg',
  AVAILABLE_STORE_BG: '/images/png/avaiable_store_bg.png',
  DOLLAR_CIRCLE: '/images/png/dollor_circle_ic.png',
  TRIAL_CHECKBOX: '/images/png/seven_day_trial_checkbox_ic.png',
  SEVEN_DAY_DUMMY_HOME_BG: '/images/png/seven_day_dummy_home_bg.png',
  SEVEN_DAY_FREE_TRIAL_BG: '/images/png/free_trail_package_image.png',
  CLOSE_ICON: '/images/svg/Close.svg',
  // Submit Property Images
  SEARCH_PROPERTY_BG: '/images/png/search_home_bg.png',
  SUBMIT_PROPERTY_BG: '/images/png/submit_propery_bg.png',
  UPLOAD_PROPERTY_BG: '/images/png/upload_property_bg.png',
  SELLER_INFO_CARD_BG: '/images/png/sell_info_card_first_bg.png',
  
  // Profile images for VerifiedInvestorModal
  PROFILE_1: '/images/profiles/profile1.png',
  PROFILE_2: '/images/profiles/profile2.png',
  PROFILE_3: '/images/profiles/profile3.png',
  DEFAULT_PROFILE: '/images/profiles/default-profile.png',
  FREE_TRIAL_PACKAGE_IMAGE: '/images/png/free_trail_package_image.png',
  GRADIENT_ASSET_TYPE: '/images/svg/gradient_asset_type.svg',
  GRADIENT_BATH: '/images/svg/gradient_bath_ic.svg',
  GRADIENT_BED: '/images/svg/gradient_bed_ic.svg',
  GRADIENT_SQ_FT: '/images/svg/gradient_sq_fit_ic.svg',
  GRADIENT_UPLOAD: '/images/svg/gradient_upload_ic.svg',
  AFFILIATE_BG: '/images/png/affiliate_bg.png',
  PROFESSION_ICON: '/images/svg/profession_ic.svg',
  REFER_USER_ICON: '/images/svg/refer_user_ic.svg',
  FOLLOWERS_ICON: '/images/svg/followers_ic.svg',
  WRITE_NOTE_ICON: '/images/svg/write_note_ic.svg',
  RECORD_ICON: '/images/svg/recorder.svg',
  PLAY_ICON: '/images/svg/play.svg',
  STOP_ICON: '/images/svg/stop.svg',
  PLAY_RECORD_ICON: '/images/svg/recordPlay.svg',
  DELETE_ICON: '/images/svg/dlt.svg',
  STATIC_WAVES: '/images/svg/staticWaves.svg',
  FLIPPBIDD_PLACEHOLDER: '/images/svg/PropertyPlaceholder.svg',

};

// Common Text
export const TEXT = {
  APP_NAME: 'FlippBidd',
  TAGLINE: 'Enter Address and get FREE Sales Comps & ARVs Instantly!',
  FREE_DOWNLOAD: 'Free to Download and Use',
  EXPOSURE_TITLE: 'GET NATIONAL EXPOSURE TO REAL ESTATE INVESTORS',
  FEATURES_TITLE: 'FlippBidd Key Features',
  POLYGON_TITLE: 'Polygon Lead Search',
};

// API Endpoints
export const API = {
  BASE_URL: 'https://api.flippbidd.com',
  // Add other API endpoints as needed
};

// Routes
export const ROUTES = {
  HOME: '/',
  SEVEN_DAY_TRIAL: '/seven-day-trial',
  PROPERTY_SEARCH: '/property-search',
  SUBMIT_PROPERTY: '/submit-property',
  BOOK_A_DEMO: '/book-a-demo',
  TERMS_OF_USE: '/termsofuse',
  PRIVACY_POLICY: '/privacypolicy',
  BILLING_TERMS: '/billing-terms',
  // Add other routes as needed
}; 