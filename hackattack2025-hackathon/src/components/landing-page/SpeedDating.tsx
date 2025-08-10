import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const SpeedDating = () => {
  return (
    <div className="w-screen min-h-screen relative overflow-hidden p-6 sm:p-12 flex items-center">
      {/* Background / Side Image */}
      <div className="absolute inset-0 md:left-1/2 pointer-events-none">
        <div className="relative w-full sm:w-full h-full">
            <Image
            src="/landing-page/SpeedDating.png"
            alt="Speed"
            fill
            className="object-cover md:object-contain"
            priority
            />
        </div>
    </div>


      {/* Card */}
      <div className="max-w-4xl flex items-center justify-center w-full h-full relative z-10">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl relative px-1 sm:px-4">
          <CardHeader>
            <CardTitle>
              <h2 className="text-white text-xl sm:text-5xl leading-snug">
                Flying Solo? Let’s Fix That. 🤝{" "}
                <span className="font-bold">Team up</span> with fellow innovators{" "}
                <span className="font-bold">on our Discord!</span>
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white/90 text-sm sm:text-base">
              We’ll help you find the right crew. Hop onto our Discord, join a
              speed-dating session, and match with fellow problem-solvers who
              share your passion.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SpeedDating
