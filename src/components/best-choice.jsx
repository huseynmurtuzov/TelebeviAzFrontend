import { Home, Heart, Users } from "lucide-react"
import "./best-choice.css"

export default function BestChoice() {
  const features = [
    {
      icon: Home,
      title: "Geniş Elan Bazası",
      description:
        "Minlərlə mənzil və yataqxana elanı arasından ən uyğununu seçin. Müxtəlif ərazilər və qiymət seqmentləri.",
    },
    {
      icon: Heart,
      title: "Etibarlı Ev Yoldaşları",
      description: "Ev yoldaşı axtarışında sizə kömək edirik. Uyğun şəxslərlə tanış olun və xərcləri bölüşün.",
    },
    {
      icon: Users,
      title: "Müasir Qoymalar",
      description:
        "Bütün elanlar yoxlanılır və təsdiqlənir. Təhlükəsiz əməliyyat üçün qəyyum xidmətindən istifadə edin.",
    },
  ]

  return (
    <section className="best-choice">
      <div className="container">
        <h2 className="section-title">Tələbələr üçün ən yaxşı seçim</h2>
        <p className="section-description">
          Telebevi tələbələrin ehtiyaclarını qarşılayan xüsusi xidmətlər təklif edir.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
