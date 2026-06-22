import HeroSection from '@/components/pipeline/HeroSection'
import PipelineTable from '@/components/pipeline/Pipelinetable'
import PlatformSection from '@/components/pipeline/PlatformSection'

const page = () => {
  return (
    <div >
      {/* <HeroSection /> */}
      <PipelineTable />
      <PlatformSection />
    </div>
  )
}

export default page
