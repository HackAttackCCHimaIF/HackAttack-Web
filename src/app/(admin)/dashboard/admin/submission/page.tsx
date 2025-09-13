import React from 'react'
import { AdminHeaderDashboard } from '../../_components/AdminHeaderDashboard'
import AdminSubmissionTableWrapper from '../../_components/AdminSubmissionTableWrapper'
import AdminSubmissionDashboard from '../../_components/AdminSubmissionDashboard'


const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeaderDashboard leftText='Submission Data' description='Comprehensive Submission Data from Participants'/>
      <AdminSubmissionDashboard>
        <AdminSubmissionTableWrapper/>
      </AdminSubmissionDashboard>
    </div>
  )
}

export default AdminDashboardPage
