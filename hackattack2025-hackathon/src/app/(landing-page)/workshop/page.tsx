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

      </div>
  )
}

export default WorkshopPage
