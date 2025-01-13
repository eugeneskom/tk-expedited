import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#2A0001] flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Rotating outer ring */}
        <div className="absolute inset-0">
          <div className="w-full h-full rounded-full border-2 border-red-500/20 animate-[spin_3s_linear_infinite]" />
        </div>
        
        {/* Rotating gradient arc */}
        <div className="absolute inset-0">
          <div className="w-full h-full rounded-full border-t-2 border-r-2 border-red-500 
            animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite]" />
        </div>

        {/* Center pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>

        {/* Decorative dots */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-red-500/40"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 90}deg) translate(24px, 0) rotate(-${i * 90}deg)`,
              animation: `pulse 2s ${i * 0.5}s infinite`
            }}
          />
        ))}

        {/* Background blur effect */}
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500/5 to-transparent 
            blur-xl animate-[spin_5s_linear_infinite_reverse]" />
        </div>
      </div>

      {/* Optional loading text - can be removed for even more minimal look */}
      <div className="absolute mt-24 text-red-400/80 text-base font-light tracking-wider">
        Loading...
      </div>
    </div>
  );
};

export default LoadingSpinner;
