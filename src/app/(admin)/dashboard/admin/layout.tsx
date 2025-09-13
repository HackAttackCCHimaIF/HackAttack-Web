"use client"

import React from 'react'
import AdminSidebar from '../_components/AdminSidebar'

const DashboardAdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full h-screen flex relative bg-black">
    
          <div className="relative z-10 flex w-full h-full">
            {/* Sidebar */}
            <div className="w-0 md:w-68">
              <AdminSidebar isLoggedIn={false} onSignOut={() => {}} />
            </div>
    
            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <main className="flex-1 h-full pt-16 md:pt-0 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </div>
  )
}

export default DashboardAdminLayout
