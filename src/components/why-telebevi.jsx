import { useNavigate } from "react-router-dom"
import "../assets/styles/why-telebevi.css"

const WhyTelebevi = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: "🏠",
      title: "Geniş Elan Bazası",
      description:
        "Minlərlə mənzil və yataqxana elanı arasından ən uyğun seçimi edin. Müxtəlif qiymət seqmentləri və lokasiyalar sizin üçün hazırdır.",
      stats: "5000+ Aktiv Elan",
    },
    {
      icon: "❤️",
      title: "Etibarlı Ev Yoldaşları",
      description:
        "Ev yoldaşı axtarışında sizə kömək edirik. Uyğun şəxslərlə tanış olun və xərci bölüşün. Təhlükəsiz və rahat yaşayış təmin edirik.",
      stats: "15000+ Qeydiyyatlı İstifadəçi",
    },
    {
      icon: "👥",
      title: "Müasir Qovmalar",
      description:
        "Bütün elanlar yoxlanır və təsdiqlənir. Təhlükəsiz məqsədi üçün zəng və ya mesaj yazdıqdan sonra pul köçürməsi etməyin.",
      stats: "99% Müştəri Məmnuniyyəti",
    },
  ]

  return (
    <section className="why-telebevi">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Niyə telebevi.az?</h2>
          <p className="section-subtitle">
            Telebevi tələbələrin ehtiyaclarını qarşılayan xüsusi xidmətlər təklif edir. Bizim platformamız vasitəsilə ən
            uyğun yaşayış yerlərini tapın və həmyaşıdlarınızla əlaqə qurun.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <span className="icon-emoji">{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {/* <div className="feature-stats">{feature.stats}</div> */}
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Hazır başlamağa?</h3>
          <p className="cta-description">Qeydiyyatdan keçin və ən yaxşı yaşayış yerlərini kəşf edin</p>
          <button className="cta-button" onClick={() => navigate("/register")} style={{cursor:"pointer"}}>İndi Qeydiyyatdan Keç</button>
        </div>
      </div>
    </section>
  )
}

export default WhyTelebevi
