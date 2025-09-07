import React from 'react'
import AdminDashboard from '../../_components/AdminDashboard'
import { AdminHeaderDashboard } from '../../_components/AdminHeaderDashboard'
import AdminSubmissionTable from '../../_components/AdminSubmissionTable'


const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeaderDashboard leftText='Submission Data' description='Comprehensive Submission Data from Participants'/>
      <AdminDashboard>
        <AdminSubmissionTable/>
      </AdminDashboard>
    </div>
  )
}

export default AdminDashboardPage
