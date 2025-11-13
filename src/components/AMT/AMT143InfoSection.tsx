import React from 'react'
import { AlertCircle, TrendingDown, Users, Clock } from 'lucide-react'

const PainManagementSection = () => {
  return (
    <div className="w-full text-[#003260] bg-gradient-to-b from-blue-50 via-white to-gray-50 py-20 px-6">


      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* Left Column - Statistics and Problem */}
        <div className="space-y-8">
          <div>
            <p className="text-[#003260] text-2xl font-bold leading-relaxed">
              Approximately 51 million Americans undergo inpatient surgery annually, and opioids remain a primary modality for postoperative acute pain management.
            </p>
          </div>

          {/* Card 2 - Economic Impact */}
          <div className="">
            <div className="flex gap-4 items-start">
              <div>
                <p className="text-[#003260] leading-relaxed">
                  The economic cost of prescription opioid-related overdose, abuse, and dependence exceeds $78.5 billion annually, with the majority of costs related to health care, substance abuse treatment and lost productivity.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 - Solution */}
          <div className="">
            <div className="flex gap-4 items-start">
              <div>
                <p className="text-[#003260] leading-relaxed">
                  <span className="">AMT-143 is well positioned</span> to address this market gap. Currently, finding an analgesic capable of providing over 48 hours of effective, post-surgical pain relief in a single dose is the biggest barrier to unlocking this market.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Why 48 Hours Critical */}
        <div className="space-y-8">

          {/* Header for Right Column */}
          <div>
            <h2 className="text-[#003260]s font-bold text-xl lg:text-2xl leading-tight">
              Why are the first 48 hours so critical?
            </h2>
          </div>

          {/* Card 1 - Surgeon Interview */}
          <div className="">
            <div className="flex gap-4">
              <div>
                <p className="text-[#003260] leading-relaxed">
                  When formulating AMT-143, we interviewed dozens of surgeons about their practices and asked them about the patient experience. They observed that it's during this period that convalescing patients report the highest experience of pain. Providing an opioid-free solution during this interval would theoretically reduce the risk of opioid addiction while improving surgical outcomes.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Technical Solution */}
          <div className="">
            <div className="flex gap-4">
              <div>
                <p className="text-[#003260] leading-relaxed">
                  With this goal in mind, we've tuned AMT-143 to release its analgesic compound over a three-day window. Our preclinical studies suggest that as the gel warms to match body temperature, its drug payload will be slowly distributed and absorbed into the body.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default PainManagementSection