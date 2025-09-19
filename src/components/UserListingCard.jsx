import React, { useState, useRef, useEffect, use } from "react";
import "../assets/styles/UserListingCard.css";
import { useNotification } from "./context/NotificationContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
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
export default function UserListingCard({ listing, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const [images, setImages] = useState([])
    const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn } = useNotification();
  const navigate = useNavigate();

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="user-listing-card"  >
      <div className="card-img">
        <img
          src={images?.[0]?.imageUrl || "/placeholder.svg"}
          alt={listing.title}
        />
      </div>
      <div className="card-content">
        <div className="card-header">
            <div className="card-inner-header">
              <h4 className="card-title" style={{cursor:"pointer"}} onClick={() => navigate(`/rent-details/${listing.id}`)}>{listing.title.slice(0,12)}</h4>
            <p className="card-state">Durum:{listing.isActive ? <span className="card-active">Aktiv</span> : <span className="card-reviewing">Yoxlanılır</span>}</p>
            </div>
          <div className="card-menu" ref={menuRef}>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="More Options"
            >
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </button>
            {menuOpen && (
              <div className="menu-dropdown">
                <button onClick={() => { setMenuOpen(false); onEdit(listing); () => navigate("/updateListing") }}>Redaktə et</button>
                <button onClick={() => { setMenuOpen(false); onDelete(listing); }}>Sil</button>
              </div>
            )}
          </div>
        </div>
        <div className="card-sub">
          <span>{cities[listing.city]}</span>
          <span>{listing.area} m²</span>
        </div>
        <div className="card-bottom">
          <span className="card-price">{listing.price} ₼/ay</span>
          <span className="card-room">{listing.roomCount} otaq</span>
        </div>
      </div>
    </div>
  );
}