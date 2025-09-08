"use client"

import { useEffect, useState } from "react"
import "../assets/styles/register.css"
// import LoadingScreen from "./loadingScreen"
// import ErrorComponent from '../components/errorComponent'
import api from "../api"
import { useNavigate } from "react-router-dom"
import { useNotification } from "./context/NotificationContext"
import BackArrow from "./BackArrow"
import PasswordInput from "./PasswordInput"
import { Helmet } from "react-helmet"



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

  const [errors, setErrors] = useState({})
  const { setLoading, showError, showInfo,isLoading,error,setError } = useNotification();
  const totalSteps = 5
  const navigate = useNavigate();


  const validateStep = () => {
    let newErrors = {};
    const onlyLettersRegex = /^[A-Za-zÇçĞğİıÖöŞşÜüƏə\s]+$/;

  if (currentStep === 1) {
    if (!formData.name) {
      newErrors.name = "Ad boş ola bilməz";
    } else if (!onlyLettersRegex.test(formData.name)) {
      newErrors.name = "Ad yalnız hərflərdən ibarət olmalıdır";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Ad ən az 3 hərfdən ibarət olmalıdır";
    }else if(formData.name.includes("attack")){
      newErrors.name = "Bir boşluq tapib telebeevi.app instagrama bildirsen komek etmis olarsan"
    }

    if (!formData.surname) {
      newErrors.surname = "Soyad boş ola bilməz";
    } else if (!onlyLettersRegex.test(formData.surname)) {
      newErrors.surname = "Soyad yalnız hərflərdən ibarət olmalıdır";
    } else if (formData.surname.trim().length < 3) {
      newErrors.surname = "Soyad ən az 3 hərfdən ibarət olmalıdır";
    }
  }
    if (currentStep === 2) {
      if (!formData.email || !formData.email.includes("@")) newErrors.email = "Düzgün email daxil edin";
      if (!formData.phoneNumber || !/^\d{9,10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Telefon nömrəsi 9 və ya 10 rəqəm olmalıdır";
    }
    if (currentStep === 3) {
      if (!formData.password || formData.password.length < 6) newErrors.password = "Şifrə ən az 6 simvoldan ibarət olmalıdır";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Şifrə və təsdiq şifrəsi eyni olmalıdır";
    }
    if (currentStep === 4) {
      if (!formData.userType) newErrors.userType = "İstifadəçi tipi seçin";
      if(!formData.userType == 3) newErrors.userType = "Istifadeci tipini duzgun secin!"
      if (!formData.gender) newErrors.gender = "Cins seçin";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Doğum tarixi seçin";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,          
    }))
    setErrors({})
    setError("")
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (!validateStep()) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
      // setError("")
    }
  }

  const registerAsync = async (formData) => {
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
      const response = await registerAsync(formData);
      if (response.status === 200 || response.status === 201) {
        const response2 = await sendVerificationCode();
        if (response.status === 200 || response.status === 201){
          showInfo("Mailinzə verifikasiya kodu göndərdik")
          navigate('/verifyEmail',{ state: { email: formData.email }})
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
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
              {errors.name && <div className="error">{errors.name}</div>}
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
              {errors.surname && <div className="error">{errors.surname}</div>}
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
              {errors.email && <div className="error">{errors.email}</div>}
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
              {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
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
              {errors.password && <div className="error">{errors.password}</div>}
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
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
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
                <option value="3">Ev Sahibi</option>
              </select>
              {errors.userType && <div className="error">{errors.userType}</div>}
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
              {errors.gender && <div className="error">{errors.gender}</div>}
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
              {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
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
                {formData.userType === "1" ? "Tələbə" : formData.userType === "2" ? "Makler" : formData.userType === "3" ? "Ev Sahibi" : ""}
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
      <Helmet>
        <title>Register</title>
      </Helmet>
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
        <div className="login-link" style={{marginTop:"10px"}}>
          <span>Hesabınızı təsdiq etməlisiniz? </span>
          <a href="/verifyAccount" className="login-link-text">
            Hesabınızı təsdiq edin 
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}