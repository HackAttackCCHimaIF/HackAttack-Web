"use client"
import AboutUs from '@/components/landing-page/AboutUs';
import CountdownPage from '@/components/landing-page/CountdownPage';
import FAQSection from '@/components/landing-page/FAQSection';
import HeroSection from '@/components/landing-page/HeroSection';
import SpeedDating from '@/components/landing-page/SpeedDating';
import Timeline from '@/components/landing-page/Timeline';

const LandingPage = () => {

  return (
    <>
      <div className="overflow-hidden">
        {/* <Navbar /> */}
        
        <div className='max-h-screen'>
          <HeroSection/>
        </div>
        <div className='min-h-screen'>
          <AboutUs/>
        </div>
        <div className='min-h-screen'>
          <Timeline/>
        </div>
        <div className='min-h-screen md:h-fit'>
          <CountdownPage/>
        </div>
        <div className='min-h-screen'>
          <SpeedDating/>
        </div>
        <div>
          <FAQSection/>
        </div>
      </div>
    </>
  )
}

export default LandingPage