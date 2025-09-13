"use client"

import React from "react"
import Image from "next/image"
import { HeaderPayment } from "./HeaderPayment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InstitutionDropdown } from "./InstituionDropdown"
import { CopyableLink } from "@/components/CopyableLink"
import { WhatsappInput } from "./WhatsappInput"
import { Button } from "@/components/ui/button"

const inputClassName =
  "bg-white/10 text-white placeholder:text-white/50 rounded-full px-6 py-6 border-1 border-white/10 pr-12"

const PaymentForm = () => {
  const [selectedInstitutions, setSelectedInstitutions] = React.useState<string[]>([])
  const [selectedWorkshop, setSelectedWorkshop] = React.useState<string[]>([])

  return (
    <div className="min-h-screen">
      <HeaderPayment />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 mt-3 gap-4">
        {/* LEFT CARD - Form Pendaftaran */}
        <Card className="col-span-1 lg:col-span-2 bg-white/10 backdrop-blur-md border-3 border-white/10 w-full h-full text-white rounded-2xl pt-0">
          <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
            <CardTitle className="text-2xl font-medium leading-none">
              <span className="font-bold">Your Next Big Move Begins Here!</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="overflow-y-auto max-h-[60vh]">
            <div className="space-y-12 pt-6 tracking-wide">
              <div className="space-y-6 flex flex-col">
                {/* Name */}
                <div className="flex flex-col space-y-3">
                  <Label>Name</Label>
                  <Input className={inputClassName} placeholder="Input your Name" />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-3">
                  <Label>Email</Label>
                  <Input className={inputClassName} placeholder="Input your Email" />
                </div>

                {/* Institution */}
                <div className="flex flex-col space-y-3">
                  <Label>Your Institution</Label>
                  <InstitutionDropdown
                    placeholder="Select Your Institution"
                    options={[
                      { label: "Telkom University", value: "telkom" },
                      { label: "Other Institution", value: "other" },
                      { label: "ITB", value: "itb" },
                    ]}
                    selected={selectedInstitutions}
                    onChange={setSelectedInstitutions}
                  />
                </div>

                {/* Workshop */}
                <div className="flex flex-col space-y-3">
                  <Label>Pick Your Workshop</Label>
                  <InstitutionDropdown
                    placeholder="Select Your Workshop"
                    options={[
                      { label: "Workshop 1", value: "workshop1" },
                      { label: "Workshop 2", value: "workshop2" },
                    ]}
                    selected={selectedWorkshop}
                    onChange={setSelectedWorkshop}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pr-4 col-span-1">
          <Card className="bg-white/10 backdrop-blur-md border border-white/10 w-full text-white rounded-2xl pt-0">
            <CardHeader className="bg-white/10 pb-4 pt-6 rounded-t-xl">
              <CardTitle className="text-2xl font-medium leading-none">
                <p>Detail</p>
                <span className="font-bold">Team.</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[50vh]">
              <div className="space-y-6 flex flex-col">
                {/* Whatsapp Number */}
                <div className="flex flex-col gap-3">
                  <Label>Your Whatsapp</Label>
                  <WhatsappInput
                    name="whatsapp_number"
                    placeholder="Input your WhatsApp number"
                    className={inputClassName}
                    defaultValue="62"
                  />
                </div>

                {/* Payment Section */}
                <div className="relative flex flex-col space-y-3">
                  <Label>Metode Pembayaran.</Label>
                  <div className="flex flex-col space-y-1 text-center">
                    <p className="text-2xl font-bold">Rp250.000*</p>
                    <p className="text-sm font-medium text-white/50">
                      ( Harga pendaftaran tergantung instansi asal Tim )
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <Image
                      src="/dashboard/QR.png"
                      width={340}
                      height={340}
                      alt="QR"
                      className="w-80 rounded-4xl border-10 border-white/10"
                    />
                  </div>

                  <CopyableLink label="BCA ( Faiq Haqqani )" text="8895558571" />
                  <CopyableLink label="BRI ( Faiq Haqqani )" text="0131 0104 8271 507" />
                </div>

                {/* Payment Proof */}
                <div className="flex flex-col gap-3">
                  <Label>Link Bukti Pembayaran</Label>
                  <Input className={inputClassName} placeholder="Input your Transaction" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        <div className="flex items-center w-full justify-center mt-12">
            <Button className=' border !bg-white/10 w-fit !py-6 sm:!py-8 !px-8 sm:!px-12 rounded-full'>
                <p className='font-semibold text-xl sm:text-3xl'>Register</p>
            </Button>
        </div>
    </div>
  )
}

export default PaymentForm
