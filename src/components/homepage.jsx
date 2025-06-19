import React from 'react'
import Navigation from './navigation'
import Hero from './hero'
import WhyTelebevi from './why-telebevi'
import BestChoice from './best-choice'
import HowItWorks from './how-it-works'
import SimpleEffective from './simple-effective'
import Footer from './footer'

function Homepage() {
  return (
    <div className="homepage">
        <Navigation />
        <Hero />
        <WhyTelebevi />
        <BestChoice />
        <HowItWorks />
        <SimpleEffective />
        <Footer />
    </div>
  )
}

export default Homepage