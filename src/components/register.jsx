"use client"

import { useEffect, useState } from "react"
import "../assets/styles/register.css"
import LoadingScreen from "./loadingScreen"
import ErrorComponent from '../components/errorComponent'
import api from "../api"
import { useNavigate } from "react-router-dom"
import { useNotification } from "./context/NotificationContext"
import BackArrow from "./BackArrow"
import PasswordInput from "./PasswordInput"

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",  
    phoneNumber: "",
    userType: "",
    gender: "",
    dateOfBirth: ""
  })

  const { setLoading, showError, showInfo,isLoading,error,setError } = useNotification();
  const totalSteps = 5
  const navigate = useNavigate();

  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,          
    }))
    setError("")
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (currentStep === 3) {
      if (formData.password !== formData.confirmPassword) {
        showError("Şifrə və təsdiq şifrəsi eyni olmalıdır!")
        return
      }
    }
    setError("")
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Registrasiya tamamlandı:", formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // setError("")
    }
  }

  const register = async (formData) => {
  return await api.post("/Account/Register", {
    name: formData.name,
    surname: formData.surname,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    passwordHash: formData.password,
    role: Number(formData.userType),    
    gender: Number(formData.gender),
    dateOfBirth: formData.dateOfBirth
  });
};
const sendVerificationCode = async() => {
  return await api.post("/Account/verifyEmail", {
    email:formData.email
  });
}

 const handleRegister = async (e) => {
  if (currentStep === totalSteps) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(formData);
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        const response2 = await sendVerificationCode();
        if (response.status === 200 || response.status === 201){
          showInfo("Mailinzə verifikasiya kodu göndərdik")
          navigate('/verifyEmail',{ state: { email: formData.email }})
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
        console.log(error)
        console.log(err.response.data);
      } else {
        showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  }
}

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label className="form-label">Ad</label>
              <input
                type="text"
                name="name"
                placeholder="Adınızı daxil edin"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Soyad</label>
              <input
                type="text"
                name="surname"
                placeholder="Soyadınızı daxil edin"
                value={formData.surname}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email hesabınızı daxil edin"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nömrə</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Telefon nömrənizi daxil edin"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="form-group">
              <label className="form-label">Şifrə</label>
              <PasswordInput
                  name="password"
                  placeholder="Şifrə"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />

            </div>
            <div className="form-group">
              <label className="form-label">Şifrə təsdiqi</label>
              <PasswordInput
                  name="confirmPassword"
                  placeholder="Təkrar Şifrə"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
            </div>
          </>
        )
      case 4:
        return (
          <>
            <div className="form-group">
              <label className="form-label">İstifadəçi tipi</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">İstifadəçi tipi seçin</option>
                <option value="1">Tələbə</option>
                <option value="2">Makler</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Cins</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Cins seçin</option>
                <option value="0">Kişi</option>
                <option value="1">Qadın</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Doğum tarixi</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </>
        )
      case 5:
        return (
          <div className="summary-step">
            <h3 className="summary-title">Məlumatlarınızı yoxlayın</h3>
            <div className="summary-item">
              <span className="summary-label">Ad:</span>
              <span className="summary-value">{formData.name}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Soyad:</span>
              <span className="summary-value">{formData.surname}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Email:</span>
              <span className="summary-value">{formData.email}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Nömrə:</span>
              <span className="summary-value">{formData.phoneNumber}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">İstifadəçi tipi:</span>
              <span className="summary-value">
                {formData.userType === "1" ? "Tələbə" : formData.userType === "2" ? "Makler" : ""}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Cins:</span>
              <span className="summary-value">
                {formData.gender === "0" ? "Kişi" : formData.userType === "1" ? "Qadın" : ""}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Doğum tarixi:</span>
              <span className="summary-value">{formData.dateOfBirth}</span>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  // if(loading){
  //   return <LoadingScreen/>
  // }

  return (
    <div>
      <BackArrow url={"/"}/>
      <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Hesab yaradın</h1>

        <div className="progress-section">
          <div className="progress-text">
            Addım {currentStep} / {totalSteps}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <form className="register-form" onSubmit={handleNext}>
          {renderStepContent()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="back-button" onClick={handleBack}>
                Geri
              </button>
            )}
            <button type="submit" className="next-button" onClick={handleRegister}>
              {currentStep === totalSteps ? "Hesab yaradın" : "Növbəti"}
            </button>
          </div>
        </form>

        <div className="login-link">
          <span>Artıq hesabınız var? </span>
          <a href="/login" className="login-link-text">
            Giriş edin
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}