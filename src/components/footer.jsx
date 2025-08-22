import "../assets/styles/footer.css"
import logo from "../assets/logo.png"

const Footer = () => {
  const footerSections = [
    // {
    //   title: "Haqqımızda",
    //   links: [
    //     { text: "Şirkət haqqında", href: "/about" },
    //     { text: "Karyera", href: "/careers" },
    //     { text: "Komandamız", href: "/team" },
    //     { text: "Xəbərlər", href: "/news" },
    //     { text: "Bloq", href: "/blog" },
    //   ],
    // },
    // {
    //   title: "Xidmətlər və Qaydalar",
    //   links: [
    //     { text: "İstifadə qaydaları", href: "/terms" },
    //     { text: "Məxfilik siyasəti", href: "/privacy" },
    //     { text: "Ödəniş qaydaları", href: "/payment" },
    //     { text: "Geri qaytarma", href: "/refund" },
    //     { text: "Təhlükəsizlik", href: "/security" },
    //   ],
    // },
    // {
    //   title: "İstifadə Qaydaları",
    //   links: [
    //     { text: "Qaydalar", href: "/rules" },
    //     { text: "Şikayətlər", href: "/complaints" },
    //     { text: "Moderasiya", href: "/moderation" },
    //     { text: "Hesab silmə", href: "/delete-account" },
    //     { text: "GDPR", href: "/gdpr" },
    //   ],
    // },
    // {
    //   title: "Əlaqə",
    //   links: [
    //     { text: "Dəstək", href: "/support" },
    //     { text: "Əlaqə", href: "/contact" },
    //     { text: "FAQ", href: "/faq" },
    //     { text: "Canlı söhbət", href: "/chat" },
    //     { text: "Telefon dəstəyi", href: "tel:+994501234567" },
    //   ],
    // },
  ]

  // const socialLinks = [
  //   { name: "Facebook", icon: "📘", href: "https://facebook.com/telebevi" },
  //   { name: "Instagram", icon: "📷", href: "https://instagram.com/telebevi" },
  //   { name: "Twitter", icon: "🐦", href: "https://twitter.com/telebevi" },
  //   { name: "LinkedIn", icon: "💼", href: "https://linkedin.com/company/telebevi" },
  //   { name: "YouTube", icon: "📺", href: "https://youtube.com/telebevi" },
  // ]

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <img src={logo} alt="Telebevi Logo" className="logo-image" />
                <span className="brand-name">tələbəevi.app</span>
              </div>
              <p className="brand-description">
                Azərbaycanın ilk tələbə mənzil axtarış platforması. Təhlükəsiz, rahat və münasib qiymətə yaşayış
                yerləri.
              </p>
              {/* <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} className="social-link" aria-label={social.name}>
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div> */}
            </div>

            <div className="footer-sections">
              {footerSections.map((section, index) => (
                <div key={index} className="footer-section">
                  <h3 className="section-title" style={{color:"white"}}>{section.title}</h3>
                  <ul className="section-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="footer-link">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="footer-newsletter">
            <div className="newsletter-content">
              <h3 className="newsletter-title">Xəbərlərdən xəbərdar olun</h3>
              <p className="newsletter-description">Yeni elanlar və xüsusi təkliflər haqqında məlumat alın</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="E-mail ünvanınız" className="newsletter-input" />
              <button className="newsletter-button">Abunə ol</button>
            </div>
          </div> */}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 Tələbəevi. Bütün hüquqlar qorunur.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/termsOfUse" className="bottom-link">
                İstifadə Şərtləri
              </a>
              <a href="/termsOfUse" className="bottom-link">
                Məxfilik
              </a>
              {/* <a href="/cookies" className="bottom-link">
                Cookies
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
