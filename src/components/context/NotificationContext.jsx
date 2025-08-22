import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessToken"))
  const [listings, setListings] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

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
    <NotificationContext.Provider value={{ isLoading, setLoading, error, setError, info, setInfo,isLoggedIn,setIsLoggedIn,showError,showInfo,listings,setListings,currentPage,setCurrentPage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within a NotificationProvider");
  return ctx;
};