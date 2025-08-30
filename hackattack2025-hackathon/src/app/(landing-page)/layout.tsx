import Footer from '@/components/landing-page/Footer'
import Navbar from '@/components/landing-page/Navbar'
import React from 'react'

const LandingPageLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Navbar/>
        {children}
      <Footer/>
    </div>
  )
}

export default LandingPageLayout
