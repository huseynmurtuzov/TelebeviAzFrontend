import { Search, Users, Home } from "lucide-react"
import "../assets/styles/simple-effective.css"

export default function SimpleEffective() {
  const steps = [
    {
      icon: Search,
      title: "Axtar",
      description: "Mənzil və ya yataqxana elanlarını axtarın və ən uyğun olanı seçin.",
    },
    {
      icon: Users,
      title: "Qoşul",
      description: "Seçdiyiniz elanla əlaqə saxlayın və ya ev yoldaşı axtarışında iştirak edin.",
    },
    {
      icon: Home,
      title: "Yaşa",
      description: "Yeni evinizə köçün və rahat tələbə həyatının keyfini çıxarın.",
    },
  ]

  return (
    <section className="simple-effective">
      <div className="container">
        <h2 className="section-title">Sadə və Effektiv</h2>
        <p className="section-description">Telebevi ilə mənzil axtarışı aylarca deyil, və asan olur.</p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">
                <step.icon size={32} />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
