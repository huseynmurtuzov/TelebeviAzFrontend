import React, { useEffect, useState } from "react";
import "../assets/styles/successComponent.css"

function SuccessComponent({ text }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

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
