import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

const SponsorPage = () => {
  return (
    <div className='text-white w-screen h-full flex flex-col relative pt-16'>
        <Image src={"/landing-page/bgsponsor.svg"} alt='bg' fill className='object-cover'/>
        <Image src={"/landing-page/rectangle.svg"} alt='bg' fill className='object-cover'/>
        <Image src={"/landing-page/Spotlight.svg"} alt='bg' fill className='object-cover md:object-contain z-30 top-0 absolute left-1/2'/>
        <div className="absolute left-0 top-0 h-full w-1/4 z-20 xl:flex hidden"> 
            <Image
                src="/landing-page/tirai2.svg"
                alt="tirai kiri"
                layout="fill" 
                priority
            />
        </div>

       <div className="absolute right-0 top-0 h-full w-1/4 z-20 rotate-y-180 xl:flex hidden">
        <Image
            src="/landing-page/tirai2.svg"
            alt="tirai kanan"
            layout="fill"
            style={{ transform: '' }}
            priority
        />
    </div>
      <div className='flex flex-col items-center w-full gap-6 px-4'>
        <h1 className='uppercase text-2xl'>Our <span className='font-bold bg-[#EF4B72] pl-1 pr-3'>Sponsor.</span></h1>
        <div className='max-w-2xl text-center'>
            <p className='text-lg'>We’re proud to be supported by companies and organizations that believe in the power of youth-driven innovation.</p>
        </div>
      </div>
      <div className='px-4 z-20'>
        <div className='mx-auto w-full gap-4 grid grid-cols-3 grid-rows-2 mt-8 md:mt-12 lg:mt-16 max-w-[90vw]'>
            {Array.from({ length: 6 }, (_, index) => (
            <Card
                key={index}
                className='w-full border-2 border-white bg-white/10 text-white h-[80px] md:h-[90px] lg:h-[120px] xl:h-[140px] rounded-2xl'
            >
                <CardContent className='w-full flex items-center justify-center h-full'>
                <p className='uppercase text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold'>...</p>
                </CardContent>
            </Card>
            ))}
        </div>

        <div className='mx-auto w-full gap-4 grid grid-cols-3 grid-rows-2 mt-8 md:mt-12 lg:mt-16 max-w-[80vw]'>
            {Array.from({ length: 6 }, (_, index) => (
            <Card
                key={index}
                className='w-full border-2 border-white bg-white/10 text-white h-[70px] md:h-[80px] lg:h-[105px] xl:h-[120px] rounded-2xl'
            >
                <CardContent className='w-full flex items-center justify-center h-full'>
                <p className='uppercase lg:text-xl md:text-lg text-sm xl:text-2xl font-bold'>...</p>
                </CardContent>
            </Card>
            ))}
        </div>

        <div className='mx-auto w-full gap-4 grid grid-cols-3 grid-rows-2 mt-8 md:mt-12 lg:mt-16 max-w-[70vw]'>
            {Array.from({ length: 6 }, (_, index) => (
            <Card
                key={index}
                className='w-full border-2 border-white bg-white/10 text-white h-[60px] md:h-[70px] lg:h-[80px] xl:h-[90px] rounded-2xl'
            >
                <CardContent className='w-full flex items-center justify-center h-full'>
                <p className='uppercase text-sm md:text-lg lg:text-xl font-bold'>...</p>
                </CardContent>
            </Card>
            ))}
        </div>

        <div className='mx-auto w-full gap-4 grid grid-cols-3 grid-rows-2 mt-8 md:mt-12 lg:mt-16 pb-16 md:pb-32 lg:pb-40 max-w-[60vw]'>
            {Array.from({ length: 6 }, (_, index) => (
            <Card
                key={index}
                className='w-full border-2 border-white bg-white/10 text-white h-[40px] md:h-[50px] lg:h-[64px] rounded-2xl'
            >
                <CardContent className='w-full flex items-center justify-center h-full'>
                <p className='uppercase md:text-sm text-xs lg:text-lg font-bold'>...</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
      <div className='w-full bg-black h-64 z-10'>

      </div>
    </div>
  )
}

export default SponsorPage
