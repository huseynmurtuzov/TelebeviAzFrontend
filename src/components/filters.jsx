"use client"

import { useState } from "react"
import "../assets/styles/filters.css"

export default function Filters() {
  const [selectedRooms, setSelectedRooms] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [amenities, setAmenities] = useState({
    furnished: false,
    petFriendly: false,
    utilitiesIncluded: false,
    parking: false,
  })

  const handleRoomSelect = (rooms) => {
    setSelectedRooms(selectedRooms === rooms ? null : rooms)
  }

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) => ({
      ...prev,
      [amenity]: !prev[amenity],
    }))
  }

  return (
    <div className="filters">
      <h2 className="filters-title">Filters</h2>

      <div className="filter-section">
        <h3 className="filter-label">Location</h3>
        <select className="location-select">
          <option value="">Select</option>
          <option value="downtown">Downtown</option>
          <option value="campus">Near Campus</option>
          <option value="suburbs">Suburbs</option>
        </select>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Price Range</h3>
        <p className="price-label">Price per month</p>
        <div className="price-range-container">
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="price-slider"
          />
          <div className="price-values">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Number of Rooms</h3>
        <div className="room-buttons">
          {[1, 2, 3, "4+"].map((room) => (
            <button
              key={room}
              className={`room-button ${selectedRooms === room ? "active" : ""}`}
              onClick={() => handleRoomSelect(room)}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Amenities</h3>
        <div className="amenities-list">
          <label className="amenity-item">
            <input type="checkbox" checked={amenities.furnished} onChange={() => handleAmenityChange("furnished")} />
            <span className="checkmark"></span>
            Furnished
          </label>
          <label className="amenity-item">
            <input
              type="checkbox"
              checked={amenities.petFriendly}
              onChange={() => handleAmenityChange("petFriendly")}
            />
            <span className="checkmark"></span>
            Pet-Friendly
          </label>
          <label className="amenity-item">
            <input
              type="checkbox"
              checked={amenities.utilitiesIncluded}
              onChange={() => handleAmenityChange("utilitiesIncluded")}
            />
            <span className="checkmark"></span>
            Utilities Included
          </label>
          <label className="amenity-item">
            <input type="checkbox" checked={amenities.parking} onChange={() => handleAmenityChange("parking")} />
            <span className="checkmark"></span>
            Parking
          </label>
        </div>
      </div>
    </div>
  )
}
