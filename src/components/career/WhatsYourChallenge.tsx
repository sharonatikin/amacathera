import React from 'react';
import {  ArrowDown } from 'lucide-react';

const WhatsYourChallenge: React.FC = () => {
  return (
    <div className="relative flex flex-col lg:flex-row  w-full min-h-screen  overflow-hidden">
      {/* Background Image with blur effect */}
      <div 
        className="absolute sm:blur-md bg-center sm:bg-center sm:bg-right inset-0"
        style={{
          backgroundImage: 'url(/images/career-3-bg.png)',
          backgroundSize: 'cover',
        }}
      ></div>


      {/* Content Container */}
      <div className="relative  z-10 h-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24">
        
        {/* Top Section */}
        <div className="space-y-8 md:space-y-12 ">
          {/* Section 1: What's your next challenge? */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-4xl font-bold text-primary leading-tight">
              What's your next challenge?
            </h2>
            
            <p className="text-base sm:text-lg md:text-lg text-primary leading-relaxed max-w-xl">
              If you share our vision and are eager to make a meaningful contribution to healthcare innovation, we invite you to express your interest and reach out to us.
            </p>
              <a className='text-primary' href="mailto:info@amacathera.com">info@amacathera.com</a>
          </div>

          {/* Spacer */}
          <div className="h-8 md:h-12"></div>

          {/* Section 2: Sound like fun? */}
          {/* <div className="space-y-4 md:space-y-6">
            <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Sound like fun?
            </h3>
            
            <p className="text-base sm:text-lg md:text-lg text-primary leading-relaxed max-w-xl">
              We're always looking for promising talent.
            </p>
          </div> */}
        </div>

      </div>
        {/* <div className='relative flex items-center justify-center'>
          <div className='   bg-white/40 flex justify-center flex-col items-center sm:px-20 xl:px-30  sm:py-20 px-10 py-5 rounded-lg m-10'>
          <div className='flex justify-center items-center'>
          <h1 className='text-primary text-xl sm:text-2xl font-bold text-nowrap py-6 px-2'>Drop your redumes here </h1>
          <ArrowDown className='text-primary'/>
          </div>
          <button className=' bg-primary sm:text-xl px-8 py-2 text-nowrap rounded-lg'>Drop Now</button>
          </div>
        </div> */}

    </div>
  );
};

export default WhatsYourChallenge;