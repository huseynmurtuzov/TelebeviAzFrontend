import React, { useEffect, useState } from "react";

export default function AcceptAllCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookiesAccepted")) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "ok");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        background: "linear-gradient(90deg,#10b981 60%,#059669 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 8px 18px 8px",
        zIndex: 9999,
        boxShadow: "0 -2px 16px rgba(0,0,0,0.04)",
        fontSize: "16px",
      }}
    >
      <div style={{ maxWidth: 700, textAlign: "left" }}>
        Bu sayt istifadəçi təcrübəsini artırmaq üçün kukilərdən istifadə edir. Davam etməklə istifadə şərtlərimizi qəbul etmiş olursunuz.
        <a href="/termsOfUse" style={{color:"blue"}}>İstifadə şərtləri</a>
      </div>
      <button
        onClick={handleAccept}
        style={{
          marginLeft: "28px",
          background: "#fff",
          color: "#059669",
          border: "none",
          borderRadius: "6px",
          padding: "10px 24px",
          fontWeight: 600,
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(16,185,129,0.08)",
          transition: "background 0.2s"
        }}
      >
        Qəbul et
      </button>
    </div>
  );
}