import React, { useState } from 'react';
import '../assets/styles/listing-detail.css';
// import logo from '../assets/logo.png'
import { useParams } from 'react-router-dom';
import { useNotification } from './context/NotificationContext';
import { useEffect } from 'react';
import api from '../api';
import NavigationAfterLogin from './NavigationAfterLogin';
import Navigation from './navigation';
import Footer from './footer';
import defaultProfile from "../assets/placeholder-user.jpg"
import { Helmet } from 'react-helmet';
const ListingDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [images, setImages] = useState([])
  const [userData, setUserData] = useState()
const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn } = useNotification();

  const {id} = useParams();


  const [property, setProperty] = useState()
  


     const getRentalFunction = async () => {
    return await api.get(`/Listing/${id}`);
  }


 useEffect(() => {
  const fetchListing = async () => {
    setLoading(true);
    try {
      const response = await getRentalFunction();
      setProperty(response.data);
      // fetchUser();
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
      } else {
        // showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchListing();
}, []);

  const getImagesFunction = async () => {
    return await api.get(`/ListingImage/${id}`);
  }
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getImagesFunction();
        setImages(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          showError(err.response.data.message || "Xəta baş verdi!");
        } else {
          // showError("Xəta baş verdi!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const getUserFunction = async () => {
    return await api.get(`/User/${property.userId}/name`);
  }
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUserFunction();
        setUserData(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          showError(err.response.data.message || "Xəta baş verdi!");
        } else {
          // showError("Xəta baş verdi!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser()
  },[property])
  
  

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = (index) => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
    <Helmet>
        <title>Elan haqqında</title>
      </Helmet>
    {isLoggedIn ? <NavigationAfterLogin/> : <Navigation/>}
    <div className="listing-detail">
      {/* Image Carousel */}
      <div className="carousel-container">
        <div className="carousel-main">
          <img 
            src={images[currentImageIndex]?.imageUrl || "/placeholder.svg"} 
            alt={`Property image ${currentImageIndex + 1}`}
            className="carousel-main-image"
            onClick={() => openFullscreen(currentImageIndex)}
          />
          <button className="carousel-btn carousel-prev" onClick={prevImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="carousel-btn carousel-next" onClick={nextImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="carousel-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
        
        <div className="carousel-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image?.imageUrl || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className={`carousel-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="listing-content">
        <div className="listing-main">
          <div className="listing-header">
            <h1 className="listing-title">{property?.title}</h1>
            <div className="listing-price">₼{property?.price} / ay</div>
          </div>

          <div className="listing-meta">
            <div className="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{property?.address}</span>
            </div>
            <div className="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{new Date(property?.createdAt).getUTCDate() + "/" +(new Date(property?.createdAt).getUTCMonth() +1) + "/" +new Date(property?.createdAt).getUTCFullYear()}</span>
              
            </div>
          </div>

          <div className="property-features">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="feature-details">
                  <span className="feature-label">Otaq sayı</span>
                  <span className="feature-value">{property?.roomCount} otaq</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="feature-details">
                  <span className="feature-label">Sahə</span>
                  <span className="feature-value">{property?.area} m²</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 15S4 9 8 9S12 15 12 15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 17L20 13" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 17H16V13" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="feature-details">
                  <span className="feature-label">Sadəcə</span>
                    <span className="feature-value">
                      {{
                        "0": "Oğlanlar üçün",
                        1: "Qızlar üçün",
                        2: "Həm oğlanlar, həm qızlar üçün"
                      }[property?.onlyFor] || "N/A"}
                    </span>
                </div>
              </div>

              {/* <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="feature-details">
                  <span className="feature-label">Təmir</span>
                  <span className="feature-value">Əla təmir</span>
                </div>
              </div> */}
            </div>
          </div>

          <div className="property-description">
            <h3>Təsvir</h3>
            <p>
              {property?.description}
            </p>
          </div>

          {/* <div className="property-amenities">
            <h3>İmkanlar</h3>
            <div className="amenities-grid">
              <div className="amenity-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Kondisioner</span>
              </div>
              <div className="amenity-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Internet</span>
              </div>
              <div className="amenity-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 1V4M15 20V23M1 15H4M20 15H23" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Paltaryuyan</span>
              </div>
              <div className="amenity-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 6H19L17 17H7L5 6Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 6L3 4H1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Soyuducu</span>
              </div>
              <div className="amenity-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2573 9.77251 19.9887C9.5799 19.7201 9.31074 19.5176 9 19.41C8.69838 19.2769 8.36381 19.2372 8.03941 19.296C7.71502 19.3548 7.41568 19.5095 7.18 19.74L7.12 19.8C6.93425 19.986 6.71368 20.1335 6.47088 20.2341C6.22808 20.3348 5.96783 20.3866 5.705 20.3866C5.44217 20.3866 5.18192 20.3348 4.93912 20.2341C4.69632 20.1335 4.47575 19.986 4.29 19.8C4.10405 19.6143 3.95653 19.3937 3.85588 19.1509C3.75523 18.9081 3.70343 18.6478 3.70343 18.385C3.70343 18.1222 3.75523 17.8619 3.85588 17.6191C3.95653 17.3763 4.10405 17.1557 4.29 16.97L4.35 16.91C4.58054 16.6743 4.73519 16.375 4.794 16.0506C4.85282 15.7262 4.81312 15.3916 4.68 15.09C4.55324 14.7942 4.34276 14.542 4.07447 14.3643C3.80618 14.1866 3.49179 14.0913 3.17 14.09H3C2.46957 14.09 1.96086 13.8793 1.58579 13.5042C1.21071 13.1291 1 12.6204 1 12.09C1 11.5596 1.21071 11.0509 1.58579 10.6758C1.96086 10.3007 2.46957 10.09 3 10.09H3.09C3.42099 10.0823 3.742 9.97512 4.01062 9.78251C4.27925 9.5899 4.48167 9.32074 4.59 9.01C4.72312 8.70838 4.76282 8.37381 4.704 8.04941C4.64519 7.72502 4.49054 7.42568 4.26 7.19L4.2 7.13C4.01405 6.94425 3.86653 6.72368 3.76588 6.48088C3.66523 6.23808 3.61343 5.97783 3.61343 5.715C3.61343 5.45217 3.66523 5.19192 3.76588 4.94912C3.86653 4.70632 4.01405 4.48575 4.2 4.3C4.38575 4.11405 4.60632 3.96653 4.84912 3.86588C5.09192 3.76523 5.35217 3.71343 5.615 3.71343C5.87783 3.71343 6.13808 3.76523 6.38088 3.86588C6.62368 3.96653 6.84425 4.11405 7.03 4.3L7.09 4.36C7.32568 4.59054 7.62502 4.74519 7.94941 4.804C8.27381 4.86282 8.60838 4.82312 8.91 4.69H9C9.29577 4.56324 9.54802 4.35276 9.72569 4.08447C9.90337 3.81618 9.99872 3.50179 10 3.18V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Qaz sobası</span>
              </div>
              <div className="amenity-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Lift</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="listing-sidebar">
          <div className="owner-card">
            <div className="owner-header">
              <img 
                src={defaultProfile} 
                alt="Owner avatar" 
                className="owner-avatar"
              />
              <div className="owner-info">
                <h4 className="owner-name">{userData?.fullName}</h4>
                {/* <div className="owner-rating">
                  <div className="stars">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="rating-text">5.0 (23 rəy)</span>
                </div> */}
                <div className="owner-status">
                  <span className="status-badge">Təsdiqlənmiş</span>
                  <span className="join-date">{new Date(userData?.createdAt).getFullYear()}-dən bəri</span>
                </div>
              </div>
            </div>
            
            {/* <div className="owner-stats">
              <div className="stat-item">
                <span className="stat-number">47</span>
                <span className="stat-label">Elan</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Cavab nisbəti</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2 saat</span>
                <span className="stat-label">Cavab müddəti</span>
              </div>
            </div> */}
          </div>

          <div className="contact-card">
            <h4>Əlaqə</h4>
            <div className="contact-buttons">
              <a href={`tel:994${userData?.phoneNumber}`} className="contact-btn primary" >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.3051 3.09849 2.44748 2.85669 2.63519 2.65162C2.8229 2.44655 3.05028 2.28271 3.30495 2.17052C3.55962 2.05833 3.83454 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51355 12.4135 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Zəng et
              </a>
              {/* <button className="contact-btn secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Mesaj göndər
              </button> */}
              <a href={`https://wa.me/994${userData?.phoneNumber}`}className="contact-btn secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60568 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                WhatsApp
              </a>
            </div>
            
            <div className="safety-tips">
              <h5>Təhlükəsizlik məsləhətləri</h5>
              <ul>
                <li>Şəxsən görüşün və mənzili yoxlayın</li>
                <li>Əvvəlcədən ödəniş etməyin</li>
                <li>Şübhəli təkliflərdən çəkinin</li>
              </ul>
            </div>
          </div>

          {/* <div className="similar-listings">
            <h4>Oxşar elanlar</h4>
            <div className="similar-item">
              <img src="/placeholder.svg?key=pwsi5" alt="Similar property" />
              <div className="similar-info">
                <h5>2 otaqlı mənzil</h5>
                <p>Nəsimi rayonu</p>
                <span className="similar-price">₼750/ay</span>
              </div>
            </div>
            <div className="similar-item">
              <img src="/placeholder.svg?key=hg48y" alt="Similar property" />
              <div className="similar-info">
                <h5>2 otaqlı mənzil</h5>
                <p>Yasamal rayonu</p>
                <span className="similar-price">₼900/ay</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="fullscreen-close" onClick={closeFullscreen}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <img 
              src={images[currentImageIndex].imageUrl || "/placeholder.svg"} 
              alt={`Property image ${currentImageIndex + 1}`}
              className="fullscreen-image"
            />
            <button className="fullscreen-nav fullscreen-prev" onClick={prevImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="fullscreen-nav fullscreen-next" onClick={nextImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="fullscreen-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/> 
    </>
  );
};

export default ListingDetail;
