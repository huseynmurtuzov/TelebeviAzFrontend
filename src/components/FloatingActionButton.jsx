import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/FloatingActionButton.css";

export default function FloatingActionButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createListing");
  };

  return (
    <button className="fab-btn" onClick={handleClick} aria-label="Yeni elan yarat">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="13" fill="none"/>
        <path d="M13 7V19" stroke="#fff" strokeWidth="2.1" strokeLinecap="round"/>
        <path d="M7 13H19" stroke="#fff" strokeWidth="2.1" strokeLinecap="round"/>
      </svg>
    </button>
  );
}