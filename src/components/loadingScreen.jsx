import React from 'react'
import "../assets/styles/loadingScreen.css"
import logo from '../assets/logo.png'


export default function LoadingScreen() {
  return (
    <div className='loading-screen'>
      <img
        src={logo}
        alt="Logo"
        className='logo loading'
      />
    <h4 className="author-title" style={{color:"black"}}>Developed by <span style={{color:"#92C9DD"}}>Murtuzov</span> <span style={{color:"#13C38B"}}>Hüseyn</span></h4>
    </div>

  )
}