"use client"
import logo from "../assets/logo.png"
import { useState, useEffect } from "react"
import "../assets/styles/navigationAfterLogin.css"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { useNotification } from "./context/NotificationContext"
import pp from "../assets/placeholder-user.jpg"

export default function NavigationAfterLogin() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
const navigate = useNavigate();
  const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn } = useNotification();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeScrolled = scrollTop > 50

      setIsScrolled(shouldBeScrolled)

      // Add/remove body class to prevent content jump
      if (shouldBeScrolled) {
        document.body.classList.add("navbar-fixed")
      } else {
        document.body.classList.remove("navbar-fixed")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.classList.remove("navbar-fixed")
    }
  }, [])

  const handleLogoutFunction = async(refreshToken) => {
    return await api.post("/Account/logout",{
        refreshToken:refreshToken
    })
  }

  const handleLogout = async() => {
    setLoading(true);
    const refreshToken = localStorage.getItem("refreshToken")
    try{
        const response = await handleLogoutFunction(refreshToken);
        if (response.status === 200 || response.status === 201){
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            setIsLoggedIn(false);
            navigate("/login");
            showInfo("Hesabdan çıxış edildi!");
        }
    }catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
        console.log(err.response.data);
      } else {
        showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <a href="/" className="logo">
            <span>
              <img src={logo || "/placeholder.svg"} className="logo_itself" alt="" />
            </span>
          </a>
          <div className="nav-links">
            <a href="#" className="nav-link">
              Ev elanları
            </a>
            <a href="#" className="nav-link">
              Yataqxanalar
            </a>
            <a href="#" className="nav-link">
              Ev yoldaşı
            </a>
            <a href="#" className="nav-link">
              Dəstək
            </a>
          </div>
        </div>

        <div className="nav-right">
          <button className="notification-btn" title="Bildirişlər">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="notification-badge">3</span>
          </button>

          <div className="profile-dropdown">
            <button className="profile-btn">
              <img src={pp} alt="Profil" className="profile-avatar" />
              <span className="profile-name" style={{fontSize:"1.4rem"}}>İstifadəçi</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="dropdown-menu">
              <a href="/profile" className="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Profilim
              </a>
              <a href="/settings" className="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Tənzimləmələr
              </a>
              <div className="dropdown-divider"></div>
              <a onClick={handleLogout} className="dropdown-item logout" style={{cursor:"pointer"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="16,17 21,12 16,7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="9"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Çıxış
              </a>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <a href="#" className="mobile-nav-link">
              Ev elanları
            </a>
            <a href="#" className="mobile-nav-link">
              Yataqxanalar
            </a>
            <a href="#" className="mobile-nav-link">
              Ev yoldaşı
            </a>
            <a href="#" className="mobile-nav-link">
              Dəstək
            </a>
          </div>
          <div className="mobile-user-section">
            <a href="/profile" className="mobile-nav-link">
              Profilim
            </a>
            <a href="/settings" className="mobile-nav-link">
              Tənzimləmələr
            </a>
            <a onClick={handleLogout} style={{cursor:"pointer"}} className="mobile-nav-link logout">
              Çıxış
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
