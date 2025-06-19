"use client"

import { useState } from "react"
import "./profile.css"
import Navigation from "./navigation"
import Footer from "./footer"

export default function Profile() {
  const [userProfile, setUserProfile] = useState({
    name: "Aysun Aliyeva",
    university: "Baku State University",
    email: "aysun.aliyeva@gmail.com",
    profileImage: "/placeholder.svg?height=120&width=120",
  })

  const handleEditProfile = () => {
    console.log("Edit profile clicked")
    // Handle edit profile logic
  }

  const handleCreateListing = () => {
    console.log("Create listing clicked")
    // Handle create listing logic
  }

  const handleExploreListing = () => {
    console.log("Explore listings clicked")
    // Handle explore listings logic
  }

  return (
    <div>
      <Navigation/>
      <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={userProfile.profileImage || "/placeholder.svg"} alt={userProfile.name} className="avatar-image" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{userProfile.name}</h1>
            <p className="profile-university">{userProfile.university}</p>
            <p className="profile-email">{userProfile.email}</p>
          </div>
          <button className="edit-profile-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>

        {/* My Listings Section */}
        <div className="profile-section">
          <h2 className="section-title">My Listings</h2>
          <div className="empty-state">
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
            <h3 className="empty-state-title">No Listings Yet</h3>
            <p className="empty-state-description">
              You haven't listed any properties yet. Start listing your property to find potential roommates.
            </p>
            <button className="action-button primary" onClick={handleCreateListing}>
              Create Listing
            </button>
          </div>
        </div>

        {/* Saved Properties Section */}
        <div className="profile-section">
          <h2 className="section-title">Saved Properties</h2>
          <div className="empty-state">
            <div className="empty-state-illustration">
              <svg className="illustration-svg" viewBox="0 0 200 150" fill="none">
                {/* Ground */}
                <rect x="0" y="120" width="200" height="30" fill="#10b981" />
                {/* Buildings */}
                <rect x="40" y="80" width="20" height="40" fill="#059669" />
                <rect x="70" y="70" width="20" height="50" fill="#059669" />
                <rect x="100" y="60" width="20" height="60" fill="#059669" />
                <rect x="130" y="50" width="20" height="70" fill="#059669" />
                <rect x="160" y="40" width="20" height="80" fill="#059669" />
                {/* Windows */}
                <rect x="44" y="85" width="3" height="3" fill="#34d399" />
                <rect x="53" y="85" width="3" height="3" fill="#34d399" />
                <rect x="74" y="75" width="3" height="3" fill="#34d399" />
                <rect x="83" y="75" width="3" height="3" fill="#34d399" />
                <rect x="104" y="65" width="3" height="3" fill="#34d399" />
                <rect x="113" y="65" width="3" height="3" fill="#34d399" />
                {/* Trees */}
                <circle cx="20" cy="110" r="8" fill="#22c55e" />
                <rect x="18" y="110" width="4" height="10" fill="#059669" />
                <circle cx="185" cy="110" r="8" fill="#22c55e" />
                <rect x="183" y="110" width="4" height="10" fill="#059669" />
              </svg>
            </div>
            <h3 className="empty-state-title">No Saved Properties</h3>
            <p className="empty-state-description">
              You haven't saved any properties yet. Explore listings and save properties you're interested in.
            </p>
            <button className="action-button secondary" onClick={handleExploreListing}>
              Explore Listings
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
