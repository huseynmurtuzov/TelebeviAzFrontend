"use client"

import { useEffect, useState } from "react"
import Filters from "./filters"
import PropertyCard from "./property-card"
import "../assets/styles/rental-listings.css"
import NavigationSearch from '../components/navigation-search'
import Footer from "./footer"
import api from "../api"
import { data, useNavigate } from "react-router-dom"
import { useNotification } from "./context/NotificationContext"

export default function RentalListings() {
  const [viewMode, setViewMode] = useState("list")
  const [listings, setListings] = useState([])
   const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn } = useNotification();
const navigate = useNavigate();



  const getRentalsFunction = async () => {
    return await api.get("/Listing");
  }


 useEffect(() => {
  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await getRentalsFunction();
      // Axios response-dursa:
      setListings(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
        console.log(err.response.data);
      } else {
        showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchListings();
}, []);





  return (
    <div className="rental-listings">
      <NavigationSearch/>
      <div className="listings-container">
        <aside className="filters-sidebar">
          <Filters />
        </aside>

        <main className="listings-main">
          <div className="listings-header">
            <h1 className="listings-title">Aktiv Kirayə Evlər</h1>
            {/* <div className="view-toggle">
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
            </div> */}
          </div>

          <div className="properties-grid">
            {listings.map((property) => (
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
