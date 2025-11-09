import React from 'react'
import TeamProfilePage from '../../_components/TeamInfoForm'
import UnderMaintenance from '../../_components/UnderMaintenance'

const DashboardPesertaPage = () => {
  const MAINTENANCE = false

  if (MAINTENANCE) {
    return <UnderMaintenance />
  }

  return (
    <div>
      <TeamProfilePage/>
    </div>
  )
}

export default DashboardPesertaPage
