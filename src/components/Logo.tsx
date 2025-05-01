import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-8 h-8 ${className}`}>
      <div className="absolute left-0 bottom-0 w-[2px] h-[80%] bg-steel transform -skew-x-12"></div>
      <div className="absolute left-[35%] bottom-0 w-[2px] h-[60%] bg-steel transform -skew-x-12"></div>
      <div className="absolute left-[55%] bottom-0 w-[2px] h-full bg-steel transform -skew-x-12"></div>
      <div className="absolute right-0 bottom-0 w-[2px] h-[70%] bg-steel transform -skew-x-12"></div>
      <div className="absolute left-[25%] top-[15%] w-2.5 h-2.5 rounded-full bg-[#FFD700]"></div>
    </div>
  );
};