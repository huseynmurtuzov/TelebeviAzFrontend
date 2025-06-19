import "../assets/styles/property-card.css"

export default function PropertyCard({ property }) {
  const { title, bedrooms, bathrooms, sqft, price, image, priceType = "month" } = property

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={image || "/placeholder.svg"} alt={title} />
      </div>
      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <div className="property-details">
          <span className="detail-item">{bedrooms} bedroom</span>
          <span className="detail-separator">•</span>
          <span className="detail-item">{bathrooms} bathroom</span>
          <span className="detail-separator">•</span>
          <span className="detail-item">{sqft} sq ft</span>
        </div>
        <div className="property-price">
          <span className="price-amount">
            ${price}/{priceType === "per room" ? "month per room" : "month"}
          </span>
        </div>
      </div>
    </div>
  )
}
