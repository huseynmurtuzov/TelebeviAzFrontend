import React, { useState, useEffect } from 'react';
import "../assets/styles/errorComponent.css"
function ErrorComponent({ text,errorkey }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorkey]); 

  if (!visible) return null;

  return (
    <div key={errorkey} className='removeFromBasket'> 
      <p className='removeFromBasket_text'>{text}</p>
      <button className="closeButton" onClick={() => setVisible(false)}>×</button>
      <div className="loadingBar"></div>
    </div>
  );
}

export default ErrorComponent;
