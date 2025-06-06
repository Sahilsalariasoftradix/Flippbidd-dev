import React, { useEffect, useRef, useState } from "react";
import { getDisplayArea, IMAGES } from "../../../utils/constants";
import "./PropertiesSection.css";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";

const PropertiesSection = ({ isLoaded }) => {
  // Sample properties data - in a real app, this would come from an API
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [assetTypeList, setAssetTypeList] = useState([]);
  const [streetViewAvailable, setStreetViewAvailable] = useState(true);

  const panoramaRef = useRef(null);

  const handleStreetViewLoad = (pano) => {
    panoramaRef.current = pano;

    if (isLoaded && pano) {
      pano.addListener("status_changed", () => {
        const isEmpty = pano.getLinks()?.length === 0;
        if (isEmpty) {
          setStreetViewAvailable(false);
        }
      });
    }
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
          `${process.env.REACT_APP_DEV_URL}/common/latest_six/property`,
          formData
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
            {properties.map((property) => {
            

              return (
                <a
                  href={`https://webapp.flippbidd.com/property/property-detail/${property?.common_id} `}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="property-card" key={property.common_id}>
                    <div
                      className={`${
                        property?.images?.length > 0
                          ? "property-image"
                          : "static-image property-image "
                      }`}
                    >
                      {property?.images?.length > 0 ? (
                        <img
                          src={
                            property.images[0]?.image_name
                              ? property.images[0]?.image_name
                              : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                          }
                          alt={property.type}
                        />
                      ) : isLoaded && streetViewAvailable ? (
                        <div
                          className={`rounded-top streetView`}
                          style={{ height: "200px" }}
                        >
                          <GoogleMap
                            mapContainerStyle={{
                              width: "100%",
                              height: "100%",
                            }}
                            center={{
                              lat: Number(property?.lat),
                              lng: Number(property?.lang),
                            }}
                            zoom={14}
                            options={{
                              streetViewControl: false,
                              fullscreenControl: false,
                              disableDefaultUI: true,
                            }}
                          >
                            <StreetViewPanorama
                              onLoad={handleStreetViewLoad}
                              options={{
                                position: {
                                  lat: Number(property?.lat),
                                  lng: Number(property?.lang),
                                },
                                visible: true,
                                pov: { heading: 100, pitch: 0 },
                                zoom: 1,
                                disableDefaultUI: true,
                                zoomControl: false,
                                showRoadLabels: false,
                                addressControl: false,
                                linksControl: false,
                                panControl: false,
                                fullscreenControl: false,
                              }}
                            />
                          </GoogleMap>
                        </div>
                      ) : (
                        <img
                          src={IMAGES.FLIPPBIDD_PLACEHOLDER}
                          alt={property.type}
                        />
                      )}
                    </div>
                    <div className="property-info">
                      <div className="property-category-wrapper">
                        <div className="property-category">
                          {property?.sale_type ? property?.sale_type : "N/A"}
                        </div>
                      </div>
                      <h3 className="property-title !mb-2">
                        {property?.asset_type_name ?? property?.property_type ?? property?.house ?? "N/A"}
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
                          {getDisplayArea(property)}
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
                        <p className="truncate">{property?.address ?? "N/A"}</p>
                      </div>
                      <div className="property-actions">
                        <button
                          // target="_blank"
                          // rel="noopener noreferrer"
                          // href={`https://webapp.flippbidd.com/property/property-detail/${property?.common_id} `}
                          className="view-details-btn"
                        >
                          View Details
                        </button>
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
                          <span className="mt-[5px]">
                            {property.rent_amount
                              ? property.rent_amount
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <div className="see-more-container">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_WEBAPP_URL}/new-properties`}
            className="see-more-btn"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
