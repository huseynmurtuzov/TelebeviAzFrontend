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
import Pagination from "./Pagination"

export default function RentalListings() {
  // const [viewMode, setViewMode] = useState("list")
  // const [listings, setListings] = useState([])
  const [filters, setFilters] = useState({
  selectedRooms: null,
  selectedAreas: null,
  priceRange: [0, 2000],
  selectedLocation: null,
  amenities: { onlyGirls: false, onlyBoys: false }
})
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 4
   const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,listings,setListings,currentPage,setCurrentPage } = useNotification();
  const navigate = useNavigate();


  const handleDataFromChild = (data) => {
    setFilters(data);
    setCurrentPage(1);
  };


  const getRentalsFunction = async () => {
    let min, max;
  if(filters.selectedAreas){
    [min, max] = filters.selectedAreas.split('-').map(Number);
  } else {
    min = null; 
    max = null;
  }
    return await api.get("/Listing/filteredListings",{
      params:{
        roomCount:filters.selectedRooms,
        minArea:min,
        maxArea:max,
        minPrice:filters.priceRange[0],
        maxPrice:filters.priceRange[1],
        onlyGirls:filters.amenities.onlyGirls,
        onlyBoys:filters.amenities.onlyBoys,
        location:filters.selectedLocation,
        page: currentPage, 
        pageSize }
    });
  }


 useEffect(() => {
  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await getRentalsFunction();
      setListings(response.data.items);
      setTotalCount(response.data.totalCount)
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
        console.log(err.response.data);
      } else {
        // showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchListings();
}, [currentPage,filters]);





  return (
    <div className="rental-listings">
      <NavigationSearch/>
      <div className="listings-container">
        <aside className="filters-sidebar">
          <Filters  sendDataToParent={handleDataFromChild}/>
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
            {listings?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChange={setCurrentPage}/>
        </main>
      </div>
      <Footer/>
    </div>
  )
}
