import BoardOfDirectors from '@/components/our-team/BoardOfDirection'
import ScienceTeam from '@/components/our-team/ScienceTeam'
import TeamLeadershipPage from '@/components/our-team/TeamLeaderShipPage'
import React from 'react'

const page = () => {
  return (
    <div>
      <TeamLeadershipPage/>
      <BoardOfDirectors/>
      <ScienceTeam/>
    </div>
  )
}

export default page
