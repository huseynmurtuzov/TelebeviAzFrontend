"use client"

import { useState } from "react"
import { useNotification } from "./context/NotificationContext"
import "../assets/styles/forgotPassword.css"
import api from "../api"
import { useNavigate } from "react-router-dom"
const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const { setLoading, showError, showInfo,isLoading,error,setError } = useNotification();
  const sendVerificationCode = async() => {
  return await api.post("/Account/verifyEmailChangePassword", {
    email:email
  });
}
const navigate = useNavigate();
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      showError("E-poçt ünvanını daxil edin")
      return
    }

    if (!isValidEmail(email)) {
      showError("Düzgün e-poçt ünvanı daxil edin")
      return
    }

    setLoading(true)
    showError("")

    try {
      const response = await sendVerificationCode();
        if (response.status === 200 || response.status === 204){
            showInfo("Mailinzə verifikasiya kodu göndərdik")
            navigate('/sendForgotPasswordVerification',{ state: { email: email }})
        }
    } catch (error) {
      if (error.response && error.response.data) {
        showError(error.response.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <div className="verify-account">
      <div className="verify-account-container">
        <div className="verify-account-header">
          <h1 className="verify-account-title">Şifrə dəyişmə</h1>
          <p className="verify-account-subtitle">Şifrəni dəyişmək üçün email hesabınızı yazın!</p>
        </div>

        <form className="verify-account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-poçt Ünvanı
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* {message && <div className={`message ${message.includes("Xəta") ? "error" : "success"}`}>{message}</div>} */}

          <button type="submit" className={`verify-btn ${isLoading ? "loading" : ""}`} disabled={isLoading || !email}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Göndərilir...
              </>
            ) : (
              "Kod Göndər"
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

export default ForgotPassword
