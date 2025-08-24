import React, { useState, useRef, useEffect, use } from "react";
import "../assets/styles/UserListingCard.css";
import { useNotification } from "./context/NotificationContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'


export default function UserFavoriteListingCard({ listing }) {
  const [images, setImages] = useState([])
  const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn } = useNotification();
  const navigate = useNavigate();
  const listingCard = useRef();

  const token = localStorage.getItem("accessToken");
    let userId;
    if(token){
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    }

  const getImagesFunction = async () => {
    return await api.get(`/ListingImage/${listing.id}`);
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

  const removeFromFavoritesFunction = async(userId,listingId) => {
    return await api.delete(`/FavoriteListing/${userId}/${listingId}`)
  }

  const removeFromFavorites = async(listingId) => {
    setLoading(true);
      try {
        const response = await removeFromFavoritesFunction(userId,listingId);
        if(response.status == 200 || response.status == 201){
          showInfo("Elan sevimlilərdən çıxarıldı");
          listingCard.current.style.display = "none"
        }
      } catch (err) {
        if (err.response && err.response.data) {
          showError(err.response.data.message || "Xəta baş verdi!");
        } else {
          // showError("Xəta baş verdi!");
        }
      } finally {
        setLoading(false);
      }
  }
  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     if (menuRef.current && !menuRef.current.contains(e.target)) {
  //       setMenuOpen(false);
  //     }
  //   }
  //   if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
  //   else document.removeEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [menuOpen]);

  return (
    <div className="user-listing-card"  ref={listingCard}>
      <div className="card-img">
        <img
          src={images?.[0]?.imageUrl || "/placeholder.svg"}
          alt={listing.title}
        />
      </div>
      <div className="card-content">
        <div className="card-header">
            <div className="card-inner-header">
              <h4 className="card-title" style={{cursor:"pointer"}} onClick={() => navigate(`/rent-details/${listing.id}`)}>{listing.title}</h4>
            <p className="card-state">Durum:{listing.isActive ? <span className="card-active">Aktiv</span> : <span className="card-reviewing">Yoxlanılır</span>}</p>
            </div>
            <button
            onClick={() => removeFromFavorites(listing.id)}
      type="button"
      // onClick={onRemove}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        outline: "none",
      }}
      aria-label="Favoritdən çıxar"
    >
      {/* Qırmızı ürək ikonu (dolu) */}
      <svg
        width="20"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M16 29s-9.2-7.36-12.84-11.37C1.16 15.12 1 11.98 3.51 9.51A8.22 8.22 0 0 1 10.5 7c2.54 0 4.92 1.41 6.02 3.6C17.58 8.41 19.96 7 22.5 7a8.22 8.22 0 0 1 6.99 2.51c2.51 2.47 2.35 5.61-.65 8.12C25.2 21.64 16 29 16 29z"
          fill="#ef4444"
          stroke="#e11d48"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
            </button>
        </div>

        <div className="card-sub">
          <span>{listing.city}, {listing.district}</span>
          {/* <span>{listing.area} m²</span> */}
        </div>
        <div className="card-bottom">
          <span className="card-price">{listing.price} ₼/ay</span>

        </div>
      </div>
    </div>
  );
}