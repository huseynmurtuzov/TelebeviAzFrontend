import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackArrow({ url }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <a
      // href={url}
      onClick={handleBack}
      style={{
        position: "fixed",
        top: "24px",
        left: "24px",
        zIndex: 1000,
        background: "white",
        borderRadius: "50%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "box-shadow 0.2s",
      }}
      title="Geri"
    >
      {/* SVG back arrow */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M13.25 16.5L8.25 11.5L13.25 6.5"
          stroke="#059669"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}