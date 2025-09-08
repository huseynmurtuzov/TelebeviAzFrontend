import React, { useState } from 'react';
import '../assets/styles/changePassword.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from './context/NotificationContext';
import api from '../api';
const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const { setLoading, setError, setInfo } = useNotification();
  
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Yeni şifrə tələb olunur';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Şifrə ən azı 6 simvol olmalıdır';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifrə təsdiqi tələb olunur';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifrələr uyğun gəlmir';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changePasswordFunction = async() => {
    const email = location.state?.email;
    return await api.post("/Account/changePassword",{
      email:email,
      newPassword:formData.newPassword,
      newPasswordConfirm:formData.confirmPassword
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await changePasswordFunction();
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
        setInfo("Şifrəniz dəyişdirildi!")
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (Array.isArray(err.response.data)) {
          setError(err.response.data[0]?.message);
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.newPassword && formData.confirmPassword && 
                     formData.newPassword === formData.confirmPassword &&
                     formData.newPassword.length >= 6;

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <div className="change-password-header">
          <div className="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="15" r="1" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="change-password-title">Şifrəni Dəyiş</h1>
          <p className="change-password-subtitle">
            Hesabınızın təhlükəsizliyi üçün güclü şifrə seçin
          </p>
        </div>

        <form className="change-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              Yeni Şifrə
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.newPassword ? 'error' : ''}`}
                placeholder="Yeni şifrənizi daxil edin"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('newPassword')}
                disabled={isLoading}
              >
                {showPasswords.newPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5S22 12 22 12S19 19 12 19S2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.88 9.88C9.33 10.43 9 11.16 9 12S9.33 13.57 9.88 14.12C10.43 14.67 11.16 15 12 15S13.57 14.67 14.12 14.12C14.67 13.57 15 12.84 15 12S14.67 10.43 14.12 9.88C13.57 9.33 12.84 9 12 9S10.43 9.33 9.88 9.88Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 12C21 12 18 19 12 19M12 19C6 19 3 12 3 12M12 19V15M3 3L21 21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Şifrəni Təsdiqlə
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Şifrənizi yenidən daxil edin"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                disabled={isLoading}
              >
                {showPasswords.confirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5S22 12 22 12S19 19 12 19S2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.88 9.88C9.33 10.43 9 11.16 9 12S9.33 13.57 9.88 14.12C10.43 14.67 11.16 15 12 15S13.57 14.67 14.12 14.12C14.67 13.57 15 12.84 15 12S14.67 10.43 14.12 9.88C13.57 9.33 12.84 9 12 9S10.43 9.33 9.88 9.88Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 12C21 12 18 19 12 19M12 19C6 19 3 12 3 12M12 19V15M3 3L21 21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
          >
            Şifrəni Təsdiqlə
          </button>
        </form>

        <div className="password-requirements">
          <h3>Şifrə tələbləri:</h3>
          <ul>
            <li className={formData.newPassword.length >= 6 ? 'valid' : ''}>
              Ən azı 6 simvol
            </li>
            <li className={formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword ? 'valid' : ''}>
              Şifrələr uyğun olmalıdır
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
