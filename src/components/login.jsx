"use client"

import { useState } from "react"
import "../assets/styles/login.css"
import Navigation from "./navigation"
import Footer from "./footer"
import { useNavigate } from "react-router-dom"
import { useNotification } from "./context/NotificationContext"
import api from "../api"
// import Register from "./register"
import PasswordInput from "./PasswordInput"
import { Helmet } from "react-helmet"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const navigate = useNavigate();
  const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn } = useNotification();


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  // Handle login logic here
  }

  const handleSocialLogin = () => {
    // Handle social media login
  }

  const handleEmailLogin = () => {
    // Handle email login
  }


  const handleLoginFunction = async (formData) => {
  return await api.post("/Account/login", {
    email:formData.email,
    password:formData.password
  });
}

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await handleLoginFunction(formData)
      if (response.status === 200 || response.status === 201){
        showInfo("Login oldunuz!");
        localStorage.setItem("accessToken",response.data.accessToken)
        localStorage.setItem("refreshToken",response.data.refreshToken)
        setIsLoggedIn(true);
        navigate("/");
      }
    }catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
      } else {
        showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
        <Navigation/>
        <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Hesabına daxil ol</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <PasswordInput
              name="password"
              placeholder="Şifrə"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          {/* <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Şifrə"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div> */}

          <div className="form-options">
            {/* <label className="remember-me">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
              <span className="checkmark"></span>
              Məni Xatırla
            </label> */}

            {/* <a href="#" className="forgot-password" >
              Şifrəni unutdum
            </a> */}
          </div>

          <button type="submit" className="login-button" onClick={e => handleLogin(e)}>
            Daxil ol
          </button>
        </form>

        {/* <div className="login-alternatives">
          <button className="alt-login-button" onClick={handleSocialLogin}>
            Continue with Social Media
          </button>
          <button className="alt-login-button" onClick={handleEmailLogin}>
            Continue with Email
          </button>
        </div> */}
      </div>
    </div>
    <Footer/>
    </div>
  )
}
