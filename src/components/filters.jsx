"use client"

import { useEffect, useState } from "react"
import "../assets/styles/filters.css"
import api from "../api"
import { useNotification } from "./context/NotificationContext"

export default function Filters({sendDataToParent}) {
  
  
  const [selectedRooms, setSelectedRooms] = useState(null)
  const [selectedAreas, setSelectedAreas] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn,setListings,listings,currentPage } = useNotification();
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
    const [showLocationSection, setShowLocationSection] = useState(false)

    const pageSize = 4

    useEffect(() => {
    if(selectedCity == "0"){
      setShowLocationSection(true)
    }else{
      setShowLocationSection(false);
    }
  },[selectedCity])
  
  const [amenities, setAmenities] = useState({
    onlyGirls: false,
    onlyBoys: false,
  })
  const filterData = {
    selectedRooms:selectedRooms,
    selectedAreas:selectedAreas,
    priceRange:priceRange,
    selectedCity:selectedCity,
    selectedLocation:selectedLocation,
    amenities:amenities
  }
  const cities = [
  "Bakı",
  "Gəncə",
  "Sumqayıt",
  "Mingəçevir",
  "Şəki",
  "Lənkəran",
  "Naxçıvan",
  "Şamaxı",
  "Şirvan",
  "Quba",
  "Qusar",
  "Xaçmaz",
  "Zaqatala",
  "Qazax",
  "Tovuz",
  "Salyan",
  "Biləsuvar",
  "Sabirabad",
  "Cəlilabad",
  "Masallı",
  "Astara",
  "Göyçay",
  "İsmayıllı",
  "Qəbələ",
  "Ağcabədi",
  "Ağdaş",
  "Füzuli",
  "Bərdə",
  "Tərtər",
  "Kürdəmir",
  "Zərdab",
  "Ucar",
  "Goranboy",
  "Şəmkir",
  "Samux",
  "Göygöl",
  "Daşkəsən",
  "Balakən",
  "Oğuz",
  "Şabran",
  "Siyəzən",
  "Qobustan",
  "Abşeron",
  "Hacıqabul",
  "Ağstafa",
  "Yevlax",
  "Naftalan",
  "Lerik",
  "Yardımlı",
  "Sədərək",
  "Şərur",
  "Ordubad",
  "Culfa",
  "Babək"
];
  const locations = [
  "Yeni Yasamal",
  "Nəsimi",
  "Yasamal",
  "Nərimanov",
  "Səbail",
  "Xətai",
  "Binəqədi",
  "Qaradağ",
  "Suraxanı",
  "Sabunçu",
  "Nizami",
  "Xəzər",
  "Pirallahı",
  "20-ci sahə",
  "Əhmədli",
  "8-ci mikrorayon",
  "9-cu mikrorayon",
  "3-cü mikrorayon",
  "İnşaatçılar",
  "Gənclik",
  "Elmlər Akademiyası",
  "Memar Əcəmi",
  "Nəriman Nərimanov",
  "Xalqlar Dostluğu",
  "Neftçilər",
  "Qara Qarayev",
  "Azadlıq prospekti",
  "İçərişəhər",
  "Sahil",
  "Bayıl",
  "Badamdar",
  "Masazır",
  "Biləcəri",
  // "Xırdalan"
];

  const handleRoomSelect = (rooms) => {
    setSelectedRooms(selectedRooms === rooms ? null : rooms)
  }

  const handleAreaSelect = (areas) => {
    setSelectedAreas(selectedAreas === areas ? null : areas)
  }

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) => ({
      ...prev,
      [amenity]: !prev[amenity],
    }))
  }

  
  const handleFilterFunction = async () => {
    let min, max;
  if(selectedAreas){
    [min, max] = selectedAreas.split('-').map(Number);
  } else {
    min = null; 
    max = null;
  }
    return await api.get("/Listing/filteredListings",{
      params:{
        roomCount:selectedRooms,
        minArea:min,
        maxArea:max,
        minPrice:priceRange[0],
        maxPrice:priceRange[1],
        onlyGirls:amenities.onlyGirls,
        onlyBoys:amenities.onlyBoys,
        city:selectedCity,
        location:selectedLocation,
        page:currentPage,
        pageSize
       }
    });
  }
  const handleFilter = async () => {
    sendDataToParent(filterData)
    // setLoading(true);
    //   try {
    //     const response = await handleFilterFunction();
    //     setListings(response.data);
    //   } catch (err) {
    //     if (err.response && err.response.data) {
    //       showError(err.response.data.message || "Xəta baş verdi!");
    //     } else {
    //       // showError("Xəta baş verdi!");
    //     }
    //   } finally {
    //     setLoading(false);
    //   }

  }

  const handleFilterDelete = () => {
    setSelectedAreas(null)
    setSelectedLocation("")
    setSelectedCity("")
    setPriceRange([0,2000])
    setAmenities({onlyBoys:false,onlyGirls:false})
    setSelectedRooms(null)
  }

  return (
    <div className="filters">
      <div className="filters-header">
        <h2 className="filters-title">Filtrlər</h2>
         <button type="button" className="delete-filter-button" onClick={handleFilterDelete}>
            Filtrləri sil
         </button>
      </div>

<div className="filter-section">
        <h3 className="filter-label">Şəhər</h3>
        <select
    className="location-select"
    name="city"
    id="city"
    value={selectedCity}
    onChange={e => setSelectedCity(e.target.value)}
  >
    <option value="" disabled>Seç</option>
    {cities.map((city, idx) => (
      <option value={idx} key={idx}>
        {city}
      </option>
    ))}
  </select>
      </div>
      {showLocationSection && <div className="filter-section">
        <h3 className="filter-label">Məkan</h3>
        <select
    className="location-select"
    name="location"
    id="location"
    value={selectedLocation}
    onChange={e => setSelectedLocation(e.target.value)}
  >
    <option value="" disabled>Seç</option>
    {locations.map((location, idx) => (
      <option value={idx} key={idx}>
        {location}
      </option>
    ))}
  </select>
      </div>}
      

      <div className="filter-section">
        <h3 className="filter-label">Qiymət aralığı</h3>
        <p className="price-label">Aylıq kirayə qiyməti</p>
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
            <span>₼{priceRange[0]}</span>
            <span>₼{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Otaq sayı</h3>
        <div className="room-buttons">
          {["1", "2", "3","4","5+"].map((room) => (
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
        <h3 className="filter-label">Ev Sahəsi(m²)</h3>
        <div className="room-buttons">
          {["30-45", "45-70", "70-100", "100-150+"].map((aera) => (
            <button
              key={aera}
              className={`room-button ${selectedAreas === aera ? "active" : ""}`}
              style={{fontSize:"12px"}}
              onClick={() => handleAreaSelect(aera)}
            >
              {aera}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Cins</h3>
        <div className="amenities-list">
          <label className="amenity-item">
            <input type="checkbox" checked={amenities.onlyBoys  } onChange={() => handleAmenityChange("onlyBoys")} />
            <span className="checkmark"></span>
            Sadəcə oğlanlar
          </label>
          <label className="amenity-item">
            <input type="checkbox" checked={amenities.onlyGirls  } onChange={() => handleAmenityChange("onlyGirls")} />
            <span className="checkmark"></span>
            Sadəcə qızlar
          </label>
          {/* <label className="amenity-item">
            <input
              type="checkbox"
              checked={amenities.petFriendly}
              onChange={() => handleAmenityChange("petFriendly")}
            />
            <span className="checkmark"></span>
            Pet-Friendly
          </label> */}
          {/* <label className="amenity-item">
            <input
              type="checkbox"
              checked={amenities.utilitiesIncluded}
              onChange={() => handleAmenityChange("utilitiesIncluded")}
            />
            <span className="checkmark"></span>
            Utilities Included
          </label> */}
          {/* <label className="amenity-item">
            <input type="checkbox" checked={amenities.parking} onChange={() => handleAmenityChange("parking")} />
            <span className="checkmark"></span>
            Parking
          </label> */}
          <button type="button" className="yeni-elan-button" style={{marginTop:"10px"}} onClick={handleFilter}>
            Filtrləri tətbiq et
          </button>
        </div>
      </div>
    </div>
  )
}
