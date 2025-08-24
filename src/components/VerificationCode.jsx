"use client"

import { useState, useRef, useEffect } from "react"
import "../assets/styles/VerificationCode.css"
import api from "../api"
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./loadingScreen";
import ErrorComponent from "./errorComponent";
import { useNotification } from "./context/NotificationContext";
export default function VerificationCode({ onSubmit, onCodeChange }) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])
  const navigate = useNavigate();
    const location = useLocation();
    const { setLoading, setError, setInfo } = useNotification();


  const handleInputChange = (index, value) => {
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()

    if (sanitizedValue.length <= 1) {
      const newCode = [...code]
      newCode[index] = sanitizedValue
      setCode(newCode)

      // Call onCodeChange callback
      onCodeChange?.(newCode.join(""))

      // Move to next input if current input is filled
      if (sanitizedValue && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()

    if (pastedData.length <= 6) {
      const newCode = [...code]
      for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
        newCode[i] = pastedData[i]
      }
      setCode(newCode)
      onCodeChange?.(newCode.join(""))

      // Focus the next empty input or the last input
      const nextEmptyIndex = newCode.findIndex((char) => char === "")
      const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  const isComplete = code.every((char) => char !== "")

  const handleSubmit = () => {
    if (isComplete) {
      onSubmit?.(code.join(""))
    }
  }

  const handleFormSubmit = () => {
    handleSubmit()
  }

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const submitVerificationFunction = async () => {
    const email = location.state?.email;
    return await api.post("/Account/checkCode",{
      email:email,
      verificationCode:code.join("")
    })
  }

  const submitVerificationCode = async() => {
      setLoading(true);
      setError(null);

    try {
      const response = await submitVerificationFunction();
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
        setInfo("Verifikasiya tamamlandı, giriş edin.")
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (Array.isArray(err.response.data)) {
          setError(err.response.data[0]?.message || "Xəta baş verdi!");
        } else {
          setError(err.response.data.message || "Xəta baş verdi!");
        }
      } else {
        setError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
    <div className="verification-container">
      <div className="verification-header">
        <h2>E-poçt Təsdiqi</h2>
        <p>E-poçt ünvanınıza göndərilən 6 rəqəmli təsdiq kodunu daxil edin</p>
      </div>

      <form onSubmit={handleFormSubmit} className="verification-form">
        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="code-input"
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </div>

        <button type="button" className={`submit-button ${isComplete ? "active" : "disabled"}`} disabled={!isComplete} onClick={submitVerificationCode}>
          Təsdiq Et
        </button>
      </form>

      {/* <div className="resend-section">
        <p>
          Kod almadınız?{" "}
          <button type="button" className="resend-link">
            Yenidən göndər
          </button>
        </p>
      </div> */}
    </div>
    </>
  )
}
