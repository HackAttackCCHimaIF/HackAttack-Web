import React from 'react'
import AdminDashboard from '../../_components/AdminDashboard'
import { AdminHeaderDashboard } from '../../_components/AdminHeaderDashboard'
import AdminWorkshopSuspenseWrapper from '../../_components/AdminSuspenseWrapper'


const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeaderDashboard leftText='Welcome' rightText='Admin!👋🏼' description='Your hard work keeps everything running thank you, Admin!'/>
      <AdminDashboard>
        <AdminWorkshopSuspenseWrapper/>
      </AdminDashboard>
    </div>
  )
}

export default AdminDashboardPage
