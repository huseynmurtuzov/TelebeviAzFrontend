"use client"

import { useState, useEffect } from "react";
import "../assets/styles/CreateListing.css";
import api from "../api";
import { useNotification } from "./context/NotificationContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "./BackArrow";

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
  "Biləcəri"
];
const genders = ["Kişi", "Qadın", "Fərqi yoxdur"];

const UpdateListingComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    district: "",
    address: "",
    location:"",
    roomCount: "",
    onlyFor: "",
    area: "",
    photos: [],
  });
  // const [selectedLocation, setSelectedLocation] = useState("");
  const { setLoading, showError, showInfo } = useNotification();
  const navigate = useNavigate();
  const { id: listingId } = useParams();

  const token = localStorage.getItem("accessToken");
  let userId;
  if (token) {
    const decoded = jwtDecode(token);
    userId =
      decoded.id ||
      decoded.sub ||
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  // Elan məlumatını çək
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/Listing/${listingId}`);
        const data = response.data;
        setFormData((prev) => ({
          ...prev,
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          city: data.city || "",
          district: data.district || "",
          address: data.address || "",
          location: data.location || "",
          roomCount: data.roomCount || "",
          onlyFor: Number(data.onlyFor) || "",
          area: data.area || "",
          photos: [], 
        }));                
      } catch (err) {
        showError(err.response?.data?.message || "Xəta baş verdi!");
      } finally {
        setLoading(false);
      }
    };
    if (listingId) fetchListing();
    // eslint-disable-next-line
  }, [listingId]);



  // Şəkilləri çək
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/ListingImage/${listingId}`);
        setFormData((prev) => ({
          ...prev,
          photos: response.data || [],
        }));
        
      } catch (err) {
        showError(err.response?.data?.message || "Xəta baş verdi!");
      } finally {
        setLoading(false);
      }
    };
    if (listingId) fetchImages();
    // eslint-disable-next-line
  }, [listingId]);

  // Input dəyişiklikləri
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Radio dəyişiklikləri
  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      onlyFor: e.target.value,
    }));
  };

  // Location dəyiş
  // const handleLocationChange = (e) => {
  //   setSelectedLocation(Number(e.target.value));
  //   setFormData((prev) => ({
  //     ...prev,
  //     location: Number(e.target.value),
  //   }));
  // };

  // Şəkil yüklə
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  // Şəkil sil
  const removePhoto = async(photo,index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    if(!(photo instanceof File)){
      setLoading(true);
      try {
        const response = await api.delete(`/ListingImage/${photo.id}`);
        if(response.status == 200 || response.status == 201){
        }
      } catch (err) {
        showError(err.response?.data?.message || "Xəta baş verdi!");
      } finally {
        setLoading(false);
      }
    }
  };

  
  // Submit et
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendingFormData = new FormData();
      sendingFormData.append("title", formData.title);
      sendingFormData.append("description", formData.description);
      sendingFormData.append("price", parseFloat(formData.price));
      sendingFormData.append("city", formData.city);
      sendingFormData.append("district", formData.district);
      sendingFormData.append("address", formData.address);
      sendingFormData.append("location", formData.location);
      sendingFormData.append("roomCount", formData.roomCount);
      sendingFormData.append("area", parseInt(formData.area));
      sendingFormData.append("userId", parseInt(userId));
      sendingFormData.append("isActive", false);
      sendingFormData.append("listingView", 0);
      sendingFormData.append("onlyFor", formData.onlyFor);

      for (const file of formData.photos) {
        if (file instanceof File) {
          sendingFormData.append("images", file);
        }
      }


      const response = await api.patch(`/Listing/${listingId}`, sendingFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        showInfo("Elan yeniləndi");
        navigate("/listings");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BackArrow url={"/listings"} />
      <div className="create-listing">
        <div className="create-listing-container">
          <div className="create-listing-header">
            <h1>Elanı Yenilə</h1>
            <p>Məlumatları düzəldib yeniləyə bilərsiniz</p>
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
                      <img
                        src={
                          photo instanceof File
                            ? URL.createObjectURL(photo)
                            : photo.imageUrl || "/placeholder.svg"
                        }
                        alt={`Preview ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo,index)}
                        className="remove-photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                </div>
                <div className="form-group">
                  <label htmlFor="location">Məkan *</label>
                  <select
                    className="location-select"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Seç
                    </option>
                    {locations.map((location, idx) => (
                      <option value={idx} key={idx}>
                        {location}
                      </option>
                    ))}
                  </select>
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
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="form-section">
              <h2>Üstünlüklər</h2>
              <div className="form-group">
                <label>Yalnız kimə icarə verilir?</label>
                <div className="checkbox-group">
                  {genders.map((option,idx) => (
                    <label key={option} className="checkbox-label">
                      <input
                        type="radio"
                        name="onlyFor"
                        value={idx}
                        checked={formData.onlyFor == idx}
                        onChange={handleRadioChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                İlanı Dərc Et
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateListingComponent;