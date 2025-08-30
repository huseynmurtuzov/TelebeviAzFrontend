"use client"

import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import SearchBar from "./search-bar"
import "../assets/styles/navigation.css"
import logo from '../assets/logo.png'

export default function NavigationSearch() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeScrolled = scrollTop > 50

      setIsScrolled(shouldBeScrolled)

      if (shouldBeScrolled) {
        document.body.classList.add("navbar-fixed")
      } else {
        document.body.classList.remove("navbar-fixed")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.classList.remove("navbar-fixed")
    }
  }, [])

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
              {/* <div className="nav-links">
                <a href="/listings" className="nav-link">
                  Ev elanları
                </a>
                <a href="#howitworks" className="nav-link">
                  Necə işləyir
                </a>
                <a href="#" className="nav-link">
                  Ev yoldaşı
                </a>
                <a href="#" className="nav-link">
                  Dəstək
                </a>
              </div> */}
            </div>
            <div className="nav-center">
          <a className="yeni-elan-button" href="/createListing">
            + Yeni Elan
          </a>
        </div>
            {/* <div style={{display:'flex',columnGap:"1rem"}}>
              <a className="cta-button" href="/login">Sign In</a>
              <a className="cta-button" href="/register">Sign Up</a>
            </div> */}
          </div>
        </nav>
  )
}
