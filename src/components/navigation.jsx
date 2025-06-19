import { Link } from "react-router-dom"
import "./navigation.css"
import logo from '../assets/logo.png'
import { useState,useEffect } from "react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

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
  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <a href="/" className="logo">
            <span><img src={logo} className="logo_itself" alt="" /></span> 
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
        <div style={{display:'flex',columnGap:"1rem"}}>
          <a className="cta-button" href="/login">Sign In</a>
          <a className="cta-button" href="/register">Sign Up</a>
        </div>
      </div>
    </nav>
  )
}
