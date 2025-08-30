import React from 'react'
import Hero from './hero'
import WhyTelebevi from './why-telebevi'
// import BestChoice from './best-choice'
import HowItWorks from './how-it-works'
// import SimpleEffective from './simple-effective'
import Footer from './footer'
import { useNotification } from './context/NotificationContext'
import NavigationAfterLogin from './NavigationAfterLogin'
import Navigation from './navigation'
import FloatingActionButton from "./FloatingActionButton"
function Homepage() {
  const {isLoggedIn} = useNotification();
  return (
    <div className="homepage">

        {isLoggedIn ? <NavigationAfterLogin/> : <Navigation/>}
        <Hero />
        <WhyTelebevi />
        {/* <BestChoice /> */}
        <HowItWorks />
        {/* <SimpleEffective /> */}
        <Footer />
        {isLoggedIn && <FloatingActionButton />}
    </div>
  )
}

export default Homepage