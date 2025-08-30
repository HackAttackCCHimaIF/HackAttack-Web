"use client"
import { HeaderDashboard } from '@/app/(dashboard)/_components/HeaderDashboard'
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react'

const ThemePage = () => {
      const [userProfile] = useState({ name: "John Doe", isLoggedIn: true });
    
  return (
    <div>
      <HeaderDashboard userProfile={userProfile} bottomText='Theme'/>
      <div className="w-full h-full overflow-y-auto gap-4">
        <div className="px-4 pb-8 col-span-1 w-full">
          <Card className="bg-white/10 backdrop-blur-md border-3 border-white/10 w-full text-white rounded-2xl pt-0">
            <CardContent className="min-h-[83vh] w-full overflow-y-auto flex items-center text-center">
                <div className='max-w-2xl text-justify mx-auto w-full h-full items-center flex justify-center'>
                    <p className='text-2xl font-medium tracking-wider'>
                        Tema ini mengajak peserta untuk menghadirkan solusi digital yang mampu menjawab tantangan nyata di Indonesia, terutama dalam konteks ketimpangan pembangunan, pendidikan, dan pekerjaan. Melalui pendekatan teknologi dan inovasi, peserta diharapkan mampu menciptakan solusi yang inklusif, berkelanjutan, dan berdampak luas bagi masyarakat di berbagai pelosok Nusantara.
                    </p>
                </div>
            </CardContent>
          </Card>
        </div>
        </div>
    </div>
  )
}

export default ThemePage
