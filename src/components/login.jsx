"use client"

import { useState } from "react"
import "./login.css"
import Navigation from "./navigation"
import Footer from "./footer"

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    // Handle login logic here
  }

  const handleSocialLogin = () => {
    console.log("Social media login")
    // Handle social media login
  }

  const handleEmailLogin = () => {
    console.log("Email login")
    // Handle email login
  }

  return (
    <div>
        <Navigation/>
        <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login to Your Account</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            <span className="input-subtitle">or Email</span>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
              <span className="checkmark"></span>
              Remember Me
            </label>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="login-alternatives">
          <button className="alt-login-button" onClick={handleSocialLogin}>
            Continue with Social Media
          </button>
          <button className="alt-login-button" onClick={handleEmailLogin}>
            Continue with Email
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
