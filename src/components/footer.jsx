import { Link } from "react-router-dom"
import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Haqqımızda</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="#" >
                  Şirkət haqqında
                </a>
              </li>
              <li className="footer-link">
                <a href="#">
                  Karyera
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Xidmətlər və Qaydallar</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="#" >
                  İstifadə qaydaları
                </a>
              </li>
              <li className="footer-link">
                <a href="#" >
                  Məxfilik siyasəti
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">İstifadə Qaydaları</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Qaydalar
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Şikayətlər
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Əlaqə</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Dəstək
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Əlaqə
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">2024 Telebevi. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  )
}
