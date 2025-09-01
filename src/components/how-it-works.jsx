import "../assets/styles/how-it-works.css"

const HowItWorks = () => {
  const steps = [
    {
      icon: "🔍",
      title: "Axtar",
      description:
        "Mənzil və ya yataqxana elanlarını axtarın və ən uyğun olanı seçin. Filtrlər vasitəsilə axtarışınızı dəqiqləşdirin.",
      details: [
        "Lokasiya üzrə filtrlə",
        "Qiymət aralığı seç",
        "Şəkillər və təfərrüatları gör",
        "Ev sahibi ilə birbaşa əlaqə",
      ],
    },
    {
      icon: "👤",
      title: "Qoşul",
      description:
        "Seçdiyiniz elana əlaqə saxlayın və ya ev yoldaşı axtarışında iştirak edin. Profil yaradın və təhlükəsiz ünsiyyət qurun.",
      details: ["Profil yaradın", "Şəxsi məlumatları təsdiqləyin", "Kirayə ev axtarın", "Ev yoldaşı axtarın"],
    },
    {
      icon: "🏡",
      title: "Yaşa",
      description:
        "Yeni evinizə köçün və rahat tələbə həyatının keyfini çıxarın. Həmyaşıdlarınızla tanış olun və yeni dostluqlar qurun.",
      details: ["Müqavilə imzalayın", "Köçmə prosesi", "Ev yoldaşları ilə tanışlıq", "Rahat kommunikasiya"],
    },
  ]

  return (
    <section className="how-it-works" id="howitworks">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Necə işləyir?</h2>
          <p className="section-subtitle">
            Telebevi ilə mənzil axtarışı aylarca deyil, və asan olur. Sadə 3 addımda ideal yaşayış yerinizi tapın.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">
                <span className="icon-emoji">{step.icon}</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <ul className="step-details">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="step-detail">
                      <span className="check-icon">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector" >
                  <div className="connector-line"></div>
                  <div className="connector-arrow">→</div>
                </div>
              )}
            </div >
          ))}
        </div>

        <div className="demo-section" >
          <h3 className="demo-title" >Demoyu izləyin</h3>
          <p className="demo-description">2 dəqiqəlik videoda bütün prosesi görün</p>
          <a href="https://youtube.com/shorts/z3XsS1J3DRk?si=0bcVMnIYS7WbhbQT" target="_blank" className="demo-button">
            <span className="play-icon" >▶</span>
            Demo Videonu İzlə
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
