import React from 'react'
import HeroWorkshop from './_components/HeroWorkshop'
import ExclusiveAccessSection from './_components/ExclusiveAccessSection'

const WorkshopPage = () => {
  return (
    <div className="overflow-hidden">
        <div className='max-h-screen'>
          <HeroWorkshop/>
        </div>
        <div className='min-h-screen' id='ExclusiveAccessSection'>
          <ExclusiveAccessSection/>
        </div>
        {/* <div className='min-h-screen' id='timeline'>
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
        </div> */}
      </div>
  )
}

export default WorkshopPage
