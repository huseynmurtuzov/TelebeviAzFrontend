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
    </div>
  )
}