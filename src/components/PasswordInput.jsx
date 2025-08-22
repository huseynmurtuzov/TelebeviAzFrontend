import React, { useState } from "react";

export default function PasswordInput({ value, onChange, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        {...props}
        style={{ paddingRight: "36px", width: "100%" }}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        tabIndex={-1}
        style={{
          position: "absolute",
          top: "50%",
          right: "8px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer"
        }}
        aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
      >
        {/* Göz ikonu (SVG) */}
        {show ? (
          // Açıq göz (gösteriliyor)
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path stroke="#059669" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
            <circle cx="12" cy="12" r="3" stroke="#059669" strokeWidth="2"/>
          </svg>
        ) : (
          // Bağlı göz
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path stroke="#059669" strokeWidth="2" d="M3 3l18 18M1 12s4-7 11-7 11 7 11 7-2.5 4.5-7 6.32"/>
            <circle cx="12" cy="12" r="3" stroke="#059669" strokeWidth="2"/>
          </svg>
        )}
      </button>
    </div>
  );
}