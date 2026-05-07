import BoardOfDirectors from '@/components/our-team/BoardOfDirection'
import ScienceTeam from '@/components/our-team/ScienceTeam'
import TeamLeadershipPage from '@/components/our-team/TeamLeaderShipPage'

const page = () => {
  return (
    <div>
          <div>
      <TeamLeadershipPage/>
      <BoardOfDirectors/>
      <ScienceTeam/>
    </div>
    </div>
  )
}

export default page
