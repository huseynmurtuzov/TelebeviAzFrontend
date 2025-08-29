import React, { useEffect, useState } from "react";
import "../assets/styles/successComponent.css"
import { useNotification } from "./context/NotificationContext";

function SuccessComponent({ text }) {
  const [visible, setVisible] = useState(true);

  const {showInfo} = useNotification();
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      showInfo("")
    }, 3000); 

    return () => clearTimeout(timer);
  }, [text]);

  if (!visible) return null;

  return (
    <div className="addToBasket">
      <p className="addToBasket_text">{text}</p>
      <button className="closeButton" onClick={() => setVisible(false)}>×</button>
      <div className="loadingBar"></div>
    </div>
  );
}

export default SuccessComponent;
