"use client"

import { useState, useEffect } from "react";
import "../assets/styles/CreateListing.css";
import api from "../api";
import { useNotification } from "./context/NotificationContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "./BackArrow";
import { Helmet } from "react-helmet";
import imageCompression from 'browser-image-compression'

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
  const [errors, setErrors] = useState({})
  const [showLocationSection, setShowLocationSection] = useState(false)

  useEffect(() => {
    if(formData.city == "0"){
      setShowLocationSection(true)
    }else{
      setShowLocationSection(false);
    }
  },[formData.city])

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
  }

  if (!formData.district) {
    newErrors.district = "Rayon boş ola bilməz";
  } else if (formData.district.length > 50) {
    newErrors.district = "Rayon adı 50 simvoldan uzun olmamalıdır";
  }

  if (!formData.address) {
    newErrors.address = "Ünvan boş ola bilməz";
  }

  if(formData.city == "0"){
    if (formData.location === "") {
      newErrors.location = "Location boş ola bilməz";
    }
  }

  if (!formData.roomCount) {
    newErrors.roomCount = "Otaq sayı boş ola bilməz";
  } else if (isNaN(Number(formData.roomCount))) {
    newErrors.roomCount = "Otaq sayı rəqəm olmalıdır";
  } else if (Number(formData.roomCount) < 1) {
    newErrors.roomCount = "Otaq sayı 1-dən az ola bilməz";
  }

  if (!formData.onlyFor) {
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

  const token = localStorage.getItem("accessToken");
  let userId;
  if (token) {
    const decoded = jwtDecode(token);
    userId =
      decoded.id ||
      decoded.sub ||
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/ListingImage/${listingId}`);
        setFormData((prev) => ({
          ...prev,
          photos: response.data,
        }));
        
      } catch (err) {
        showError(err.response?.data?.message || "Xəta baş verdi!");
      } finally {
        setLoading(false);
      }
    };
    if (listingId) fetchImages();
  }, [listingId]);

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
          city: data.city,
          district: data.district || "",
          address: data.address || "",
          location: data.location ,
          roomCount: data.roomCount || "",
          onlyFor: Number(data.onlyFor) || "",
          area: data.area || "", 
        }));                
      } catch (err) {
        showError(err.response?.data?.message || "Xəta baş verdi!");
      } finally {
        setLoading(false);
      }
    };
    if (listingId) fetchListing();
  }, [listingId]);



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
  }, [listingId]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({})
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      onlyFor: e.target.value,
    }));
  };

  // const handleLocationChange = (e) => {
  //   setSelectedLocation(Number(e.target.value));
  //   setFormData((prev) => ({
  //     ...prev,
  //     location: Number(e.target.value),
  //   }));
  // };

  const handlePhotoUpload = async (e) => {
      setLoading(true)
    const files = Array.from(e.target.files)
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.3, 
          maxWidthOrHeight: 1280, 
          useWebWorker: true,
        }
        try {
          const compressedBlob = await imageCompression(file, options)
          const originalName = file.name
          const extension = originalName.split('.').pop()
          const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName
  
          const finalFile = new File(
            [compressedBlob],
            `${baseName}.${extension}`,
            { type: compressedBlob.type }
          )
          return finalFile
        } catch (error) {
          return file 
        }
        
      })
      
    )
  setLoading(false)
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...compressedFiles],
    }))
  }
  
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateListing()) return;

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
        navigate("/profile");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Elan yenilə</title>
      </Helmet>
      <BackArrow url={"/listings"} />
      <div className="create-listing">
        <div className="create-listing-container">
          <div className="create-listing-header">
            <h1>Elanı Yenilə</h1>
            <p>Məlumatları düzəldib yeniləyə bilərsiniz</p>
          </div>
          <form onSubmit={handleSubmit} className="listing-form">
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
                            : photo.imageUrl 
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
              {errors.photos && <div className="error">{errors.photos}</div>}
            </div>

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
                  <label htmlFor="location">Şəhər *</label>
                  <select
                    className="location-select"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value={null} selected disabled>Seç</option>
                    {cities.map((city, idx) => (
                      <option value={idx} key={idx}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <div className="error">{errors.city}</div>}
                </div>
                {/* <div className="form-group">
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

                </div> */}
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
                {showLocationSection && <div className="form-group">
                  <label htmlFor="location">Məkan *</label>
                  <select
                    className="location-select"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  >
                    <option value={null} selected disabled>Seç</option>
                    {locations.map((location, idx) => (
                      <option value={idx} key={idx}>
                        {location}
                      </option>
                    ))}
                  </select>
                  {errors.location && <div className="error">{errors.location}</div>}
                </div>}
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
                {errors.address && <div className="error">{errors.address}</div>}
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
                {errors.onlyFor && <div className="error">{errors.onlyFor}</div>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Elanı yenilə
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateListingComponent;