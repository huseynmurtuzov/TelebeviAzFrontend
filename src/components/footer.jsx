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
            <div className="footer-author-section" style={{textAlign:"center"}}>
              <h3 className="author-title" style={{color:"white", marginBottom: "40px"}}><span style={{color:"#92C9DD"}}>Murtuzov</span> <span style={{color:"#13C38B"}}>Hüseyn</span> tərəfindən hazırlandı</h3>
              <div className="author-links">
                <a
                  href="https://github.com/huseynmurtuzov"
                  className="author-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{display: "flex", alignItems: "center", justifyContent:"center",color: "#fff", marginBottom: "10px"}}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{marginRight: "6px"}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.235 1.84 1.235 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.304.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.235-3.22-.135-.302-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.874.12 3.176.765.839 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.921.429.37.81 1.102.81 2.222v3.293c0 .319.192.694.801.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/huseynmurtuzov/"
                  className="author-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{display: "flex", alignItems: "center", color: "#fff",justifyContent:"center", marginBottom: "10px"}}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{marginRight: "6px"}}><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.27h-3v-5.604c0-1.337-.026-3.063-1.865-3.063-1.864 0-2.151 1.454-2.151 2.957v5.71h-3v-10h2.881v1.367h.041c.402-.761 1.386-1.563 2.852-1.563 3.052 0 3.616 2.009 3.616 4.623v5.573z"/></svg>
                  LinkedIn
                </a>
                <a
                  href="https://kofe.al/@murtuzovhuseyn"
                  className="author-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{display: "flex", alignItems: "center", color: "#fff",justifyContent:"center"}}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="12" cy="20" rx="7" ry="2" fill="#fff"/>
                    <rect x="2" y="4" width="20" height="11" rx="5" fill="#fff" stroke="#fff" stroke-width="1.5"/>
                    <rect x="5" y="7" width="14" height="7" rx="3" fill="#fff"/>
                    <ellipse cx="12" cy="10.5" rx="6" ry="3" fill="#fff"/>
                    <path d="M20 8c2.209 0 4 1.567 4 3.5S22.209 15 20 15v-1c1.657 0 3-1.12 3-2.5S21.657 9 20 9V8z" fill="#fff" stroke="#fff" stroke-width="1.5"/>
                    <path d="M9 2c0-1 1-1 1-2s-1-1-1-2" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                    <path d="M15 2c0-1 1-1 1-2s-1-1-1-2" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                  </svg>
                  Kofe al
                </a>
              </div>
            </div>


            {/* <div className="footer-sections">
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
            </div> */}
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
