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
      console.log(response)
    } catch (err) {
      if (err.response && err.response.data) {
        showError(err.response.data.message || "Xəta baş verdi!");
        console.log(err.response.data);
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
          // console.log(err.response.data);
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
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/profile")}>
              Ləğv et
            </button>
            <button type="submit" className="btn-save" disabled={isLoading}>
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
