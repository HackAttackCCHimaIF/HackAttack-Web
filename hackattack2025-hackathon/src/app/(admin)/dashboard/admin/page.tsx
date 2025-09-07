import React from 'react'
import { AdminHeaderDashboard } from '../_components/AdminHeaderDashboard'
import AdminDashboard from '../_components/AdminDashboard'
import RegistrationTable from '../_components/AdminTable'

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeaderDashboard leftText='Welcome' rightText='Admin!👋🏼' description='Your hard work keeps everything running thank you, Admin!'/>
      <AdminDashboard>
        <RegistrationTable/>
      </AdminDashboard>
    </div>
  )
}

export default AdminDashboardPage
