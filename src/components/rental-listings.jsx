"use client"

import { useState } from "react"
import Filters from "./filters"
import PropertyCard from "./property-card"
import "./rental-listings.css"
import NavigationSearch from '../components/navigation-search'
import Footer from "./footer"

export default function RentalListings() {
  const [viewMode, setViewMode] = useState("list")

  const properties = [
    {
      id: 1,
      title: "Cozy 2-Bedroom Apartment Near Campus",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 800,
      price: 450,
      image: "/placeholder.svg?height=200&width=300",
      type: "apartment",
    },
    {
      id: 2,
      title: "Spacious 3-Bedroom House with Yard",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      price: 1200,
      image: "/placeholder.svg?height=200&width=300",
      type: "house",
    },
    {
      id: 3,
      title: "Modern 1-Bedroom Studio in City Center",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 500,
      price: 600,
      image: "/placeholder.svg?height=200&width=300",
      type: "studio",
    },
    {
      id: 4,
      title: "Shared 4-Bedroom House with Students",
      bedrooms: 4,
      bathrooms: 2,
      sqft: 1600,
      price: 350,
      image: "/placeholder.svg?height=200&width=300",
      type: "shared",
      priceType: "per room",
    },
  ]

  return (
    <div className="rental-listings">
      <NavigationSearch/>
      <div className="listings-container">
        <aside className="filters-sidebar">
          <Filters />
        </aside>

        <main className="listings-main">
          <div className="listings-header">
            <h1 className="listings-title">Available Rentals</h1>
            <div className="view-toggle">
              <button
                className={`view-button ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                List View
              </button>
              <button
                className={`view-button ${viewMode === "map" ? "active" : ""}`}
                onClick={() => setViewMode("map")}
              >
                Map View
              </button>
            </div>
          </div>

          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="pagination">
            <button className="pagination-arrow">‹</button>
            <button className="pagination-number active">1</button>
            <button className="pagination-number">2</button>
            <button className="pagination-number">3</button>
            <span className="pagination-dots">...</span>
            <button className="pagination-number">10</button>
            <button className="pagination-arrow">›</button>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  )
}
