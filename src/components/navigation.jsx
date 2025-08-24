"use client"

import { useState, useEffect } from "react"
import logo from "../assets/logo.png"


export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <a href="/" className="logo" style={{display:"flex",alignItems:"center",columnGap:"1rem"}}>
            <span>
              <img src={logo} className="logo_itself" alt="" />
            </span>
            <span> <span style={{color:"#92C9DD"}}>| Be</span><span style={{color:"#e1d36c"}}>ta</span></span>
          </a>
          <div className="nav-links">
            <a href="/listings" className="nav-link">
              Ev elanları
            </a>
            <a href="#howitworks" className="nav-link">
              Necə işləyir
            </a>
          </div>
        </div>

        <div className="nav-right">
          <div className="desktop-buttons">
            <a className="cta-button" href="/login">
              Login
            </a>
            <a className="cta-button" href="/register">
              Register
            </a>
          </div>

          <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <span className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          <a href="/listings" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Ev elanları
          </a>
          <a href="#howitworks" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Necə işləyir
          </a>
        </div>
        <div className="mobile-menu-buttons">
          <a className="mobile-cta-button" href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </a>
          <a className="mobile-cta-button" href="/register" onClick={() => setIsMobileMenuOpen(false)}>
            Register
          </a>
        </div>
      </div>

      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </nav>
  )
}
