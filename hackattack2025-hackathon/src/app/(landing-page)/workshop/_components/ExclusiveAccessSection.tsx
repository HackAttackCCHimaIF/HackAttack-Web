"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const ExclusiveAccessSection = () => {
  return (
    <div className='flex justify-center items-center min-h-[130vh]'>
      <Card
        className='border-none bg-black rounded-3xl sm:rounded-[8rem] min-h-2/3 w-full text-white py-12 sm:py-24 px-6 sm:px-16 relative overflow-hidden'
        style={{
          boxShadow: `
            0 0 30px rgba(136, 206, 255, 0.5),
            0 0 60px rgba(136, 206, 255, 0.3),
            0 0 100px rgba(136, 206, 255, 0.2)
          `
        }}
      >
        {/* Dekorasi */}
        <Image
          src={"/batik.png"}
          alt='Batik'
          width={200}
          height={200}
          className='object-contain absolute bottom-0 left-0 opacity-80 sm:w-[300px] sm:h-[300px]'
        />
        <Image
          src={"/batika.png"}
          alt='Batik'
          width={200}
          height={200}
          className='object-contain absolute top-0 right-0 opacity-80 sm:w-[300px] sm:h-[300px]'
        />
        <Image
          src={"/wayangmerch.png"}
          alt='Wayang'
          width={200}
          height={200}
          className='object-contain absolute bottom-0 right-0 opacity-80 sm:w-[300px] sm:h-[300px]'
        />

        {/* Header */}
        <CardHeader>
          <CardTitle className='text-2xl sm:text-4xl font-bold mb-3'>
            <span className='bg-gradient-to-r from-[#0f75bd] to-[#64BB48] bg-clip-text text-transparent'>
              Workshop{" "}
            </span>
            :{" "}
            <br className='sm:hidden block'/>
            <span className='bg-[#EF4B72] px-2 py-1 block sm:inline mt-1 sm:mt-0 w-fit'>
              Exclusive Access
            </span>
          </CardTitle>
          <CardDescription className='text-base sm:text-xl font-semibold text-white'>
            This is where champions begin
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className='h-full grid grid-cols-1 sm:grid-cols-2 mt-12 gap-6'>
          {/* Card 1 */}
          <Card className="bg-white/10 backdrop-blur-xs border border-white/10 w-full text-white rounded-md pt-0">
            <CardHeader className="pt-6 rounded-t-xl">
              <CardTitle className="flex items-center text-2xl sm:text-4xl font-semibold leading-none gap-3">
                <div className="w-3 h-10 sm:h-16 bg-[#EF4B72]/60" />
                <h2>Judul</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[50vh] sm:max-h-[67vh] overflow-y-auto">
              <div className="space-y-6 flex flex-col">
                <div className='flex flex-row gap-3 items-center'>
                  <Image src={"/calendar.svg"} className='w-8 h-8 sm:w-10 sm:h-10' alt='Calendar' width={40} height={40}/>
                  <p className='text-lg sm:text-xl font-semibold'>Rabu, 27 Agustus 2025</p>
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <Image src={"/clock.svg"} className='w-8 h-8 sm:w-10 sm:h-10' alt='Clock' width={40} height={40}/>
                  <p className='text-lg sm:text-xl font-semibold'>07:00 - 08:00 WIB</p>
                </div>
                <div>
                  <Card className='text-white bg-transparent'>
                    <CardHeader>
                      <CardTitle className='text-lg sm:text-2xl font-semibold'>
                        <p>Description</p>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Gatau ini apaan</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white/10 backdrop-blur-xs border border-white/10 w-full text-white rounded-md pt-0">
            <CardHeader className="pt-6 rounded-t-xl">
              <CardTitle className="flex items-center text-2xl sm:text-4xl font-semibold leading-none gap-3">
                <div className="w-3 h-10 sm:h-16 bg-[#EF4B72]/60" />
                <h2>Judul</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[50vh] sm:max-h-[67vh] overflow-y-auto">
              {/* sama kaya card 1 */}
            </CardContent>
          </Card>

          {/* Benefit */}
          <Card className='col-span-1 sm:col-span-2 bg-white/10 backdrop-blur-xs border border-white/10 w-full text-white rounded-md pt-0'>
            <CardHeader className="pt-6 rounded-t-xl">
              <CardTitle className="flex items-center text-xl sm:text-2xl font-semibold leading-none gap-3">
                <div className="w-3 h-8 sm:h-12 bg-[#EF4B72]/60" />
                <div className='flex flex-row gap-3 items-center'>
                  <Image src={"/trophy.svg"} alt='Trophy' width={24} height={24} className='w-6 h-6 sm:w-7 sm:h-7'/>
                  <h2>Benefit</h2>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* isi benefit */}
            </CardContent>
          </Card>
        </CardContent>

        {/* Footer */}
        <CardFooter className='flex w-full items-center justify-center mt-12'>
          <Button className='rounded-none border !bg-white/10 w-full sm:w-auto !py-6 sm:!py-8 !px-8 sm:!px-12'>
            <p className='font-semibold text-xl sm:text-3xl'>Register</p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExclusiveAccessSection
