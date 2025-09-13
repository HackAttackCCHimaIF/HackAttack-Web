import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { DiscordLogo } from 'phosphor-react'

const SpeedDating = () => {
  return (
    <div className="w-screen min-h-screen relative overflow-hidden p-6 sm:p-12 flex items-center">
      <div className="absolute -top-1 left-0 lg:left-1/2 w-full h-[240px] md:h-[300px] lg:h-fit">
          <Image
            src={"/landing-page/awanniga3.svg"}
            alt="Awan"
            width={100}
            height={100}
            className="w-full object-cover h-full rotate-x-180"
          />
        </div>
        <div className="absolute -top-1 right-1/2 w-full lg:flex hidden">
                <Image
            src={"/landing-page/awanniga3.svg"}
            alt="Awan"
            width={100}
            height={100}
            className="w-full object-cover rotate-y-180 rotate-x-180"
            />
        </div>

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
        <Image src={"/landing-page/''.svg"} alt='Comma' width={10} height={10} className='size-14 absolute -top-20 left-0'/>
        <div className='flex flex-col w-full h-full gap-y-8'>
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl relative px-1 sm:px-4">
            <CardHeader>
              <CardTitle>
                <h2 className="text-white font-normalh text-xl sm:text-5xl leading-snug">
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
          <Link
            className={buttonVariants({
              className:
                "w-fit bg-transparent !rounded-full !py-4 !px-2 !pr-8 transition-colors text-white duration-300 hover:bg-white hover:text-black",
              variant: "outline",
            })}
            href={"/"}
          >
            <div className='p-1 bg-muted/10 rounded-full'>
              <DiscordLogo className=''/>
            </div>
            <span className=''>
              Join Discord
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SpeedDating
