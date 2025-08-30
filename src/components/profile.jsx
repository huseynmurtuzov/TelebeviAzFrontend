"use client"

import { useEffect, useState } from "react"
import "../assets/styles/profile.css"
import Navigation from "./navigation"
import Footer from "./footer"
import { useNotification } from "./context/NotificationContext"
import NavigationAfterLogin from "./NavigationAfterLogin"
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import api from "../api"
import UserListingCard from "../components/UserListingCard"
// import UserFavoriteListingCard from "./UserFavoriteListingCard"
import { Helmet } from "react-helmet"

export default function Profile() {
  const [userProfile, setUserProfile] = useState({})
  const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn } = useNotification();
  const [userListings, setUserListings] = useState([])
  const [userFavoritedListings, setUserFavoritedListings] = useState([])
  const navigate = useNavigate();
  if(userProfile == {}){
    setLoading(true)
  }
  
  const token = localStorage.getItem("accessToken");
  let userId;
  if(token){
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  const getUserInfoFunction = async () => {
    return await api.get(`/User/${userId}`);
  }

  const getUserListings = async () => {
    return await api.get(`/Listing/getUserListings/${userId}`)
  }

  const getUsersFavoriteListings = async() => {
    return await api.get(`/FavoriteListing/${parseInt(userId)}`)
  }

  const handleEditListing = (listing) => {
  // məsələn, redaktə səhifəsinə yönləndir:
  navigate(`/updateListing/${listing.id}`)
};

const handleDeleteListing = async (listing) => {
  // Təsdiq soruş, sonra silmək üçün API çağırışı et və listi  yenilə:
  if(window.confirm("Elanı silmək istədiyinizə əminsiniz?")){
    try {
      await api.delete(`/Listing/${listing.id}`);
      setUserListings(prev => prev.filter(l => l.id !== listing.id));
      showInfo("Elan silindi!");
    } catch (err) {
      showError("Silinmə zamanı xəta baş verdi!");
    }
  }
};

  useEffect(() => {
    const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await getUserInfoFunction();
      setUserProfile(response.data);
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
  fetchUserInfo();
  },[])

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true);
      try {
        const response = await getUserListings();
        setUserListings(response.data);
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
    fetchUserListings()
  },[userProfile])

  useEffect(() => {
    const fetchUsersFavoriteListings = async () => {
      setLoading(true);
      try {
        const response = await getUsersFavoriteListings();
        setUserFavoritedListings(response.data);
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
    fetchUsersFavoriteListings()
  },[userProfile])


  const handleEditProfile = () => {
    navigate("/editProfile")
    // Handle edit profile logic
  }

  const handleCreateListing = () => {
    navigate("/createListing")
    // Handle create listing logic
  }

  const handleExploreListing = () => {
    navigate("/listings")
    // Handle explore listings logic
  }

  return (
    <div>
      <Helmet>
        <title>Profil</title>
      </Helmet>
      {isLoggedIn ? <NavigationAfterLogin/> : <Navigation/>}
      <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          {/* <div className="profile-avatar">
            <img src={userProfile.profileImage || "/placeholder.svg"} alt={userProfile.name} className="avatar-image" />
          </div> */}
          <div className="profile-info">
            <h1 className="profile-name">{userProfile.name + " " + userProfile.surName}</h1>
            {/* <p className="profile-university">{userProfile.university}</p> */}
            <p className="profile-email">{userProfile.email}</p>
            
          </div>
          <button className="edit-profile-button" onClick={handleEditProfile}>
            Profili editlə
          </button>
        </div>

        {/* My Listings Section */}
        <div className="profile-section">
          <h2 className="section-title">Mənim elanlarım</h2>
          {userListings.length == 0 && (<div className="empty-state">
            <div className="empty-state-illustration">
              <svg className="illustration-svg" viewBox="0 0 200 150" fill="none">
                {/* Laptop base */}
                <rect x="40" y="90" width="120" height="8" rx="4" fill="#10b981" />
                {/* Laptop screen */}
                <rect x="50" y="40" width="100" height="60" rx="4" fill="#059669" />
                {/* Screen content - chart bars */}
                <rect x="60" y="70" width="8" height="20" fill="#34d399" />
                <rect x="72" y="65" width="8" height="25" fill="#34d399" />
                <rect x="84" y="60" width="8" height="30" fill="#34d399" />
                <rect x="96" y="55" width="8" height="35" fill="#34d399" />
                <rect x="108" y="50" width="8" height="40" fill="#34d399" />
                {/* Trend line */}
                <path d="M60 75 L72 70 L84 65 L96 60 L108 55 L120 50" stroke="#ef4444" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <h3 className="empty-state-title">Hələlik elan yoxdur</h3>
            <p className="empty-state-description">
              Siz hələ elan paylaşmamısınız. Yeni elan paylaşmaq istəyərsiniz?
            </p>
            <button className="action-button primary" onClick={handleCreateListing}>
              Yeni elan yarat
            </button>
          </div>)}
          {userListings.length != 0 && (
            <div className="listing-card-wrapper">
              {userListings.map((listing,idx) => {
                          return  <UserListingCard 
                            key={listing.id || idx}
                  listing={listing}
                  onEdit={() => handleEditListing(listing)}
                  onDelete={() => handleDeleteListing(listing)}
                            />
                          })}
            </div>
            
            
          ) }
        </div>

        {/* Saved Properties Section
        <div className="profile-section">
          <h2 className="section-title">Sevimli elanlar</h2>
          {userFavoritedListings.length == 0 && (
            <div className="empty-state">
            <div className="empty-state-illustration">
              <svg className="illustration-svg" viewBox="0 0 200 150" fill="none">
                <rect x="0" y="120" width="200" height="30" fill="#10b981" />
                <rect x="40" y="80" width="20" height="40" fill="#059669" />
                <rect x="70" y="70" width="20" height="50" fill="#059669" />
                <rect x="100" y="60" width="20" height="60" fill="#059669" />
                <rect x="130" y="50" width="20" height="70" fill="#059669" />
                <rect x="160" y="40" width="20" height="80" fill="#059669" />
                <rect x="44" y="85" width="3" height="3" fill="#34d399" />
                <rect x="53" y="85" width="3" height="3" fill="#34d399" />
                <rect x="74" y="75" width="3" height="3" fill="#34d399" />
                <rect x="83" y="75" width="3" height="3" fill="#34d399" />
                <rect x="104" y="65" width="3" height="3" fill="#34d399" />
                <rect x="113" y="65" width="3" height="3" fill="#34d399" />
                <circle cx="20" cy="110" r="8" fill="#22c55e" />
                <rect x="18" y="110" width="4" height="10" fill="#059669" />
                <circle cx="185" cy="110" r="8" fill="#22c55e" />
                <rect x="183" y="110" width="4" height="10" fill="#059669" />
              </svg>
            </div>
            <h3 className="empty-state-title">Sevimli elan yoxdur</h3>
            <p className="empty-state-description">
              Heç bir sevimli elan yoxdur. Saytdan yeni maraqlı elanlar kəşf edin.
            </p>
            <button className="action-button secondary" onClick={handleExploreListing}>
              Elanları axtar
            </button>
          </div>
          )}
          {userFavoritedListings.length != 0 && (
            <div className="listing-card-wrapper">
              {userFavoritedListings.map((listing,idx) => {
                          return  <UserFavoriteListingCard 
                            key={listing.id || idx}
                            listing={listing}
                            />
                          })}
            </div>
          )}
        </div> */}
      </div>
    </div>
    <Footer/>
    </div>
  )
}
