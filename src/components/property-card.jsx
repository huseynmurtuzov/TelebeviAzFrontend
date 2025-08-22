import "../assets/styles/property-card.css"
import { useState,useEffect } from "react"
import api from "../api"
import { useNotification } from "./context/NotificationContext"
import { useNavigate } from "react-router-dom"

export default function PropertyCard({ property }) {
  const { title, bedrooms, bathrooms, sqft, price, image, priceType = "month" } = property
  const [images, setImages] = useState([])
     const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn } = useNotification();
     const navigate = useNavigate();
  

  const getImagesFunction = async () => {
    return await api.get(`/ListingImage/${property.id}`);
  }
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getImagesFunction();
        // console.log(response)
        setImages(response.data);
        // console.log(response.data)
      } catch (err) {
        if (err.response && err.response.data) {
          showError(err.response.data.message || "Xəta baş verdi!");
          // console.log(err.response.data);
        } else {
          showError("Xəta baş verdi!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);
  // console.log(property)
  return (
    <div className="property-card" onClick={() => navigate(`/rent-details/${property.id}`)}>
      <div className="property-image">
        <img src={images[0]?.imageUrl} alt={title} />
      </div>
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-details">
          <span className="detail-item">{property.description}</span>
          {/* <span className="detail-separator">•</span> */}
          <span className="detail-item">{property.city} şəhəri</span>
          <span className="detail-separator">•</span>
          <span className="detail-item">Ünvan:{property.address}</span>
        </div>
        <div className="property-price">
          <span className="price-amount" style={{color:"white"}}>
            ₼{price}/{priceType === "per room" ? "month per room" : "ay"}
          </span>
        </div>
      </div>
    </div>
  )
}
