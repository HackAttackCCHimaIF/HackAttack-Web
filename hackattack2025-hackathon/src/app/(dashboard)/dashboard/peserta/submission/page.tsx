"use client"

import { HeaderDashboard } from '@/app/(dashboard)/_components/HeaderDashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'

const SubmissionPage = () => {
    const [userProfile] = useState({ name: "John Doe", isLoggedIn: true });
    
  return (
    <div className="min-h-1/2 h-full flex flex-col">
        <HeaderDashboard userProfile={userProfile} bottomText="Theme" />

        <div className="flex-1 w-full overflow-y-auto px-4 pb-5">
            <Card className="bg-white/10 backdrop-blur-md border-3 border-white/10 w-full text-white rounded-2xl flex flex-col h-fit md:h-full">
            <CardHeader className="py-4 lg:py-12">
                <CardTitle className="text-2xl font-medium leading-normal">
                    <p className=''>Halo, Team <span className='font-bold'>JuaraHackAttack 2025</span></p>
                    <span className="text-sm">Submit your proposal here!</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex px-6 flex-col h-full justify-between">
                <div className='flex flex-col gap-3 w-full'>
                    <Label className='text-[16px]'>Link <span className='font-bold'>Proposal*</span></Label>
                    <Input className="bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12" placeholder='Dalam bentuk link ya dek'/>
                    <div className='flex flex-row w-full items-start gap-3'>
                        <Checkbox/>
                        <p className='text-sm text-white/50'>Proposal yang kami submit telah benar dan tidak ada revisi, jika kurang sesuatu itu kesalahan gibran.</p>
                    </div>
                </div>
                <div className='flex flex-row gap-3 justify-end pt-12'>
                    <Button
                        size={"lg"}
                        className={`flex items-center gap-2 rounded-full pl-2 !py-6 bg-white/10 hover:bg-white/20 text-white pr-6`}>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full md:bg-white/10">
                            <Pencil size={8} className="text-white" />
                            </div>
                            <p>Edit</p>
                        </div>
                    </Button>

                    <Button className='bg-white/10 hover:bg-pink-600 text-white flex items-center rounded-full !p-6'>Submit</Button>
                </div>
            </CardContent>
            </Card>
        </div>
    </div>

  )
}

export default SubmissionPage
