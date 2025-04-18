import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../utils/constants";
import "./PropertiesSection.css";
import axios from "axios";
import toast from "react-hot-toast";

const PropertiesSection = () => {
  // Sample properties data - in a real app, this would come from an API
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [assetTypeList, setAssetTypeList] = useState([]);

  const getAssetTypeName = (property) => {
    let assetTypeList = [];
    const assetTypeId = property?.asset_type;
    // Case 1: asset_type is present — find it in assetTypeList
    if (assetTypeId) {
      const matchingAsset = assetTypeList.find(
        (type) => type?.common_id === assetTypeId
      );
      return matchingAsset?.common_name || "N/A";
    }
    // Case 2: asset_type is empty — check property_type
    if (property?.property_type) {
      return property.property_type;
    }
    // Case 3: property_type is empty — check house
    if (property?.house) {
      return property.house;
    }
    // Case 4: Everything is empty
    return "N/A";
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const formData = new FormData();
      // formData.append("token", "bZkyA641WnCjEXRerI8Q7TGcw");
      // formData.append("login_id", "4146");
      formData.append("type", "property");
      formData.append("limit", "6");
      formData.append("offset", "0");

      try {
        const response = await axios.post(
          process.env.REACT_APP_FETCH_HOMEDATA_URL,
          formData,
          // {
          //   headers: {
          //     Cookie: "ci_session=c0s0m28kvkjnfokjp7f0qnovqthqb4tb", // Will be ignored in browser unless server sends cookie itself
          //   },
          // }
        );
        setLoading(false);
        setProperties(response.data?.data || []); // Adjust based on actual response shape
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Error fetching properties", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  // console.log(properties)

  // Helper function to get absolute URL for images
  const getImageUrl = (path) => {
    return `${process.env.PUBLIC_URL}${path}`;
  };

  return (
    <section className="properties-section">
      <div className="container">
        <h2 className="section-title">
          <span className="normal-text" style={{ color: "#575665" }}>
            New
          </span>{" "}
          <span className="highlight">Properties</span>
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-xl shadow p-4 space-y-4"
              >
                <div className="bg-gray-300 h-40 w-full rounded-lg" />
                <div className="h-4 bg-gray-300 rounded w-1/3" />
                <div className="h-5 bg-gray-300 rounded w-2/3" />
                <div className="flex space-x-2">
                  <div className="h-4 w-10 bg-gray-300 rounded" />
                  <div className="h-4 w-10 bg-gray-300 rounded" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-6 w-16 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <a href={`https://webapp.flippbidd.com/property/property-detail/${property?.common_id} `} target="_blank" rel="noopener noreferrer">

                <div className="property-card" key={property.common_id}>
                  <div className="property-image">
                    <img
                      src={
                        property.images[0]?.image_name
                          ? property.images[0]?.image_name
                          : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                      }
                      alt={property.type}
                    />
                  </div>
                  <div className="property-info">
                    <div className="property-category-wrapper">
                      <div className="property-category">
                        {property.sale_type ? property.sale_type : "N/A"}
                      </div>
                    </div>
                    <h3 className="property-title !mb-2">
                      {getAssetTypeName(property)}
                    </h3>
                    <div className="property-features">
                      <span className="feature">
                        <i className="fas fa-bed"></i> {property.bed_nos}
                      </span>
                      <span className="feature">
                        <img
                          src={getImageUrl(IMAGES.SHOWER_ICON)}
                          alt="Baths"
                          style={{
                            width: "19px",
                            height: "19px",
                            marginRight: "5px",
                          }}
                        />
                        {property.bath_nos}
                      </span>
                      <span className="feature">
                        <img
                          src={getImageUrl(IMAGES.SQUARE_FOOT_ICON)}
                          alt="Square Feet"
                          style={{
                            width: "14px",
                            height: "14px",
                            marginRight: "5px",
                          }}
                        />
                        {property.area ? property.area : property.bldgsize}{" "}
                        {property.area_measure}
                      </span>
                    </div>
                    <div className="property-address">
                      <img
                        src={getImageUrl(IMAGES.LOCATION_ICON)}
                        alt="Location"
                        style={{
                          width: "15px",
                          height: "15px",
                          marginRight: "5px",
                          marginTop: "2px",
                        }}
                      />
                      {property?.address ?? "N/A"}
                    </div>
                    <div className="property-actions">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://webapp.flippbidd.com/property/property-detail/${property?.common_id} `}
                        className="view-details-btn"
                      >
                        View Details
                      </a>
                      <div className="property-price">
                        <img
                          src={getImageUrl(IMAGES.DOLLAR_ICON)}
                          alt="Dollar"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                            marginTop: "2px",
                          }}
                        />
                        {property.rent_amount ? property.rent_amount : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="see-more-container">
          <Link to="/properties" className="see-more-btn">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
