"use client"

import { useState } from "react"
import "../assets/styles/rental-detail.css"
import Navigation from "./navigation"
import Footer from "./footer"

export default function RentalDetail() {
  const [selectedImage, setSelectedImage] = useState(0)

  const propertyImages = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  const propertyData = {
    title: "2 otaqlı ev, şəhərin mərkəzində",
    price: "800",
    currency: "AZN",
    period: "ayda",
    description:
      "Şəhərin mərkəzində yerləşən bu 2 otaqlı ev mükəmməl yaşayış üçün ideal seçimdir. Geniş və rahat otaqlar, modern təmir və əlverişli yerləşmə. Evdə bütün lazımi avadanlıqlar mövcuddur. Nəqliyyat əlçatanlığı yüksəkdir və ətraf infrastruktur zəngindir.",
    details: {
      rooms: "2",
      bathrooms: "1",
      area: "80 m²",
      floor: "3-cü mərtəbə",
    },
    additional: {
      age: "5 il",
      type: "Ev",
      buildingType: "Yeni tikili",
    },
  }

  const handleImageSelect = (index) => {
    setSelectedImage(index)
  }

  const handleRequest = () => {
    // Handle request logic
  }

  return (
    <div>
        <Navigation/>
        <div className="rental-detail">
      <div className="detail-container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img
              src={propertyImages[selectedImage] || "/placeholder.svg"}
              alt="Property main view"
              className="main-image-img"
            />
          </div>
          <div className="thumbnail-grid">
            {propertyImages.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => handleImageSelect(index)}
              >
                <img src={image || "/placeholder.svg"} alt={`Property view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="property-info">
          <h1 className="property-title">{propertyData.title}</h1>
          <div className="property-price">
            <span className="price-amount">
              {propertyData.price} {propertyData.currency}
            </span>
            <span className="price-period">/{propertyData.period}</span>
          </div>
          <p className="property-description">{propertyData.description}</p>
        </div>

        {/* Property Details */}
        <div className="property-details">
          <h2 className="section-title">Ev haqqında</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Otaqlar</span>
              <span className="detail-value">{propertyData.details.rooms}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Hamam otağı</span>
              <span className="detail-value">{propertyData.details.bathrooms}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Sahə</span>
              <span className="detail-value">{propertyData.details.area}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Qat</span>
              <span className="detail-value">{propertyData.details.floor}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <h2 className="section-title">Elavə</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Yaş</span>
              <span className="detail-value">{propertyData.additional.age}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tip</span>
              <span className="detail-value">{propertyData.additional.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Bina növü</span>
              <span className="detail-value">{propertyData.additional.buildingType}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="location-section">
          <h2 className="section-title">Location</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <svg className="map-icon" width="100" height="100" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
              <p className="map-text">Xəritə yüklənir...</p>
            </div>
          </div>
        </div>

        {/* Request Button */}
        <div className="request-section">
          <button className="request-button" onClick={handleRequest}>
            Req elə
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
