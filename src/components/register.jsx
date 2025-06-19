"use client"

import { useState } from "react"
import "./register.css"

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "",
  })

  const totalSteps = 4

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle final submission
      console.log("Registration completed:", formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your username"
                value={formData.email}
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
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
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
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">I am a</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select user type</option>
                <option value="student">Student</option>
                <option value="landlord">Landlord</option>
                <option value="roommate">Looking for Roommate</option>
              </select>
            </div>
          </>
        )

      case 4:
        return (
          <div className="summary-step">
            <h3 className="summary-title">Review Your Information</h3>
            <div className="summary-item">
              <span className="summary-label">Full Name:</span>
              <span className="summary-value">{formData.fullName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Email:</span>
              <span className="summary-value">{formData.email}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Phone:</span>
              <span className="summary-value">{formData.phoneNumber}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">User Type:</span>
              <span className="summary-value">{formData.userType}</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create an account</h1>

        <div className="progress-section">
          <div className="progress-text">
            Step {currentStep} of {totalSteps}
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
                Back
              </button>
            )}
            <button type="submit" className="next-button">
              {currentStep === totalSteps ? "Create Account" : "Next"}
            </button>
          </div>
        </form>

        <div className="login-link">
          <span>Already have an account? </span>
          <a href="/login" className="login-link-text">
            Log In
          </a>
        </div>
      </div>
    </div>
  )
}
