import React from 'react'
import { AdminHeaderDashboard } from '../_components/AdminHeaderDashboard'
import AdminDashboard from '../_components/AdminDashboard'
import RegistrationTableWrapper from '../_components/RegistrationTableWrapper'

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeaderDashboard leftText='Welcome' rightText='Admin!👋🏼' description='Your hard work keeps everything running thank you, Admin!'/>
      <AdminDashboard>
        <RegistrationTableWrapper/>
      </AdminDashboard>
    </div>
  )
}

export default AdminDashboardPage
