import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // useEffect(() => {
  //   if(localStorage.getItem("accessToken")){
  //     setIsLoggedIn(true)
  //   }else{
  //     setIsLoggedIn(false)
  //   }
  // },[])
const showError = (msg) => {
  setInfo(null);
  setError(msg);
};

const showInfo = (msg) => {
  setError(null);
  setInfo(msg);
};
  return (
    <NotificationContext.Provider value={{ isLoading, setLoading, error, setError, info, setInfo,isLoggedIn,setIsLoggedIn,showError,showInfo }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within a NotificationProvider");
  return ctx;
};