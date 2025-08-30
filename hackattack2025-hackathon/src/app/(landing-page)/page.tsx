"use client"
import AboutUs from '@/components/landing-page/AboutUs';
import CountdownPage from '@/components/landing-page/CountdownPage';
import FAQSection from '@/components/landing-page/FAQSection';
import HeroSection from '@/components/landing-page/HeroSection';
import SpeedDating from '@/components/landing-page/SpeedDating';
import SponsorPage from '@/components/landing-page/SponsorPage';
import Timeline from '@/components/landing-page/Timeline';

const LandingPage = () => {

  return (
    <>
      <div className="overflow-hidden">
        <div className='max-h-screen'>
          <HeroSection/>
        </div>
        <div className='min-h-screen' id='about-us'>
          <AboutUs/>
        </div>
        <div className='min-h-screen' id='timeline'>
          <Timeline/>
        </div>
        <div id='countdown' className='min-h-screen md:h-fit'>
          <CountdownPage/>
        </div>
        <div className='min-h-screen' id='speeddating'>
          <SpeedDating/>
        </div>
         <div className='min-h-screen' id='sponsor'>
          <SponsorPage/>
        </div>
        <div className='h-full' id='faq'>
          <FAQSection/>
        </div>
      </div>
    </>
  )
}

export default LandingPage