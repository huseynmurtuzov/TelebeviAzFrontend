"use client"

import { useEffect, useState } from "react"
import "../assets/styles/UserProfileEdit.css"
import { useNotification } from "./context/NotificationContext"
import api from "../api"
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from "react-router-dom"


const UserProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
  })
  const [errors, setErrors] = useState({})

  const validateStep = () => {
    let newErrors = {};
    const onlyLettersRegex = /^[A-Za-zÇçĞğİıÖöŞşÜüƏə\s]+$/;

    if (!formData.name) {
      newErrors.name = "Ad boş ola bilməz";
    } else if (!onlyLettersRegex.test(formData.name)) {
      newErrors.name = "Ad yalnız hərflərdən ibarət olmalıdır";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Ad ən az 3 hərfdən ibarət olmalıdır";
    }

    if (!formData.surname) {
      newErrors.surname = "Soyad boş ola bilməz";
    } else if (!onlyLettersRegex.test(formData.surname)) {
      newErrors.surname = "Soyad yalnız hərflərdən ibarət olmalıdır";
    } else if (formData.surname.trim().length < 3) {
      newErrors.surname = "Soyad ən az 3 hərfdən ibarət olmalıdır";
    }

    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Düzgün email daxil edin";
      if (!formData.phoneNumber || !/^\d{9,10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Telefon nömrəsi 9 və ya 10 rəqəm olmalıdır";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [userInfo, setUserInfo] = useState()
    const { setLoading, showError, showInfo,isLoading,error,setIsLoggedIn,isLoggedIn } = useNotification();
    const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
    let userId;
    if(token){
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    }



    const fetchUserDataFunction = async() => {
        return await api.get(`/User/${userId}`)
    }

    useEffect(() => {
        const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetchUserDataFunction();
      setUserInfo(response.data)
      setFormData({
        name:response.data.name,
        surname:response.data.surName,
        phoneNumber:response.data.phoneNumber
      });
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
      } else {
        // showError("Xəta baş verdi!");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchUserData();
    },[])



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors({});
  }

  const handleSubmitFunction = async () => {
    return await api.patch(`/User/${userId}`,{
        name:formData.name,
        surname:formData.surname,
        phoneNumber:formData.phoneNumber,
        gender:userInfo.gender,
        dateOfBirth:userInfo.dateOfBirth
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return;
    setLoading(true);
      try {
        const response = await handleSubmitFunction();
        if(response.status == 200 || response.status == 201){
            showInfo("Profil redaktə edildi");
            navigate("/profile")
        }
      } catch (err) {
        if (err.response && err.response.data) {
          showError(err.response.data.message || "Xəta baş verdi!");
        } else {
          // showError("Xəta baş verdi!");
        }
      } finally {
        setLoading(false);


      }
  }

  return (
    <div className="edit-profile">
      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <h1>Profil Məlumatları</h1>
          <p>Şəxsi məlumatlarınızı yeniləyin</p>
        </div>

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Ad *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Adınızı daxil edin"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="surname">Soyad *</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
                placeholder="Soyadınızı daxil edin"
              />
              {errors.surname && <div className="error">{errors.surname}</div>}
            </div>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="phoneNumber">Telefon Nömrəsi *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="+994501234567"
              />
              {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/profile")}>
              Ləğv et
            </button>
            <button type="submit" onClick={handleSubmit} className="btn-save" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Yenilənir...
                </>
              ) : (
                "Yadda saxla"
              )}
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default UserProfileEdit
