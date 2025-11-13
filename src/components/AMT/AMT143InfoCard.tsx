import React from 'react';
import { Syringe, CheckCircle, Activity } from 'lucide-react';

const AMT143InfoCard: React.FC = () => {
  return (
    <div className="min-h-screen b p-8 flex items-center justify-center">
      <div className="max-w-9xl w-full">
        <div className=" overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content Section */}
            <div className="p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br ">
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-3xl font-bold text-slate-900 leading-tight">
                  Bringing AMT-143 to market would benefit patients, doctors and other healthcare stakeholders who are concerned about the impact of addictive medications.
                </h1>
                
                <div className="space-y-4 text-slate-700">
                  <p className="text-lg leading-relaxed">
                    Without altering the way surgeons currently practice, AMT-143 is locally injected via syringe at the time of surgery, and has been calibrated to provide sustained post-operative pain control to enable patients to get through to recovery.
                  </p>
                  
                  <div className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <p className="text-base text-slate-800">
                      In July 2020, AmacaThera received approval from Health Canada to proceed into Phase 1 Clinical Trials for AMT-143.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative flex items-center justify-center ">
              <img
                src="/images/amtpage-bg.png"
                alt="AMT-143 Illustration"
                className="lg:max-w-7xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMT143InfoCard;