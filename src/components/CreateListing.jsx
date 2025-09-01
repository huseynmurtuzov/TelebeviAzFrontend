"use client"

import { useState } from "react"
import "../assets/styles/CreateListing.css"
import api from "../api"
import { useNotification } from "./context/NotificationContext"
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import BackArrow from "./BackArrow"
import { Helmet } from "react-helmet"
const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    district: "",
    address: "",
    location: 0,
    roomCount: "",
    onlyFor: [],
    area: "",
    photos: [],
  })
  const [errors, setErrors] = useState({})
 const validateListing = () => {
  let newErrors = {};
  if (!formData.title) {
    newErrors.title = "Başlıq boş ola bilməz";
  } else if (formData.title.length > 100) {
    newErrors.title = "Başlıq 100 simvoldan uzun olmamalıdır";
  }

  if (!formData.description) {
    newErrors.description = "Açıqlama boş ola bilməz";
  }

  if (!formData.price) {
    newErrors.price = "Qiymət boş ola bilməz";
  } else if (isNaN(Number(formData.price))) {
    newErrors.price = "Qiymət rəqəm olmalıdır";
  } else if (Number(formData.price) < 1) {
    newErrors.price = "Qiymət 1-dən kiçik ola bilməz";
  }

  if (!formData.city) {
    newErrors.city = "Şəhər boş ola bilməz";
  } else if (formData.city.length > 50) {
    newErrors.city = "Şəhər adı 50 simvoldan uzun olmamalıdır";
  }

  if (!formData.district) {
    newErrors.district = "Rayon boş ola bilməz";
  } else if (formData.district.length > 50) {
    newErrors.district = "Rayon adı 50 simvoldan uzun olmamalıdır";
  }

  if (!formData.address) {
    newErrors.address = "Ünvan boş ola bilməz";
  }

  if (selectedLocation === "") {
  newErrors.location = "Location boş ola bilməz";
}

  if (!formData.roomCount) {
    newErrors.roomCount = "Otaq sayı boş ola bilməz";
  } else if (isNaN(Number(formData.roomCount))) {
    newErrors.roomCount = "Otaq sayı rəqəm olmalıdır";
  } else if (Number(formData.roomCount) < 1) {
    newErrors.roomCount = "Otaq sayı 1-dən az ola bilməz";
  }

  if (formData.onlyFor.length == 0) {
    newErrors.onlyFor = "Kim üçün olduğu seçilməlidir";
  }

  if (!formData.area) {
    newErrors.area = "Sahə boş ola bilməz";
  } else if (isNaN(Number(formData.area))) {
    newErrors.area = "Sahə rəqəm olmalıdır";
  } else if (Number(formData.area) < 1) {
    newErrors.area = "Sahə 1-dən az ola bilməz";
  }

  if(formData.photos.length > 10){
    newErrors.photos = "10-dan çox şəkil yükləmək olmaz"
  }

 
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  






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
const genders = ["Kişi", "Qadın", "Fərqi yoxdur"]
  const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn } = useNotification();
  const [selectedLocation, setSelectedLocation] = useState("")
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  let userId;
  if(token){
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors({})
  }

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      onlyFor: prev.onlyFor.includes(value) ? prev.onlyFor.filter((item) => item !== value) : [...prev.onlyFor, value],
    }))
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }))
  }

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }
  const handleSubmitFunction = async () => {
  const sendingformData = new FormData();

  sendingformData.append("title", formData.title);
  sendingformData.append("description", formData.description);
  sendingformData.append("price", parseFloat(formData.price));
  sendingformData.append("city", formData.city);
  sendingformData.append("district", formData.district);
  sendingformData.append("address", formData.address);
  sendingformData.append("location", selectedLocation); 
  sendingformData.append("roomCount", formData.roomCount);
  sendingformData.append("area", parseInt(formData.area));
  sendingformData.append("userId", parseInt(userId));
  sendingformData.append("isActive", false);
  sendingformData.append("listingView", 0);
  sendingformData.append("onlyFor", genders.indexOf(formData.onlyFor));

  for (const file of formData.photos) {
    sendingformData.append("images", file); 
  }

  return await api.post("/Listing", sendingformData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

  const handleSubmit =  async(e) => {
    e.preventDefault()
    if (!validateListing()) return;
    setLoading(true);
      try {
        const response = await handleSubmitFunction();
        if(response.status == 200 || response.status == 201){
            showInfo("Elan paylaşıldı");
            navigate("/profile")
        }
      } catch (err) {
        if (err.response && err.response.data) {
          showError(err.response.data.message || "Xəta baş verdi!");
        } else {
        }
      } finally {
        setLoading(false);


      }
  }


  return (
    <div>
       <Helmet>
        <title>Yeni elan yarat</title>
      </Helmet>
      <BackArrow url={"/listings"}/>
      <div className="create-listing">
      <div className="create-listing-container">
        <div className="create-listing-header">
          <h1>Yeni Elan Yarat</h1>
          <p>Mənzilinizi icarəyə vermək üçün aşağıdakı məlumatları doldurun</p>
        </div>

        <form onSubmit={handleSubmit} className="listing-form">
          {/* Photo Upload Section */}
          <div className="form-section">
            <h2>Şəkillər</h2>
            <div className="photo-upload-area">
              <input
                type="file"
                id="photos"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="photo-input"
              />
              <label htmlFor="photos" className="photo-upload-label">
                <div className="upload-icon">📷</div>
                <span>Şəkil əlavə et</span>
                <small>PNG, JPG formatında maksimum 10MB</small>
              </label>
            </div>

            {formData.photos.length > 0 && (
              <div className="photo-preview-grid">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="photo-preview">
                    <img src={URL.createObjectURL(photo) || "/placeholder.svg"} alt={`Preview ${index + 1}`} />
                    <button type="button" onClick={() => removePhoto(index)} className="remove-photo">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.photos && <div className="error">{errors.photos}</div>}
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h2>Əsas Məlumatlar</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="title">Elan Başlığı *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Məsələn: Şəhər mərkəzində 2 otaqlı mənzil"
                  required
                />
                {errors.title && <div className="error">{errors.title}</div>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Təsvir *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mənzilin xüsusiyyətlərini, ətraf mühiti və digər vacib məlumatları qeyd edin..."
                  rows="4"
                  required
                />
                {errors.description && <div className="error">{errors.description}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="price">Qiymət (AZN) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="500"
                  min="0"
                  required
                />
                {errors.price && <div className="error">{errors.price}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="area">Sahə (m²) *</label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="65"
                  min="1"
                  required
                />
                {errors.area && <div className="error">{errors.area}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="roomCount">Otaq Sayı *</label>
                <input
                  type="number"
                  id="roomCount"
                  name="roomCount"
                  value={formData.roomCount}
                  onChange={handleInputChange}
                  placeholder="2"
                  min="1"
                  max="10"
                  required
                />
                {errors.roomCount && <div className="error">{errors.roomCount}</div>}
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="form-section">
            <h2>Ünvan Məlumatları</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="city">Şəhər *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Bakı"
                  required
                />
                {errors.city && <div className="error">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="district">Rayon *</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Nəsimi"
                  required
                />
                {errors.district && <div className="error">{errors.district}</div>}
              </div>

              <div className="form-group">
  <label htmlFor="location">Məkan *</label>
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
  {errors.location && <div className="error">{errors.location}</div>}
</div>

              <div className="form-group full-width">
                <label htmlFor="address">Tam Ünvan *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Məsələn: Nizami küçəsi 123, mənzil 45"
                  required
                />
                {errors.address && <div className="error">{errors.address}</div>}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="form-section">
  <h2>Üstünlüklər</h2>
  <div className="form-group">
    <label>Yalnız kimə icarə verilir?</label>
    <div className="checkbox-group">
      {genders.map((option) => (
        <label key={option} className="checkbox-label">
          <input
            type="radio"
            name="onlyFor"
            value={option}
            checked={formData.onlyFor === option}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                onlyFor: e.target.value
              }))
            }
          />
          {/* <span className="checkbox-custom"></span> */}
          {option}
        </label>
      ))}
    </div>
    {errors.onlyFor && <div className="error">{errors.onlyFor}</div>}
  </div>
</div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Elanı Dərc Et
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateListing
